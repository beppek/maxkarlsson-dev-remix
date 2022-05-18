import React from 'react';
import PropTypes from 'prop-types';
import Emoji from 'a11y-react-emoji';

export const LinkIcon = () => <Emoji symbol="🔗" />;

const ExternalLinkRenderer = ({ children }) => (
  <span>
    {children} <LinkIcon />
  </span>
);

ExternalLinkRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExternalLinkRenderer;
