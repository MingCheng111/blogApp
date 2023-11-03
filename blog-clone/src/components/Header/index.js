import React from 'react';
import { Link } from 'react-router-dom';

import { USER_ID } from '../../helpers/utils';
import './style.scss';

const Header = () => {
  return (
    <div className="header ui top fixed menu">
      <div className="icon-container hitem">
        <Link to="/">
          <div className="logo-icon">
            <i className="fab fa-twitter title-icon"></i>
          </div>
        </Link>
      </div>

      <div className="heading hitem">
        <h1>&emsp;&emsp;&emsp;BLOG --- Discover What{"'"}s Happening!</h1>
      </div>
      {USER_ID ? (
        <p></p>
      ) : (
        <div className="extra-link hitem">
          <Link to="/flow/signup">Register!</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
