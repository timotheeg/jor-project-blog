import React from 'react';

import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

import Link from 'next/link';
import CodeSnippet from '@/components/CodeSnippet';
import LazyDivisionGroupsDemo from '@/components/LazyDivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';

export async function generateMetadata(
  { params },
) {
  // read route params
  const { postSlug } = await params;
  const { frontmatter: {title, abstract: description} } = await loadBlogPost(postSlug);
 
  return {
    title: `${title} • ${BLOG_TITLE}`,
    description
  };
}

async function BlogPost({params}) {
  const { postSlug } = await params;

  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{
        a: Link,
        pre: CodeSnippet,
        DivisionGroupsDemo: LazyDivisionGroupsDemo,
        CircularColorsDemo,
      }} />
      </div>
    </article>
  );
}

export default BlogPost;
