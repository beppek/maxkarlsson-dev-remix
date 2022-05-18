import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from 'part:@sanity/base/client';
import { toPlainText } from './frontend-utils';
import styles from './facebook-share.css';

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source) => {
  return builder.image(source);
};

type Props = {
  document: any;
  width?: number;
  options: any;
};

function FacebookShare({ document, width = 500 }: Props) {
  const {
    title,
    excerpt: description = [],
    mainImage: openGraphImage,
  } = document;
  const websiteUrl = 'http://localhost:3000';
  const websiteUrlWithoutProtocol = websiteUrl.split('://')[1];

  return (
    <div className={styles.seoItem}>
      <h3>Facebook share</h3>
      <div className={styles.facebookWrapper} style={{ width }}>
        <div className={styles.facebookImageContainer}>
          <img
            className={styles.facebookCardImage}
            src={urlFor(openGraphImage).width(500).url()}
          />
        </div>
        <div className={styles.facebookCardContent}>
          <div className={styles.facebookCardUrl}>
            {websiteUrlWithoutProtocol}
          </div>
          <div className={styles.facebookCardTitle}>
            <a href={websiteUrl}>{title}</a>
          </div>
          <div className={styles.facebookCardDescription}>
            {toPlainText(description)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacebookShare;
