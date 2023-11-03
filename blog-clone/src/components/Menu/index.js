import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// eslint-disable-next-line react/prop-types
function Menu({ visibility }) {
  return (
    <div className="sidemenu" style={{ visibility: visibility }}>
      <div>
        <Link to="/flow/logout">
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
