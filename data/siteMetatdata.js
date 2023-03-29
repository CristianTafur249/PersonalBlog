const { analyticsId } = require("@/next.config");

const siteMetadata = {
    site_name: 'Tafur Blog',
    theme: 'system',
    title: ' The TechCode ',
    author: 'Cristian Tafur',
    headerTitle: ' The TechCode ',
    description: 'Código, tecnología y programación',
    language: 'es-ES',
    email: 'cristian2191970@correo.uis.edu.co',
    siteUrl: 'https://thechcode.netlify.app',
    instagramUrl: 'https://www.instagram.com/tafur0011/',
    facebookUrl: 'https://www.facebook.com/cristiandavid.tafurcampo',
    socialBanner: '/static/images/TechCode1.png',
    siteRepo: 'https://github.com/CristianTafur249/blog-personal.git',
    siteLogo: '/static/images/techcode.png',
    siteico: '/static/favicon/favicon.ico',
    twitter: 'https://twitter.com/Cristia16195614',
    linkedin: 'https://www.linkedin.com/in/cristaf/',
    locale: 'es-CO',
    github: 'https://github.com/CristianTafur249/',
    analytics: {
        googleAnalyticsId: "G-98D755MZH9",

    },
};
module.exports = siteMetadata