import React, { useState, useEffect } from 'react'
import ScrollProgressBar from 'react-scroll-progress-bar'

/**
 * Componente que muestra una barra de progreso de desplazamiento basada en la posición de desplazamiento de la ventana.
 */
export default function Scrollbar() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <ScrollProgressBar position={scrollPosition} />
    </div>
  )
}
