import React from 'react';

const Logo = () => (
  <div
    style={{
      display: 'flex',
      gap: '15px',
    }}
  >
    <img
      style={{
        display: 'block',
        height: '20px',
      }}
      src="/static/logo.svg"
      alt="logo"
    />
    |dataset:{process.env.SANITY_STUDIO_API_DATASET}|
  </div>
);
export default Logo;
