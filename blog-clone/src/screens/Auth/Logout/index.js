import React from 'react';
import { redirectTo } from '../../../helpers/utils';
import { isAuthenticated } from '../../../helpers/api-user';
import './style.scss';
import { Header } from '../../../components';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    let auth = isAuthenticated();
    if (!auth) {
      redirectTo('/other/other');
    }
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.pathname = '/flow/welcome';
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <button onClick={this.logout} className="logout">
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Logout;
