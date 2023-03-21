import { useEffect } from 'react'
import ReactGA from 'react-ga'
import Cookies from 'universal-cookie'
import Script from 'next/script'
import siteMetadata from '@/data/siteMetatdata'

const ANALYTICS_ID = siteMetadata.analytics.googleAnalyticsId

export const GAScrip = () => {
    ReactGA.initialize(ANALYTICS_ID)
}

export const logPageView = () => {
  const pagePath = window.location.pathname;
  ReactGA.set({ page: pagePath, start_time: new Date().getTime() });
  ReactGA.pageview(pagePath);
}
export const logPageTime = (category, variable, value) => {
  ReactGA.timing({
    category: category,
    variable: variable,
    value: value,
    label: window.location.pathname,
    startTime: new Date().getTime() - value // tiempo de permanencia en la página
  });
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
