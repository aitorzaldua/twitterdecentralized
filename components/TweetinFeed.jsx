import styles from "../styles/TweetinFeed.module.css";
import golf from "../public/images/golf.png";
import canoe from "../public/images/canoe.png";
import profilePic  from "../public/images/profilePic01.png";
import { Icon } from "web3uikit";
import Image from "next/image";

function TweetinFeed() {
  return (
    <>
      <div className={styles.feedTweet}>
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
      <div className={styles.feedTweet}>TweetinFeed</div>
    </>
  );
}

export default TweetinFeed;
