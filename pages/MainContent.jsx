import styles from "../styles/MainContent.module.css";
import Image from "next/image";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import TweetinFeed from "../components/TweetinFeed";

export default function MainContent() {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <div className={styles.MainContent}>
      <div className={styles.pageIdentify}>Home</div>
      <div className={styles.profileTweet}>
        <Image
          src="/images/profilePic01.png"
          className={styles.profilePic}
          width={50}
          height={50}
          layout="fixed"
          alt="profile"
        ></Image>
        <div className={styles.tweetBox}>
          <TextArea
            label=""
            name="tweetTxtArea"
            value="GM World 2"
            type="text"
            width="90%"
          ></TextArea>
          {selectedFile && (
            <Image
              src={selectedFile}
              className={styles.tweetImg}
              width={400}
              height={150}
              alt="tweetImage"
            ></Image>
          )}
          <div className={styles.imgOrTweet}>
            <div className={styles.imgDiv} onClick={onImageClick}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
              />
              <Icon fill="#1da1f2" size={20} svg="image"></Icon>
            </div>
            <div className={styles.tweetOptions}>
              <div className={styles.tweet}>Tweet</div>
              <div
                className={styles.tweet}
                style={{ backgroundColor: "#8247e5" }}
              >
                <Icon fill="#ffffff" size={20} svg="matic"></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TweetinFeed profile={false} />
    </div>
  );
}
