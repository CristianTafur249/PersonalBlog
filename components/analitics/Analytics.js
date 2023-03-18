const siteMetadata = require("@/data/siteMetatdata")
const { default: GAScrip } = require("./Google")

const isProduction = process.env.NODE_ENV === 'production'

const Analytics=()=>{
    return(
        <>
        {isProduction && siteMetadata.analytics.googleAnalyticsId && <GAScrip/>}
        </>
    )
}
export default Analytics