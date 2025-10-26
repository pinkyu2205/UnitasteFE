// src/pages/Social/Social.jsx
import Header from '../HomePage/components/Header'
import SocialLayout from './layouts/SocialLayout'
import './Social.css'

function Social() {
  return (
    <>
      <Header />
      <div className='social-page-container'>
        <SocialLayout />
      </div>
    </>
  )
}

export default Social
