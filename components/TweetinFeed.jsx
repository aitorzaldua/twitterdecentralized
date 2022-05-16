import styles from "../styles/TweetinFeed.module.css";
import golf from "../public/images/golf.png";
import profilePic from "../public/images/profilePic01.png";
import { Icon } from "web3uikit";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

function TweetinFeed(profile) {
  const { Moralis, account } = useMoralis();
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  Moralis.start({ serverUrl, appId });

  const [tweetArr, setTweetArr] = useState();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);

  return (
    <>
    {tweetArr?.map((e) => {
        return (
          <>
            <div className="feedTweet">
              <img src={e.attributes.tweeterPfp ? e.attributes.tweeterPfp : defaultImgs[0]} className="profilePic"></img>
              <div className="completeTweet">
                <div className="who">
                {e.attributes.tweeterUserName.slice(0, 6)}
                  <div className="accWhen">{
                        `${e.attributes.tweeterAcc.slice(0, 4)}...${e.attributes.tweeterAcc.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                        ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                        `  
                      }
                      </div>
                </div>
                <div className="tweetContent">
                {e.attributes.tweetTxt}
                {e.attributes.tweetImg && (
                        <img
                          src={e.attributes.tweetImg}
                          className="tweetImg"
                        ></img>
                      )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="star" />
                    12
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }).reverse()}

      {/* <div className={styles.feedTweet}>
        <Image
          src={profilePic}
          className={styles.profilePic}
          width={50}
          height={50}
          layout="fixed"
          alt="profile"
        ></Image>
        <div className={styles.completeTweet}>
          <div className={styles.who}>
            userName
            <div className={styles.accWhen}>0x42..314 - 1h</div>
          </div>
          <div className={styles.tweetContent}>
            Nice Day golfing today Shot 73
            <Image
            src={golf}
            className={styles.tweetImg}
            width={350}
            height={300}
            layout="intrinsic"
            alt="tweet"
            ></Image>
          </div>
          <div className={styles.interactions}>
            <div className={styles.interactionsNums}>
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className={styles.interactionsNums}>
              <Icon fill="#3f3f3f" size={20} svg="star" />
            </div>
            <div className={styles.interactionsNums}>
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.feedTweet}>TweetinFeed</div> */}
    </>
  );
}

export default TweetinFeed;
