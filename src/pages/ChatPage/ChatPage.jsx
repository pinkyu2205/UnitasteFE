import * as signalR from '@microsoft/signalr'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ChatSidebar from './component/ChatSidebar'
import ChatWindow from './component/ChatWindow'
import './CSS/ChatPage.css'

export default function ChatPage() {
  const [connection, setConnection] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userList, setUserList] = useState([])

  const currentUser = localStorage.getItem('fullName') || 'Anonymous'
  const token = localStorage.getItem('accessToken')

  // 👉 Lấy danh sách user thật từ API Gateway
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          'https://apigateway-5s3w.onrender.com/api/users/get-all',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const filtered = res.data.filter((u) => u.fullName !== currentUser)
        setUserList(filtered)
      } catch (err) {
        console.error('❌ Lỗi khi gọi API get-all:', err)
      }
    }
    if (token) fetchUsers()
  }, [token, currentUser])

  // 👉 Tạo kết nối SignalR
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://localhost:5002/chathub?username=${encodeURIComponent(
          currentUser
        )}`
      )
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
  }, [currentUser])

  // 👉 Kết nối & lắng nghe tin nhắn
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('✅ Connected to SignalR Hub')
          connection.on('ReceiveMessage', (user, message) => {
            setMessages((prev) => [
              ...prev,
              {
                user,
                message,
                time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ])
          })
        })
        .catch((err) => console.error('❌ Connection error:', err))
    }
  }, [connection])

  // 👉 Gửi tin nhắn
  const sendMessage = async () => {
    if (!selectedUser) {
      alert('Vui lòng chọn người nhận tin nhắn!')
      return
    }
    if (message && connection) {
      await connection.invoke('SendMessage', selectedUser, message)
      setMessages((prev) => [
        ...prev,
        {
          user: 'Bạn',
          message,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      setMessage('')
    }
  }

  return (
    <div className='chat-container'>
      <ChatSidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        userList={userList}
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}
