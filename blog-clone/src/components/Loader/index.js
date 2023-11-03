import React from 'react';
import './style.scss';

// eslint-disable-next-line react/display-name, react/prop-types
export default ({ inverted }) => {
  return inverted ? (
    <div className="loading-inverted"></div>
  ) : (
    <div className="loading"></div>
  );
};
