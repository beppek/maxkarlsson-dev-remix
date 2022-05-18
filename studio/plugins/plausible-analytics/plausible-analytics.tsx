import React from 'react';

type Props = {
  src: string;
};

function PlausibleAnalytics({ src }: Props) {
  return (
    <div
      style={{
        borderRadius: '3px',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
      }}
    >
      <iframe
        title="Plausible Analytics"
        plausible-embed
        src={src}
        scrolling="yes"
        frameBorder="0"
        loading="lazy"
        style={{ width: '1px', minWidth: '100%', height: '1600px' }}
      />
      <script async src="https://plausible.io/js/embed.host.js" />
    </div>
  );
}

export default PlausibleAnalytics;
