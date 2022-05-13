import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import styles from "../styles/Profile.module.css";
import Image from "next/image";
import banner from "../public/images/defaultBanner.png";
import profilePic from "../public/images/profilePic01.png";
import TweetinFeed from "../components/TweetinFeed";

export default function Profile() {
  return (
    <>
    <div className="page">
        <div className="sideBar">
          <Sidebar />
        </div>

      <div className={styles.pageIdentify}>Profile 2</div>

      <Image
        className={styles.profileBanner}
        src={banner}
        height={20}
        width={100}
        layout="responsive"
        alt="default Banner"
      ></Image>
      <div className={styles.pfpContainer}>
        {/*  <Image
        src={profilePic}
        className={styles.profilePFP}
        width={130}
        height={130}
        layout="fixed"
        alt="profile">
        </Image> */}
        {/* NOTE: Using <img>  because the overflow=hidden in the <Image-span>**/}
        <img
          src="/images/profilePic01.png"
          className={styles.profilePFP}
          alt="pic"
        ></img>
        <div className={styles.profileName}>My Name</div>
        <div className={styles.profileWallet}>0x456..d78</div>
        <div className={styles.profileEditContainer}>
          <Link href={"/"}>
            <div className={styles.profileEdit}>Edit profile</div>
          </Link>
        </div>
        <div className={styles.profileBio}>Your Average Web3 Mage</div>
        <div className={styles.profileTabs}>
          <div className={styles.profileTab}>Your Tweets</div>
        </div>
      </div>
      <TweetinFeed profile={true}></TweetinFeed>
      <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}