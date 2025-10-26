import * as signalR from '@microsoft/signalr'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import ChatSidebar from './component/ChatSidebar'
import ChatWindow from './component/ChatWindow'
import './CSS/ChatPage.css'

export default function ChatPage() {
  const [connection, setConnection] = useState(null)
  const [message, setMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [userList, setUserList] = useState([])
  const [typingUser, setTypingUser] = useState(null)
  const [chatHistory, setChatHistory] = useState({})
  const [unreadMap, setUnreadMap] = useState({})
  const [onlineUsers, setOnlineUsers] = useState([])
  const [lastMessageTimeMap, setLastMessageTimeMap] = useState({}) // ✅ new

  const currentUser = localStorage.getItem('fullName') || 'Anonymous'
  const token = localStorage.getItem('token')
  const currentUserId = localStorage.getItem('userId')

  const authHeader = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  )

  // 🧩 Load user list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8001/api/users/get-all', {
          headers: authHeader,
        })
        const filtered = res.data.filter((u) => u.fullName !== currentUser)
        setUserList(filtered)
      } catch (err) {
        console.error('❌ Lỗi khi gọi API get-all:', err)
      }
    }
    if (token) fetchUsers()
  }, [token, currentUser, authHeader])

  // 🧩 Setup SignalR
  useEffect(() => {
    if (!token || connection) return
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://localhost:8001/api/social/chathub?username=${encodeURIComponent(
          currentUser
        )}&access_token=${token}`,
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        }
      )
      .withAutomaticReconnect()
      .build()
    setConnection(newConnection)
  }, [token, currentUser, connection])

  // 🧩 Handle realtime
  useEffect(() => {
    if (!connection) return
    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start()
          console.log('✅ Connected to SignalR Hub')
        }

        // 🟢 Nhận tin nhắn mới
        connection.off('ReceiveMessage')
        connection.on('ReceiveMessage', async (fromUser, content) => {
          const now = new Date()

          setChatHistory((prev) => {
            const updated = { ...prev }
            const list = updated[fromUser] || []
            updated[fromUser] = [
              ...list,
              {
                user: fromUser,
                message: content,
                seen: false,
                time: now.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ]
            return updated
          })

          // ✅ Cập nhật thời gian tin nhắn cuối cùng
          setLastMessageTimeMap((prev) => ({
            ...prev,
            [fromUser]: now.getTime(),
          }))

          // ✅ Nếu KHÔNG mở khung chat này → tăng badge
          if (selectedUser !== fromUser) {
            setUnreadMap((prev) => ({
              ...prev,
              [fromUser]: (prev[fromUser] || 0) + 1,
            }))
          } else {
            // Nếu đang xem → mark as seen ngay
            await connection.invoke('MarkAsSeen', fromUser, currentUser)
          }
        })

        connection.off('OnlineUsers')
        connection.on('OnlineUsers', (users) => setOnlineUsers(users))
        connection.off('UserOnline')
        connection.on('UserOnline', (user) =>
          setOnlineUsers((prev) => [...new Set([...prev, user])])
        )
        connection.off('UserOffline')
        connection.on('UserOffline', (user) =>
          setOnlineUsers((prev) => prev.filter((u) => u !== user))
        )

        // 🟣 Khi người kia xem tin mình
        connection.off('MessagesSeen')
        connection.on('MessagesSeen', (viewerName) => {
          setChatHistory((prev) => {
            const updated = { ...prev }
            const list = updated[viewerName] || []
            updated[viewerName] = list.map((m) =>
              m.user === 'Bạn' ? { ...m, seen: true } : m
            )
            return updated
          })
        })

        // 🟡 Hiển thị “đang nhập”
        connection.off('ShowTyping')
        connection.on('ShowTyping', (fromUser, isTyping) => {
          if (isTyping) setTypingUser(fromUser)
          else setTypingUser(null)
        })
      } catch (err) {
        console.error('❌ Connection error:', err)
      }
    }

    startConnection()

    return () => {
      connection.off('ReceiveMessage')
      connection.off('MessagesSeen')
      connection.off('ShowTyping')
    }
  }, [connection, selectedUser, currentUser])

  // 🧩 Load lịch sử chat khi chọn user
  useEffect(() => {
    const loadHistory = async () => {
      if (!selectedUser || !currentUserId) return
      try {
        const partner = userList.find((u) => u.fullName === selectedUser)
        if (!partner) return

        const url = `http://localhost:8001/api/message/history?senderId=${currentUserId}&receiverId=${partner.userId}`
        const res = await axios.get(url, { headers: authHeader })
        const mapped = (res.data || []).map((m) => ({
          user: m.senderId == currentUserId ? 'Bạn' : selectedUser,
          message: m.content,
          seen: m.senderId == currentUserId ? !!m.isSeen : false,
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))
        setChatHistory((prev) => ({
          ...prev,
          [selectedUser]: mapped,
        }))

        // ✅ reset badge khi mở khung chat
        setUnreadMap((prev) => ({ ...prev, [selectedUser]: 0 }))

        // ❌ KHÔNG cập nhật lastMessageTimeMap ở đây nữa

        // mark as seen
        await axios.put(
          `http://localhost:8001/api/message/user-seen-message?senderId=${partner.userId}&receiverId=${currentUserId}`,
          {},
          { headers: authHeader }
        )
        if (connection)
          await connection.invoke('MarkAsSeen', selectedUser, currentUser)
      } catch (err) {
        console.error('❌ Lỗi load history:', err)
      }
    }

    loadHistory()
  }, [
    selectedUser,
    userList,
    currentUserId,
    authHeader,
    connection,
    currentUser,
  ])

  // 🧩 Notify server user đang xem chat
  useEffect(() => {
    if (connection && selectedUser) {
      connection.invoke('SetActiveChat', currentUser, selectedUser)
      return () => connection.invoke('SetActiveChat', currentUser, null)
    }
  }, [connection, selectedUser, currentUser])

  // 🧩 Gửi tin nhắn
  const sendMessage = async () => {
    if (!selectedUser || !message) return
    const now = new Date()
    try {
      await connection.invoke('SendMessage', selectedUser, message)
      setChatHistory((prev) => {
        const updated = { ...prev }
        const list = updated[selectedUser] || []
        updated[selectedUser] = [
          ...list,
          {
            user: 'Bạn',
            message,
            seen: false,
            time: now.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]
        return updated
      })

      // ✅ update last message time
      setLastMessageTimeMap((prev) => ({
        ...prev,
        [selectedUser]: now.getTime(),
      }))

      setMessage('')
    } catch (err) {
      console.error('❌ Lỗi khi gửi tin nhắn:', err)
    }
  }

  // ✅ Sort sidebar theo người nhắn gần nhất
  const sortedUsers = [...userList].sort((a, b) => {
    const timeA = lastMessageTimeMap[a.fullName] || 0
    const timeB = lastMessageTimeMap[b.fullName] || 0
    return timeB - timeA // gần nhất lên đầu
  })

  return (
    <div className='chat-container'>
      <ChatSidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        userList={sortedUsers} // ✅ truyền danh sách đã sort
        unreadMap={unreadMap}
        onlineUsers={onlineUsers}
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={chatHistory[selectedUser] || []}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        connection={connection}
        currentUser={currentUser}
        typingUser={typingUser}
      />
    </div>
  )
}
