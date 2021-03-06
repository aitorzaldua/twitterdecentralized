import styles from "../styles/Rightbar.module.css";
import spaceshooter from "../public/images/spaceshooter.jpeg";
import netflix from "../public/images/netflix.jpeg";
import academy from "../public/images/academy.png";
import js from "../public/images/js.png";
import youtube from "../public/images/youtube.png";
import { Input } from "web3uikit";
import Image from "next/image";

function Rightbar() {
  const trends = [
    {
      img: spaceshooter,
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
    },
    {
      img: netflix,
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
    },
    {
      img: academy,
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: js,
      text: "Become a Web3 Developer with just simple JS...",
      link: "https://academy.moralis.io/all-courses",
    },
    {
      img: youtube,
      text: "Best youtube channel to learn about Web3...",
      link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
    },
  ];

  return (
    <div className={styles.rightbarContent}>
      <Input
        label="Search Twitter"
        name="Search Twitter"
        prefixIcon="search"
        labelBgColor="#141d26"
      ></Input>
      <div className={styles.trends}>
        News For You
        {trends.map((e) => {
          return (
            <>
              <div className={styles.trend} onClick={() => window.open(e.link)}>
                <Image
                  src={e.img}
                  className={styles.trendImg}
                  alt="e.img"
                  width={130}
          height={90}
                ></Image>
                <div className={styles.trendText}>{e.text}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Rightbar;
