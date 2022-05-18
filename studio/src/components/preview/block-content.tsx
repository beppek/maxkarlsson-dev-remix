import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

type Props = {
  value: {
    blocks: any;
  };
};

export const Preview = ({ value: { blocks } }: Props) => (
  <BlockContent blocks={blocks} />
);
