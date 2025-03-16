import RSS from "rss";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export async function GET() {
  const feed = new RSS({
    title: BLOG_TITLE,
    feed_url: "/rss.xml",
  });

  const entries = await getBlogPostList();

  entries.forEach(
    ({ title, abstract: description, publishedOn, slug: url }) => {
      feed.item({
        title,
        description,
        url,
        publishedOn,
      });
    }
  );

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
