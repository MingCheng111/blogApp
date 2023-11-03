/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { postReply } from '../../helpers/api-tweet';
import { Loader } from '../../components';
import notify from '../Notify';
import './style.scss';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TweetModel(props) {
  // Component State
  // eslint-disable-next-line react/prop-types
  let [visible, setVisibilty] = useState(props.visible);
  let [text, setText] = useState('');
  let [loading, setLoading] = useState(false);

  // props variables
  // eslint-disable-next-line react/prop-types
  let { orgTweetID } = props;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    setText(editorState.getCurrentContent().getPlainText('\u0001'));
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setVisibilty(props.visible);
    // eslint-disable-next-line react/prop-types
  }, [props.visible]);

  return (
    <div
      className="modal-background"
      style={visible ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
    >
      <div
        className="modal-tweet"
        style={visible ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
      >
        <div className="modal-tweet-header">
          <button className="modal-tweet-btn-close" onClick={props.onClose}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="modal-tweet-body">
          <div>
            <div
              className="profile-pic"
              // eslint-disable-next-line react/prop-types
              style={{ backgroundImage: `url("${props.image}")` }}
            ></div>
          </div>
          <div className="modal-tweet-input-container">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            <div className="modal-footer">
              <div className="options">
                <div className="group-icons">
                  <button className="btn-icon">
                    <i className="far fa-smile"></i>
                  </button>
                </div>
                <button
                  className="tweet-btn"
                  onClick={() => {
                    setLoading(true);
                    postReply(text, orgTweetID).then(() => {
                      setLoading(false);
                      setText('');
                      props.onClose();
                      notify('Reply posted successfully..!  ');
                    });
                  }}
                >
                  {loading ? <Loader inverted={true} /> : 'Reply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetModel;
