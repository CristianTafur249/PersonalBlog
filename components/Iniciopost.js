import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function InicioPost() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    if (window.pageYOffset > 500) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="bg-gray-500 shadow-lg hover:animate-bounce shadow-gray-400"
      onClick={handleClick}
      style={{
        position: 'fixed',
        zIndex: '100',
        right: '20px',
        bottom: '20px',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: showButton ? 'visible' : 'hidden',
      }}
    >
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: '#fff',
          fontSize: '1.2rem',
        }}
      >
        <FaArrowUp />
      </button>
    </div>
  )
}
