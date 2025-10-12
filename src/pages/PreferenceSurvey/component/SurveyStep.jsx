// src/pages/PreferenceSurvey/components/SurveyStep.jsx

import { useState } from 'react'
import '../CSS/SurveyStep.css'

const SurveyStep = ({
  survey,
  surveyData,
  onSelectOption,
  onAddCustom,
  onInputChange,
}) => {
  const [customInput, setCustomInput] = useState('')

  const handleAddCustom = () => {
    onAddCustom(survey.key, customInput)
    setCustomInput('')
  }

  const handleRemoveItem = (key, value) => {
    const current = surveyData[key] || []
    onSelectOption(key, value, true)
  }

  if (survey.type === 'textarea') {
    return (
      <div className='survey-step'>
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>

        <textarea
          value={surveyData[survey.key] || ''}
          onChange={(e) => onInputChange(survey.key, e.target.value)}
          placeholder={survey.placeholder}
          className='survey-textarea'
          rows='6'
        />
      </div>
    )
  }

  if (survey.type === 'single-select') {
    return (
      <div className='survey-step'>
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>

        <div className='options-grid single-select'>
          {survey.options.map((option) => (
            <button
              key={option.value}
              className={`option-btn ${
                surveyData[survey.key] === option.value ? 'selected' : ''
              }`}
              onClick={() => onSelectOption(survey.key, option.value, false)}
            >
              <span className='radio-circle'></span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (
    survey.type === 'multiselect' ||
    survey.type === 'multiselect-with-input' ||
    survey.type === 'multiselect-with-input-display'
  ) {
    const currentValues = surveyData[survey.key] || []
    const showCustomInput =
      survey.type === 'multiselect-with-input' ||
      survey.type === 'multiselect-with-input-display'

    return (
      <div className='survey-step'>
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>

        <div className='options-grid'>
          {survey.options.map((option) => (
            <button
              key={option.value}
              className={`option-btn ${
                currentValues.includes(option.value) ? 'selected' : ''
              }`}
              onClick={() => onSelectOption(survey.key, option.value, true)}
            >
              <span className='checkbox'></span>
              {option.label}
            </button>
          ))}
        </div>

        {showCustomInput && (
          <div className='custom-input-section'>
            <div className='input-wrapper'>
              <input
                type='text'
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddCustom()
                }}
                placeholder={survey.placeholder}
                className='custom-input'
              />
              <button
                className='add-btn'
                onClick={handleAddCustom}
                disabled={!customInput.trim()}
              >
                + Thêm
              </button>
            </div>

            {currentValues.length > 0 && (
              <div className='selected-items'>
                <p className='items-label'>Đã chọn ({currentValues.length}):</p>
                <div className='items-list'>
                  {currentValues.map((item) => (
                    <div key={item} className='item-tag'>
                      <span>{item}</span>
                      <button
                        className='remove-btn'
                        onClick={() => handleRemoveItem(survey.key, item)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {survey.type === 'multiselect' && currentValues.length > 0 && (
          <div className='selected-items'>
            <p className='items-label'>Đã chọn: {currentValues.length} mục</p>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default SurveyStep
