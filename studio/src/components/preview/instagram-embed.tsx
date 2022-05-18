import React from 'react';
import InstagramEmbed from 'react-instagram-embed';

type Props = {
  value: {
    url: string;
  };
};

export const InstagramPreview = ({ value }: Props) => {
  if (!value.url) {
    return null;
  }
  return <InstagramEmbed url={value.url} />;
};
