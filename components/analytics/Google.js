import React from 'react'

import siteMetadata from '@/data/siteMetadata'
export const GTM_ID = 'GTM-MB5QVWF'
const ANALYTICS_ID = siteMetadata.analytics.googleAnalyticsId

export const initGTM = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.body.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GTM_ID)
  }
}

export const logPageView = () => {
  if (typeof window !== 'undefined') {
    pageview(window.location.pathname + window.location.search)
  }
}

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    pagePath: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (action, category, label, value) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
