import { useEffect, useState } from 'react'
import SocialApi from '../../../api/socialApi'
import './TrendingTags.css' // File CSS mới

function TrendingTags() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true)
      try {
        const trendingTags = await SocialApi.getTrendingTags()
        setTags(trendingTags)
      } catch (err) {
        console.error('Lỗi tải trending tags:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTags()
  }, [])

  return (
    <div className='sidebar-widget'>
      <h4 className='widget-title'>Thẻ (Tags) Nổi Bật</h4>
      {loading ? (
        <p className='widget-loading-text'>Đang tải...</p>
      ) : (
        <div className='trending-tag-list'>
          {tags.map((item) => (
            <a
              href={`/social/tags/${item.tag}`}
              key={item.tag}
              className='trending-tag-item'
            >
              <span className='tag-name'>#{item.tag}</span>
              <span className='tag-count'>
                {item.count.toLocaleString('vi-VN')} bài viết
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default TrendingTags
