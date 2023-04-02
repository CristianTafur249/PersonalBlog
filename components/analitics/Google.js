import { setCookie } from 'nookies'
import React from 'react'
import ReactGA from 'react-ga'
import Script from 'next/script'
import siteMetadata from '@/data/siteMetatdata'
import Cookies from 'js-cookie'

export const GTM_ID = 'GTM-MB5QVWF';
const ANALYTICS_ID = siteMetadata.analytics.googleAnalyticsId

/* export const GAScrip = () => {
  ReactGA.initialize(ANALYTICS_ID)
} */
export const initGTM = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GTM_ID);
  }
};

export const logPageView = () => {
  if (typeof window !== 'undefined') {
    pageview(window.location.pathname + window.location.search);
    const pagePath = window.location.pathname;
   /*  ReactGA.set({ page: pagePath, start_time: new Date().getTime() });
    ReactGA.pageview(pagePath); */
  }
};

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    pagePath: url,
  });
};

/* export const logPageTime = (category, variable, value) => {
  ReactGA.timing({
    category: category,
    variable: variable,
    value: value,
    label: window.location.pathname,
    startTime: new Date().getTime() - value // tiempo de permanencia en la página
  });
} */



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
