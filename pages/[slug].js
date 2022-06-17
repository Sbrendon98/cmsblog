import Link from "next/link"

export default function SingleBlogPage() {
    return (
        <div className="h-screen flex flex-col p-0 p-8 bg-mainBackground">
            <h1 className="text-white">Hello From Single Blog Page</h1>
            <Link href="/">
                Go back to home!
            </Link>
        </div>

    )
}

