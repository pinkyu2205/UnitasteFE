// src/pages/PreferenceSurvey/components/ProgressBar.jsx

import '../CSS/ProgressBar.css'

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100

  return (
    <div className='progress-container'>
      <div className='progress-bar'>
        <div
          className='progress-fill'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className='progress-text'>
        Câu hỏi {current} / {total}
      </div>
    </div>
  )
}

export default ProgressBar
