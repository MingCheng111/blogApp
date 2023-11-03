import React, { useState } from 'react';
import './style.scss';
import Loader from '../Loader';
import { postTweet } from '../../helpers/api-tweet';
import notify from '../Notify';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TweetBox = (props) => {
  // props variables
  // eslint-disable-next-line react/prop-types
  let { profile_pic, refresh, setRefresh } = props;

  // Component State
  let [tweetText, setTweetText] = useState('');
  let [loading, setLoading] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    setTweetText(editorState.getCurrentContent().getPlainText('\u0001'));
  };

  return (
    <div className="tweet-box">
      <div className="col-1">
        <div
          className="avatar"
          style={{
            backgroundImage: `url('${profile_pic}')`,
          }}
        ></div>
      </div>
      <div className="col-2">
        {/* <div className="form"> */}
        <form>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </form>
        {/* </div> */}
        <div className="options">
          <div className="group-icons">
            <button className="btn-icon">
              <i className="far fa-smile"></i>
            </button>
          </div>
          <button
            className="tweet-btn"
            disabled={tweetText.trim() === ''}
            onClick={() => {
              setLoading(true);
              postTweet(
                tweetText,
                JSON.parse(localStorage.getItem('JWT_TOKEN'))
              ).then((res) => {
                if (res.status === 200) {
                  setLoading(false);
                  setTweetText('');
                  setEditorState(EditorState.createEmpty());
                  setRefresh(refresh + 1);
                  notify('Tweet posted successfully..!');
                } else {
                  setLoading(false);
                  notify('An error occurred..!');
                }
              });
            }}
          >
            {loading ? <Loader inverted={true} /> : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
