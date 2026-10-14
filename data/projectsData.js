import { description } from './siteMetadata'

const projectData = [
    {
        id: 'techcode',
        title: 'ThechCode',
        description: `TechCode: Blog personal enfocado en tecnología y programación. Explora desarrollo de software, programación, noticias y más. ¡Bienvenido a participar y compartir! Contacto abierto para preguntas y sugerencias. Disfruta y únete a la conversación.`,
        imgSrc: 'https://www.dropbox.com/s/3pygigs54e13jjr/TechCode1.png?raw=1',
        href: 'https://thechcode.netlify.app/',
        technologies: ['Next.js', 'React'],
        featured: true
    },
    {
        title: 'CUSOL WEB',
        description: `CUSOL WEB: Plataforma vital para la comunidad universitaria del software libre en UIS. Su creación se orienta a la promoción y difusión.`,
        imgSrc: 'https://www.dropbox.com/s/ne1t8zhr390k33t/CUSOL_WEB.png?raw=1',
    },
    {
        title: 'Rutavity',
        description:
            'Rutavity, tu tienda online de bicicletas, repuestos y accesorios.',
        imgSrc: 'https://www.dropbox.com/s/vbpzaqoi5h73fiw/Rutavity.png?raw=1',
        href: 'https://rutavity.com/',
    },
    {
        title: 'MediaJelly',
        description:
            'Servidor multimedia personal automatizado con Docker: organiza la biblioteca, comprime los archivos según su tamaño, detecta el idioma del audio para elegir subtítulos y avisa por Telegram de cada proceso.',
        href: 'https://github.com/CristianTafur249/sonarrConf',
        technologies: ['Docker', 'Python', 'Jellyfin'],
    },
    {
        title: 'Sistema de Horarios UIS',
        description:
            'Sistema de horarios desarrollado con la comunidad CUSOL para la UIS. Permite administrar asignaturas, grupos, aulas, profesores y periodos académicos, con una API en Spring Boot y una interfaz en Angular.',
        technologies: ['Spring Boot', 'Angular', 'Docker'],
    },
    {
        title: 'Contratación UIS',
        description:
            'Participación en el desarrollo del sistema de contratación de la Universidad Industrial de Santander: gestión de contratos, adiciones y proveedores, con servicios en Java y Spring Boot e interfaces en Angular.',
        technologies: ['Java', 'Spring Boot', 'Angular'],
    },
]

export default projectData
