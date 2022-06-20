import Link from 'next/link'
import Image from 'next/image'

export default function SlideShowCard({ title, slug, id, publishedDate, coverPhoto }) {
    return (
        <>
            <h1>{title}</h1>
            <h3>{id}</h3>
            <p>{publishedDate}</p>
            <Link href={`/${slug}`}>
                <img className="rounded-2xl h-[382px] w-[500px]" src={coverPhoto.url}></img>
            </Link>
        </>
    )
}