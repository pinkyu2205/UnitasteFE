// src/pages/PreferenceSurvey/PreferenceSurvey.jsx

import { useState } from 'react'
import ProgressBar from './component/ProgressBar'
import SurveyStep from './component/SurveyStep'
import './CSS/PreferenceSurvey.css'

const PreferenceSurvey = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState({
    priceRange: [],
    customPrice: '',
    preferredPlaces: [],
    customPlace: '',
    goingWithWho: [],
    customCompany: '',
    placeFeatures: [],
    customFeatures: '',
    purpose: [],
    customPurpose: '',
    cuisine: [],
    atmosphere: [],
    distance: null,
    workingHours: [],
    notes: '',
  })

  const priceRanges = [
    { id: 1, name: 'Bình dân (Dưới 50k)', minPrice: 0, maxPrice: 50000 },
    { id: 2, name: 'Vừa phải (50k - 150k)', minPrice: 50000, maxPrice: 150000 },
    {
      id: 3,
      name: 'Trung bình (150k - 300k)',
      minPrice: 150000,
      maxPrice: 300000,
    },
    {
      id: 4,
      name: 'Cao cấp (300k - 700k)',
      minPrice: 300000,
      maxPrice: 700000,
    },
    { id: 5, name: 'Sang trọng (700k+)', minPrice: 700000, maxPrice: 10000000 },
  ]

  const preferredPlaces = [
    'Nhà hàng',
    'Quán vỉa hẻ',
    'Tiệm cà phê',
    'Quán ăn bình dân',
    'Buffet',
    'Quán nướng',
    'Ẩm thực châu Á',
    'Ẩm thực Tây',
  ]

  const goingWithWhoOptions = [
    'Bạn bè',
    'Gia đình / Người thân',
    'Người yêu',
    'Đồng nghiệp',
    'Một mình',
    'Nhóm lớn',
  ]

  const placeFeatures = [
    'Có chỗ cắm điện',
    'Không gian thoáng mát',
    'Có chỗ để chụp checkin',
    'Wi-Fi miễn phí',
    'Có chỗ để ô tô',
    'Có không khí lạnh',
    'Trang trí đẹp',
    'Yên tĩnh',
    'Sân ngoài trời',
    'Phòng riêng tư',
  ]

  const purposeOptions = [
    'Làm việc / Họp',
    'Tán gẫu',
    'Chụp checkin',
    'Ăn uống thưởng thức',
    'Buổi gặp gỡ quan trọng',
    'Kỉ niệm ngày đặc biệt',
    'Hẹn hò',
    'Dạy bù',
    'Tiệc tùng',
  ]

  const cuisineOptions = [
    'Ẩm thực Việt Nam',
    'Ẩm thực Nhật Bản',
    'Ẩm thực Thái Lan',
    'Ẩm thực Hàn Quốc',
    'Ẩm thực Trung Quốc',
    'Ẩm thực Ý',
    'Ẩm thực Mỹ',
    'Hải sản',
    'Chay / Vegetarian',
    'Đồ nướng',
    'Bánh mì',
    'Cơm tấm',
  ]

  const atmosphereOptions = [
    'Sang trọng / Cao cấp',
    'Hiện đại / Trendy',
    'Ấm cúng / Cổ điển',
    'Năng động / Trẻ trung',
    'Yên tĩnh / Thư thái',
    'Gia đình thân thiện',
  ]

  const workingHoursOptions = [
    'Sáng sớm (6h - 9h)',
    'Trưa (11h - 14h)',
    'Chiều (15h - 17h)',
    'Tối sớm (17h - 19h)',
    'Tối muộn (19h - 22h)',
    'Đêm khuya (22h - 24h)',
  ]

  const surveys = [
    {
      title: 'Mức giá mà bạn mong muốn',
      description: 'Chọn khoảng giá phù hợp với bạn (có thể chọn nhiều mục)',
      type: 'multiselect-with-input',
      key: 'priceRange',
      customKey: 'customPrice',
      options: priceRanges.map((p) => ({ label: p.name, value: p.id })),
      placeholder: 'Nhập mức giá riêng của bạn (VND)...',
    },
    {
      title: 'Những địa điểm bạn thường hay tới',
      description: 'Loại quán ăn bạn yêu thích',
      type: 'multiselect-with-input',
      key: 'preferredPlaces',
      customKey: 'customPlace',
      options: preferredPlaces.map((p) => ({ label: p, value: p })),
      placeholder: 'Thêm loại địa điểm khác...',
    },
    {
      title: 'Bạn thường đi ăn với ai?',
      description: 'Những người bạn thường đi cùng',
      type: 'multiselect-with-input',
      key: 'goingWithWho',
      customKey: 'customCompany',
      options: goingWithWhoOptions.map((p) => ({ label: p, value: p })),
      placeholder: 'Thêm những người khác...',
    },
    {
      title: 'Đặc điểm địa điểm mà bạn mong muốn',
      description: 'Chọn các tính năng quan trọng với bạn',
      type: 'multiselect-with-input',
      key: 'placeFeatures',
      customKey: 'customFeatures',
      options: placeFeatures.map((p) => ({ label: p, value: p })),
      placeholder: 'Thêm đặc điểm khác...',
    },
    {
      title: 'Mục đích bạn thường đi để làm gì?',
      description: 'Những mục đích chính khi bạn đi ăn',
      type: 'multiselect-with-input',
      key: 'purpose',
      customKey: 'customPurpose',
      options: purposeOptions.map((p) => ({ label: p, value: p })),
      placeholder: 'Thêm mục đích khác...',
    },
    {
      title: 'Loại ẩm thực bạn yêu thích',
      description: 'Chọn những loại ẩm thực mà bạn thích',
      type: 'multiselect-with-input-display',
      key: 'cuisine',
      options: cuisineOptions.map((c) => ({ label: c, value: c })),
      placeholder: 'Thêm loại ẩm thực khác...',
    },
    {
      title: 'Không khí / Phong cách của địa điểm',
      description: 'Bạn thích không khí như thế nào?',
      type: 'multiselect-with-input-display',
      key: 'atmosphere',
      options: atmosphereOptions.map((a) => ({ label: a, value: a })),
      placeholder: 'Thêm phong cách khác...',
    },
    {
      title: 'Khoảng cách từ bạn',
      description: 'Bạn sẵn sàng đi bao xa?',
      type: 'single-select',
      key: 'distance',
      options: [
        { label: 'Dưới 1 km', value: '1km' },
        { label: '1 - 3 km', value: '1-3km' },
        { label: '3 - 5 km', value: '3-5km' },
        { label: '5 - 10 km', value: '5-10km' },
        { label: 'Trên 10 km', value: '10km+' },
      ],
    },
    {
      title: 'Thời gian bạn thường đi ăn',
      description: 'Chọn những khung giờ bạn thường đi',
      type: 'multiselect-with-input-display',
      key: 'workingHours',
      options: workingHoursOptions.map((w) => ({ label: w, value: w })),
      placeholder: 'Thêm khung giờ khác...',
    },
    {
      title: 'Ghi chú thêm',
      description: 'Có gì khác bạn muốn chia sẻ không?',
      type: 'textarea',
      key: 'notes',
      placeholder: 'Chia sẻ những thông tin hoặc yêu cầu đặc biệt...',
    },
  ]

  const handleSelectOption = (key, value, isMultiple = true) => {
    if (isMultiple) {
      const current = surveyData[key] || []
      if (current.includes(value)) {
        setSurveyData({
          ...surveyData,
          [key]: current.filter((item) => item !== value),
        })
      } else {
        setSurveyData({
          ...surveyData,
          [key]: [...current, value],
        })
      }
    } else {
      setSurveyData({
        ...surveyData,
        [key]: value,
      })
    }
  }

  const handleAddCustom = (key, value) => {
    if (!value.trim()) return
    const current = surveyData[key] || []
    setSurveyData({
      ...surveyData,
      [key]: [...current, value],
      [`custom${key.charAt(0).toUpperCase() + key.slice(1)}`]: '',
    })
  }

  const handleInputChange = (key, value) => {
    setSurveyData({
      ...surveyData,
      [key]: value,
    })
  }

  const handleNext = () => {
    if (currentStep < surveys.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Survey Data:', surveyData)
    // Gọi API để lưu dữ liệu
    // saveUserPreferences(surveyData)
    alert('Cảm ơn bạn đã hoàn thành khảo sát! Dữ liệu của bạn đã được lưu.')
  }

  const currentSurvey = surveys[currentStep]

  return (
    <div className='survey-container'>
      <div className='survey-wrapper'>
        <div className='survey-header'>
          <h1>Khảo sát sở thích của bạn</h1>
          <p>Giúp chúng tôi tìm hiểu bạn hơn để đưa ra gợi ý tốt nhất</p>
        </div>

        <ProgressBar current={currentStep + 1} total={surveys.length} />

        <SurveyStep
          survey={currentSurvey}
          surveyData={surveyData}
          onSelectOption={handleSelectOption}
          onAddCustom={handleAddCustom}
          onInputChange={handleInputChange}
        />

        <div className='survey-actions'>
          <button
            className='btn-prev'
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            ← Quay lại
          </button>
          <button className='btn-next' onClick={handleNext}>
            {currentStep === surveys.length - 1 ? 'Hoàn thành' : 'Tiếp theo →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreferenceSurvey
