import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { Icon } from "web3uikit";

function Sidebar() {
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
    </div>
  );
}

export default Sidebar;
