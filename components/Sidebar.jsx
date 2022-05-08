import styles from "../styles/Sidebar.module.css";
import { Icon } from "web3uikit";

function Sidebar() {
  return (
    <div className={styles.siderContent}> 
        <div className={styles.menu}>
            <div className={styles.details}>
                <Icon fill="#ffffff" size={33} svg="twitter" /> 
            </div>
            <div className={styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="list" /> 
                Home
            </div>
            

        </div>
    </div>

  )
}

export default Sidebar;
