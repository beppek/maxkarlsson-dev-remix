import React from 'react';
import { assemblePageUrl, toPlainText } from './frontend-utils';
import Truncate from './truncate-comp';
import styles from './google-search-result.css';

type Props = {
  document: any;
  width?: number;
  options: any;
};

function GoogleSearchResult({ document, options, width = 500 }: Props) {
  const { title, excerpt } = document;
  const url = assemblePageUrl({ document, options });

  return (
    <div className={styles.seoItem}>
      <h3>Google search result preview</h3>
      <div className={styles.googleWrapper} style={{ width }}>
        <Truncate maxWidth={width} className={styles.title}>
          {title}
        </Truncate>
        <div className={styles.url}>{url}</div>
        {excerpt && (
          <Truncate maxChars={300} className={styles.description}>
            {toPlainText(excerpt)}
          </Truncate>
        )}
      </div>
    </div>
  );
}

export default GoogleSearchResult;
