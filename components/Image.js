import NextImage from 'next/image'

const Image = ({ ...rest }) => {
    return (
        <section>
            <NextImage {...rest} />
        </section>
    )
}

export default Image;