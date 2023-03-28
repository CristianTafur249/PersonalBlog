import Link from './Link'
import Image from './Image'

const Card = ({ title, description, imgSrc, href }) => {
    return (
        <div className="flex justify-center">
            <div
                className={`${imgSrc && 'h-full'
                    } block max-w-sm rounded-lg bg-gray- shadow-lg dark:bg-neutral-700`}>
                {imgSrc &&
                    (href ? (
                        <Link href={href} aria-label={`Link to ${title}`}>
                            <Image
                                alt={title}
                                src={imgSrc}
                                className="rounded-t-lg"
                                width={544}
                                height={306}
                            />
                        </Link>
                    ) : (
                        <Image
                            alt={title}
                            src={imgSrc}
                            className="rounded-t-lg"
                            width={544}
                            height={306}
                        />
                    ))
                }
                <div class="p-6">
                    <h5
                        class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {href ? (
                            <Link href={href} aria-label={`Link to ${title}`}>
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        {description}
                    </p>
                    {href && (
                        <Link
                            href={href}
                            aria-label={`Link to ${title}`}
                        >
                            Ver más &rarr;
                        </Link>
                    )}

                </div>
            </div>
        </div>
    )
}
export default Card