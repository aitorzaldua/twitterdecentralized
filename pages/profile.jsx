import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import styles from "../styles/Profile.module.css";
import Image from "next/image";
import banner from "../public/images/defaultBanner.png";
import profilePic from "../public/images/profilePic01.png";
import TweetinFeed from "../components/TweetinFeed";
import { useMoralis } from "react-moralis";

export default function Profile() {
  const { Moralis } = useMoralis();
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverUrl= process.env.NEXT_PUBLIC_SERVER_URL;
  Moralis.start({ serverUrl, appId });
  const user = Moralis.User.current();

  console.log(user.attributes.banner);

  return (
    <>
      <div className="page">
        <div className="sideBar">
          <Sidebar />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.pageIdentify}>Profile</div>
          <img className={styles.profileBanner} src={user.attributes.banner ? user.attributes.banner : banner} alt="default banner"></img>
          {/* <Image
            className={styles.profileBanner}
            src={user.attributes.banner}
            height={20}
            width={100}
            layout="responsive"
            alt="default Banner"
          ></Image> */}
          <div className={styles.pfpContainer}>
            <img
              src={user.attributes.pfp? user.attributes.pfp : "/images/profilePic01.png"}
              className={styles.profilePFP}
              alt="pic"
            ></img>
            <div className={styles.profileName}>{user.attributes.username.slice(0, 6) }</div>
            <div className={styles.profileWallet}>{user.attributes.ethAddress.slice(0, 5)}...{user.attributes.ethAddress.slice(38)}</div>
            <Link href={"/"}>
              <div className={styles.profileEdit}>Edit profile</div>
            </Link>
            <div className={styles.profileBio}>{user.attributes.bio}</div>
            <div className={styles.profileTabs}>
              <div className={styles.profileTab}>Your Tweets</div>
            </div>
          </div>
          <TweetinFeed profile={true}></TweetinFeed>
        </div>

        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
