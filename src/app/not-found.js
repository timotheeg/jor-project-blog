import Link from 'next/link'
 
export default async function NotFound() {
  return (
    <div style={{textAlign: 'center'}}>
      <h2>404 Not Found</h2>
      <p>This page does not exist. Please check the URL and try again.</p>
      <p>
        View <Link href="/">all posts</Link>
      </p>
    </div>
  )
}