import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tweet, TweetBox, Layout, TweetModel, Loader } from '../components';
import { isAuthenticated } from '../helpers/api-user';
import { getNewsFeedTweets } from '../helpers/api-tweet';
import { USER_ID, flexCenter } from '../helpers/utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  // eslint-disable-next-line no-unused-vars
  let [user, setUser] = useState({});
  let [additionalData, setAdditionalData] = useState({});
  let [tweets, setTweets] = useState([]);
  let [visible, setVisible] = useState(false);
  let [orgTweetID, setOrgTweetID] = useState('');
  let [loading, setLoading] = useState(true);
  let history = useHistory();
  // refresh flag
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!USER_ID) {
      history.push('/flow/welcome');
    }
    (async function () {
      if (USER_ID) {
        let userData = JSON.parse(sessionStorage.getItem('user_data'));
        if (userData) {
          setUser(userData);
          setAdditionalData(userData.additionalData);
        } else {
          let userData = await isAuthenticated();
          sessionStorage.setItem('user_data', JSON.stringify(userData));
          setUser(userData);
          setAdditionalData(userData.additionalData);
        }

        // let tweets_from_storage = JSON.parse(
        //   sessionStorage.getItem('feed_tweets')
        // );
        // if (tweets_from_storage) {
        //   setTweets(tweets_from_storage);
        //   setLoading(false);
        // } else {
        // remove session store tweets

        let newTweets = await getNewsFeedTweets();
        setTweets(newTweets);
        setLoading(false);
        sessionStorage.setItem('feed_tweets', JSON.stringify(newTweets));
        // }
      }
    })();
  }, [refresh]);

  let tweetsJSX = tweets.map((tweet) => (
    <Tweet
      key={tweet._id}
      text={tweet.text}
      hearts={tweet.hearts}
      replies={tweet.replies.length}
      retweets={tweet.retweets.length}
      time={tweet.time}
      id={tweet._id}
      userID={tweet.userID}
      onReplyClick={() => {
        setVisible(true);
        setOrgTweetID(tweet._id);
      }}
    />
  ));

  return (
    <Layout title={'Home'}>
      <TweetBox
        profile_pic={additionalData.profilePic}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      {tweetsJSX.length === 0 ? (
        <div style={loading ? flexCenter : {}}>
          {loading ? (
            <>
              <Loader />
              <h5 style={{ fontFamily: 'Montserrat' }}>
                If it{"'"}s taking too long, please reload page
              </h5>
            </>
          ) : (
            <h2>No Tweets to Show! Make sure to follow someone</h2>
          )}
        </div>
      ) : (
        tweetsJSX
      )}
      <TweetModel
        orgTweetID={orgTweetID}
        visible={visible}
        onClose={() => {
          setRefresh(refresh + 1);
          setVisible(false);
        }}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover={false}
      />
    </Layout>
  );
}
export default Home;
