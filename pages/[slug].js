import Link from "next/link"
import Image from "next/image"
import { gql, GraphQLClient } from 'graphql-request'
import SlideShowCard from "../components/SlideShow"
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
        name
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
  let published = new Date(publishedDate)
  console.log(author)
  return (
    <div className="h-[2235px] flex flex-col p-0  bg-mainBackground">
      <div className="flex sticky top-0 bg-mainBackground items-center h-[87px]">
        <Link href="/">
                  <h1 className='font-Train text-[40px] text-white'>SpotBlog</h1>
        </Link>
      </div>
      <div className="sticky top-[87px] h-1 bg-white w-1440"></div>
      {/* 
      <h1 className="text-white">Hello From Single Blog Page</h1>
      <Link href="/">
        Go back to home!
  </Link> */}
      <img className="h-670" src={coverPhoto.url} />
      <h1 className="text-white font-Old text-[70px]">{title}</h1>
      <div className="space-x-1">
        <h2 className="text-shadow-date inline-block font-Old text-[48px]">{author.name} |</h2>
      <h2 className="inline-block text-white text-[32px] font-Old">{published.toDateString()}</h2>
      </div>
      
      {/* <img src={author.profilePicture.url} /> */}
      <div className="">
        <p className="text-white font-Old text-[30px]">{article.markdown}</p>
      </div>
      <div className="Vertical Slide Show">
        {}
      </div>
    </div>

  )
}

