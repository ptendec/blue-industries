import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import CogIcon from "/public/icons/cog.svg";
import HomeIcon from "/public/icons/home.svg";
import LineChartIcon from "/public/icons/line-chart.svg";
import Logo from "/public/images/Logo.png";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Image src={Logo} alt="Blue Industries Logo" />
      </div>
      <nav className={styles.sidebarNav}>
        <Link href="/" className={styles.sidebarLink}>
          <Image src={HomeIcon} alt="Home icon" width={24} height={24} />
          <span className={styles.sidebarText}>Home</span>
        </Link>
        <Link href="/" className={`${styles.sidebarLink} ${styles.active}`}>
          <Image
            src={LineChartIcon}
            alt="Team effectiveness icon"
            width={24}
            height={24}
          />
          <span className={styles.sidebarText}>Team effectiveness</span>
        </Link>
        <Link href="/" className={styles.sidebarLink}>
          <Image src={CogIcon} alt="Settings icon" width={24} height={24} />
          <span className={styles.sidebarText}>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
