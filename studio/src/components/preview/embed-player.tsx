import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  value: {
    url: string;
  };
};

export const EmbedPlayer = ({ value }: Props) => {
  if (!value.url) {
    return null;
  }

  return <ReactPlayer url={value.url} controls />;
};
