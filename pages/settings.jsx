import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import styles from "../styles/Settings.module.css";
import { Input } from "web3uikit";
import pfp1 from "../public/images/pfp1.png";
import pfp2 from "../public/images/pfp2.png";
import pfp3 from "../public/images/pfp3.png";
import pfp4 from "../public/images/pfp4.png";
import pfp5 from "../public/images/pfp5.png";
import banner from "../public/images/defaultBanner.png";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Settings() {
  const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(banner);

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <div className="page">
        <div className="sideBar">
          <Sidebar />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.pageIdentify}>Settings</div>
          <div className={styles.settingsPage}>
            <Input
              label="Name"
              name="NameChange"
              width="100%"
              labelBgColor="#141d26"
            ></Input>
            <Input
              label="Bio"
              name="bioChange"
              width="100%"
              labelBgColor="#141d26"
            ></Input>

            <div className={styles.pfp}>
              Profile Image (Your NFTs)
              <div className={styles.pfpOptions}>
                {pfps.map((e, i) => {
                  return (
                    <>
                      <Image
                        src={e}
                        className={
                          selectedPFP === e
                            ? styles.pfpOptionSelected
                            : styles.pfpOption
                        }
                        width={110}
                        height={110}
                        layout="fixed"
                        alt=""
                        onClick={() => {
                          setSelectedPFP(pfps[i]);
                          console.log(
                            "id: ",
                            i,
                            "selectedPFP: ",
                            selectedPFP,
                            "pfps[i]: ",
                            pfps[i]
                          );
                        }}
                      ></Image>
                    </>
                  );
                })}
              </div>
            </div>
            <div className={styles.pfp}>
              Profile Banner
              <div className={styles.pfpOptions}>
                <Image
                  src={selectedFile}
                  onClick={onBannerClick}
                  className={styles.banner}
                  height={200}
                  width={700}
                  layout="fixed"
                  alt=""
                ></Image>
                <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }} />
              </div>
            </div>
            <div className={styles.save}>
              Save 
            </div>
          </div>
        </div>

        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
