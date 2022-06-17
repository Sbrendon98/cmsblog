import Link from "next/link"
import Image from "next/image"
import { gql, GraphQLClient } from 'graphql-request'

const endpoint = 'https://api-us-east-1.graphcms.com/v2/cl3smw9s5ahr701z66qij4y0f/master'

const graphCMS = new GraphQLClient(endpoint)


const entrieSlugs = gql`
{
    posts {
      slug
    }
  }
  `
const Entrie = gql`
query Post($slug: String!) {
    post(where: {slug: $slug}) {
      id
      title
      publishedDate
      coverPhoto {
        url
      }
      author {
        profilePicture {
          url
        }
      }
      article {
        markdown
      }
    }
  }
  

`
export async function getStaticPaths() {
    const { posts } = await graphCMS.request(entrieSlugs)
    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const slug = params.slug
    const response = await graphCMS.request(Entrie, { slug })
    console.log(response)
    const singlePost = response.post
    return {
        props: {
            singlePost,
        },
        revalidate: 10
    }
}
export default function SingleBlogPage({ singlePost }) {
    const { title, publishedDate, coverPhoto, author, article } = singlePost
    return (
        <div className="h-screen flex flex-col p-0 p-8 bg-mainBackground">
            <h1 className="text-white">Hello From Single Blog Page</h1>
            <Link href="/">
                Go back to home!
            </Link>
            <h1>{title}</h1>
            <h2>{publishedDate}</h2>
            <img src={coverPhoto.url} />
            <img src={author.profilePicture.url} />
            <p>{article.markdown}</p>
        </div>

    )
}

