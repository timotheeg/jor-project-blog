import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import { getBlogPostList } from '@/helpers/file-helpers';
import styles from './homepage.module.css';

async function Home() {
  const blogEntries = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {blogEntries.map(({slug, title, abstract, publishedOn}) => <BlogSummaryCard
          slug={slug}
          key={slug}
          title={title}
          abstract={abstract}
          publishedOn={publishedOn}
        />
      )}
    </div>
  );
}

export default Home;
