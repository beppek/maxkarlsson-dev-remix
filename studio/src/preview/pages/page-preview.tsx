import React from 'react';
import SanityMobilePreview from 'sanity-mobile-preview';
import 'sanity-mobile-preview/dist/index.css?raw';
import resolveProductionUrl from '../../resolve-production-url';
import styles from './iframe-preview.css';

type Props = {
  document: {
    displayed: any;
  };
  options: {
    mobile: boolean;
  };
};

export default function PagePreview({ document, options, ...props }: Props) {
  const { displayed } = document;
  const slug = displayed?.slug?.current;
  if (!slug) {
    return <div>The page needs a slug before it can be previewed.</div>;
  }

  const url = resolveProductionUrl(displayed);

  return (
    <div className={styles.componentWrapper}>
      {options.mobile ? (
        <SanityMobilePreview>
          <div
            className={
              styles.iframeContainer
              // options.mobile ? styles.mobileIframeContainer : styles.iframeContainer
            }
          >
            <iframe
              title={`Preview: ${document.displayed.title}`}
              src={url}
              frameBorder="0"
            />
          </div>
        </SanityMobilePreview>
      ) : (
        <div
          className={
            styles.iframeContainer
            // options.mobile ? styles.mobileIframeContainer : styles.iframeContainer
          }
        >
          <iframe
            title={`Preview: ${document.displayed.title}`}
            src={url}
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
}
