import { Adense } from "./AdSense"
import { GAcript } from "./Google"

const isProduction = process.env.NODE_ENV === 'production'

export const Analitics = () => {
    return (
        <>
            <GAcript/>{/* 
            <Adense/> */}
        </>
    )
}