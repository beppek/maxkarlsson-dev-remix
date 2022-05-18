import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from 'part:@sanity/base/client';
import { assemblePageUrl, toPlainText } from './frontend-utils';
import styles from './twitter-card.css';

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source) => builder.image(source);

const author = {
  name: 'Sanity.io',
  handle: 'sanity_io',
  image:
    'https://pbs.twimg.com/profile_images/1135907399582199809/7uZ5d2to_400x400.jpg',
};

type Props = {
  document: any;
  width?: number;
  options: any;
};

function TwitterCard({ document, width = 500, options }: Props) {
  const { title, excerpt, mainImage } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split('://')[1];
  return (
    <div className={styles.seoItem}>
      <h3>Twitter card preview</h3>
      <div className={styles.tweetWrapper} style={{ width }}>
        {author && (
          <div className={styles.tweetAuthor}>
            <img
              alt={author.name}
              className={styles.tweetAuthorAvatar}
              src={
                author && typeof author.image === 'object'
                  ? urlFor(author.image).width(300).url()
                  : author.image
              }
            />
            <span className={styles.tweetAuthorName}>{author.name}</span>
            <span className={styles.tweetAuthorHandle}>@{author.handle}</span>
          </div>
        )}

        <div className={styles.tweetText}>
          <p>
            The card for your website will look a little something like this!
          </p>
        </div>
        <a href={url} className={styles.tweetUrlWrapper}>
          <div className={styles.tweetCardPreview}>
            <div className={styles.tweetCardImage}>
              <img alt="Main" src={urlFor(mainImage).width(300).url()} />
            </div>
            <div className={styles.tweetCardContent}>
              <h2 className={styles.tweetCardTitle}>{title}</h2>
              {excerpt && (
                <div className={styles.tweetCardDescription}>
                  {toPlainText(excerpt)}
                </div>
              )}
              <div className={styles.tweetCardDestination}>
                {websiteUrlWithoutProtocol}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

TwitterCard.defaultProps = {
  width: 500,
};

export default TwitterCard;
