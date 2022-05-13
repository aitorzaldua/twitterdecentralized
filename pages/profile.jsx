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

      <div className={styles.pageIdentify}>Profile</div>
      <img src="/images/defaultBanner.png" className={styles.profileBanner}></img>
      <img
          src="/images/profilePic01.png"
          className={styles.profilePFP}
          alt="pic"
        ></img>
   



      <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
