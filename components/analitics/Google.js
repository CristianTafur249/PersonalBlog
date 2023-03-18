import Script from "next/script";
import siteMetadata from "@/data/siteMetatdata";
const GAScrip = () => {
    return (
        <>
            {/* <!-- Google tag (gtag.js) --> */}
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-98D755MZH9`} />
            <Script strategy="lazyOnload" id="ga-script">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-98D755MZH9');
                `}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5012441343452330"
                crossorigin="anonymous"></Script>
        </>
    )
}
export default GAScrip

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (action, category, label, value) => {
    window.gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}