import React from "react";

import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import { notFound } from "next/navigation";

import Link from "next/link";
import CodeSnippet from "@/components/CodeSnippet";
import LazyDivisionGroupsDemo from "@/components/LazyDivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";

export const getBlogPost = React.cache(loadBlogPost);

export async function generateMetadata({ params }) {
  // read route params
  const { postSlug } = await params;
  let res;

  try {
    res = await getBlogPost(postSlug);
  } catch (err) {
    return;
  }

  const {
    frontmatter: { title, abstract: description },
  } = res;

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  let res;
  try {
    res = await getBlogPost(postSlug);
  } catch (err) {
    notFound();
  }

  const { frontmatter, content } = res;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            a: Link,
            pre: CodeSnippet,
            DivisionGroupsDemo: LazyDivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
