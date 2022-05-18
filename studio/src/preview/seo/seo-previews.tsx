import React from 'react';
import GoogleSearchResult from './google-search-result';
import TwitterCard from './twitter-card';
import FacebookShare from './facebook-share';

type Props = {
  document: any;
  options: any;
};

function SeoPreviews({ options, document: { displayed } }: Props) {
  return (
    <>
      <GoogleSearchResult document={displayed} options={options} />
      <TwitterCard document={displayed} options={options} />
      <FacebookShare document={displayed} options={options} />
    </>
  );
}

export default SeoPreviews;
