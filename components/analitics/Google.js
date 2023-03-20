import { useEffect } from 'react'
import ReactGA from 'react-ga'
import Cookies from 'universal-cookie'

const ANALYTICS_ID = 'G-98D755MZH9'

export const GAScrip = () => {
    ReactGA.initialize(ANALYTICS_ID)
}

export const logPageView = () => {
    const cookies = new Cookies();/* 
    cookies.set('_ga_98D755MZH9', { path: '/', SameSite: 'none', secure: true }); */
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}
