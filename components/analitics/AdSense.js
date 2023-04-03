import Script from 'next/script'
import React, { useEffect } from 'react'

export const AdSense = () => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-5012441343452330"
      data-ad-slot="5012441343452330"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export const Adense = () => {
  ;<Script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5012441343452330"
    crossorigin="anonymous"
  ></Script>
}
