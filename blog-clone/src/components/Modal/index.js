/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './style.scss';
import Media from '../Media';

function Modal(props) {
  // props variables
  // eslint-disable-next-line react/prop-types
  let { users } = props;

  // Component State
  // eslint-disable-next-line react/prop-types
  let [visible, setVisibilty] = useState(props.visible);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setVisibilty(props.visible);
    // eslint-disable-next-line react/prop-types
  }, [props.visible]);

  // eslint-disable-next-line react/prop-types
  let userMedias = users.map((user) => <Media key={user} userID={user} />);
  return (
    <div
      className="modal-background"
      style={visible ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
    >
      <div
        className="modal"
        style={visible ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
      >
        <div className="modal-header">
          <button className="modal-btn-close" onClick={props.onClose}>
            <i className="fa fa-times"></i>
          </button>
          <p className="modal-title">Likes</p>
        </div>
        <div className="modal-body">
          {userMedias.length === 0
            ? 'This user has not followed anyone!'
            : userMedias}
        </div>
      </div>
    </div>
  );
}

export default Modal;
