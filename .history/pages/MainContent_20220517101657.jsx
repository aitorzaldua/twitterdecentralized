import styles from "../styles/MainContent.module.css";
import Image from "next/image";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import TweetinFeed from "../components/TweetinFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export default function MainContent() {
  const { Moralis } = useMoralis();
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  Moralis.start({ serverUrl, appId });
  const user = Moralis.User.current();

  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  //Store tweets into Matic Blockchain DB
  async function maticTweet() {

    if (!tweet) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: process.env.NEXT_CONTRACT,
      functionName: "addTweet",
      abi: process.env.NEXT_ABI,
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    //Storing also into Moralis DB
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error) => {
        console.log("error");
      }
    });

  }



  //Store tweets into Moralis DB
  async function saveTweet() {
    if (!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");
    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    //If the user want to attach an img to the tweet
    //We save it in ipfs and into the tweet info.
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    } 

    await newTweet.save();
    window.location.reload();

  } 

  const onImageClick = () => {
    inputFile.current.click(); 
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <div className={styles.MainContent}>
      <div className={styles.pageIdentify}>Home</div>
      <div className={styles.profileTweet}>
        <img
          src={
            user.attributes.pfp
              ? user.attributes.pfp
              : "/images/profilePic01.png"
          }
          className={styles.profilePic}
          alt="pic"
        ></img>
        {/* <Image
          src="/images/profilePic01.png"
          className={styles.profilePic}
          width={50}
          height={50}
          layout="fixed"
          alt="profile" 
        ></Image> */}
        <div className={styles.tweetBox}>
          <TextArea
            label=""
            name="tweetTxtArea"
            value="GM World 2"
            type="text"
            onChange={(e) => setTweet(e.target.value)}
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
              <div className={styles.tweet} onClick={saveTweet}>Tweet</div>
              <div className={styles.tweet} onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>
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
