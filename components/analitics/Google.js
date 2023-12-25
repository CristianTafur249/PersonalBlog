import React from 'react'

import siteMetadata from '@/data/siteMetatdata'
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

export const GAcript = () => {
  return (
    <>
      {/* <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MB5QVWF" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} />
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
      />

      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.analytics.googleAnalyticsId}',{
              page_path: window.location.pathname,
              'timing_complete': {
                'name': 'load_time',
                'value': performance.now(),
                'event_category': 'page_load',
                'event_label': window.location.pathname
              }
            });
        `}
      </Script>
    </> */}
    </>
  )
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (action, category, label, value) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
