/* eslint-disable react/no-string-refs */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { isAuthenticated } from '../../../helpers/api-user';
import { SERVER } from '../../../helpers/utils';
import './style.scss';
import { Loader, Header } from '../../../components/';
import notify from '../../../components/Notify';

// Semantic UI
import { Input } from 'semantic-ui-react';

class SetUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      website: '',
      bio: '',
      dob: '',
      profilePic: '',
      coverPhoto: '',
      btnDisabled: false,
      error: 'none',
      errorText: '',
      tokenObj: JSON.parse(localStorage.getItem('JWT_TOKEN')),
    };
    this.postData = this.postData.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
  }
  async componentDidMount() {
    let auth = await isAuthenticated();

    if (auth.additionalData) {
      let name = auth.additionalData.name || '';
      this.setState({
        name,
        location: auth.additionalData.location,
        bio: auth.additionalData.bio,
        website: auth.additionalData.website,
        dob: auth.additionalData.dob,
        profilePic: auth.additionalData.profilePic,
        coverPhoto: auth.additionalData.coverPhoto,
      });
    } else {
      // redirectTo("/flow/welcome");
    }
  }
  async postData(e) {
    e.preventDefault();
    this.setState({
      btnDisabled: true,
    });
    const userData = {
      name: this.state.name,
      location: this.state.location,
      website: this.state.website,
      bio: this.state.bio,
      dob: this.state.dob,
      // profilePic: this.state.profilePic,
      // coverPhoto: this.state.coverPhoto,
    };

    let res = await fetch(`${SERVER}/api/user/editprofile`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.tokenObj.token,
      }),
      body: JSON.stringify(userData),
    });

    res
      .json()
      .then(() => {
        this.setState({ btnDisabled: false });
        window.location.pathname = '/' + localStorage.getItem('username');
      })
      .catch(() => {
        this.setState({ btnDisabled: false });
        window.location.pathname = '/' + localStorage.getItem('username');
      });
  }
  async uploadPhotos() {
    notify('Uploading photo...');
    var data = new FormData();
    let type;
    if (this.refs.file.files[0] && this.refs.filetwo.files[0]) {
      data.append('image', this.refs.file.files[0]);
      data.append('image', this.refs.filetwo.files[0]);
      type = 'Both';
    } else if (this.refs.file.files[0]) {
      data.append('image', this.refs.file.files[0]);
      type = 'Profile';
    } else if (this.refs.filetwo.files[0]) {
      data.append('image', this.refs.filetwo.files[0]);
      type = 'Cover';
    }
    let res = await fetch(`${SERVER}/api/user/upload/?type=${type}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + this.state.tokenObj.token,
      },
      body: data,
    });
    res.json().then(() => {
      notify('Photo uploaded...!');
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Set up your profile</h1>
          <label>Profile Photo</label>
          <input
            type="file"
            name="image"
            ref="file"
            onChange={this.uploadPhotos}
          />
          <label>Cover Photo</label>
          <input
            type="file"
            name="image"
            ref="filetwo"
            onChange={this.uploadPhotos}
          />

          <form className="ui form">
            <div className="field">
              <label style={{ display: this.state.error }} className="error">
                {this.state.errorText}
              </label>
            </div>
            {/* --USER NAME-- */}
            <div className="field setup">
              <label>User name</label>
              <input
                value={this.state.name}
                type="text"
                name="location"
                placeholder="Full Name..."
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            {/* Location */}
            <div className="field">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={this.state.location}
                onChange={(e) => {
                  this.setState({ location: e.target.value });
                }}
                spellCheck="false"
                placeholder="Location"
              />
            </div>
            {/* Personal homepage */}
            <div className="field">
              <label>Personal homepage</label>
              <input
                type="text"
                name="website"
                value={this.state.website}
                onChange={(e) => {
                  this.setState({ website: e.target.value });
                }}
                placeholder="Personal homepage"
              />
            </div>
            {/* Describe yourself */}
            <div className="field">
              <label>Describe yourself</label>
              <textarea
                name="bio"
                rows={4}
                value={this.state.bio}
                onChange={(e) => {
                  this.setState({ bio: e.target.value });
                }}
                placeholder="Your bio"
                className="input-field"
              ></textarea>
            </div>
            {/* Date of Birth */}
            <div className="field">
              <label>Date of birth</label>
              <Input
                type="date"
                name="dob"
                value={this.state.dob}
                onChange={(e) => {
                  this.setState({ dob: e.target.value });
                }}
                placeholder="Date of Birth"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              onClick={this.postData}
              className="submit-btn"
            >
              {this.state.btnDisabled ? <Loader /> : 'Update Profile'}
            </button>
          </form>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover={false}
        />
      </div>
    );
  }
}

export default SetUp;
