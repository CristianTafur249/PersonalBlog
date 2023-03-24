import NextImage from 'next/image'

const Image = ({ ...rest }) => {
    return (
            <NextImage {...rest} />
    )
}

export default Image;