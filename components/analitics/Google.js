import { useEffect } from 'react'
import ReactGA from 'react-ga'
import Cookies from 'universal-cookie'
import Script from 'next/script'
import siteMetadata from '@/data/siteMetatdata'

const ANALYTICS_ID = 'G-98D755MZH9'

export const GAScrip = () => {
    ReactGA.initialize(ANALYTICS_ID)
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}



export const GAcript = () => {
  return (
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
            gtag('config', '${siteMetadata.analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
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
