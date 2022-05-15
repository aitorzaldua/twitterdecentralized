import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import banner from "../public/images/defaultBanner.png";

function Sidebar() {
  const { Moralis } = useMoralis();
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  Moralis.start({ serverUrl, appId });
  const user = Moralis.User.current();

  return (
    <div className={styles.siderContent}>
      <div className={styles.menu}>
        <div className={styles.details}>
          <Icon fill="#ffffff" size={33} svg="twitter" />
        </div>

        <Link href={"/"}>
          <div className={styles.menuItems}>
            <Icon fill="#ffffff" size={33} svg="list" />
            Home
          </div>
        </Link>
        <Link href={"/profile"}>
          <div className={styles.menuItems}>
            <Icon fill="#ffffff" size={33} svg="user" />
            Profile
          </div>
        </Link>
        <Link href={"/settings"}>
          <div className={styles.menuItems}>
            <Icon fill="#ffffff" size={33} svg="cog" />
            Settings
          </div>
        </Link>
      </div>
      <div className={styles.details}>
            <img
              src={user.attributes.pfp? user.attributes.pfp : "/images/profilePic01.png"}
              className={styles.profilePFP}
              alt="pic"
            ></img>
            <div className={styles.profileName}>{user.attributes.username.slice(0, 6) }</div>
            <div className={styles.profileWallet}>{user.attributes.ethAddress.slice(0, 5)}...
            {user.attributes.ethAddress.slice(38)}</div>
      </div>
    </div>
  );
}

export default Sidebar;
