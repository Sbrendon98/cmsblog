import Link from 'next/link'
import Image from 'next/image'

export default function SlideShowCard({ title, slug, id, publishedDate, coverPhoto }) {
    console.log(coverPhoto.url)
    return (
        <div>
            <h1>{title}</h1>
            <h3>{id}</h3>
            <p>{publishedDate}</p>
            <Link href={`/${slug}`}>
                <Image height={500}
                    width={500}
                    src={coverPhoto.url}
                    alt='' />
            </Link>

        </div>
    )
}