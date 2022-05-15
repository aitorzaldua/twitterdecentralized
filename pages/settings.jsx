import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import styles from "../styles/Settings.module.css";
import { Input } from "web3uikit";
import banner from "../public/images/defaultBanner.png";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export default function Settings() {
  
  const [pfps, setPfps] = useState([]);
  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(banner);

  const [theFile, setTheFile] = useState(); 
  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();

  const { Moralis, isAuthenticated, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverUrl= process.env.NEXT_PUBLIC_SERVER_URL;
  Moralis.start({ serverUrl, appId});

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs");
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address: account,
      };

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      const images = mumbaiNFTs.result.map(
        (e) => resolveLink(JSON.parse(e.metadata)?.image)
      );
      setPfps(images);
    }
    fetchNFTs();

  }, [isAuthenticated, account]);

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  //Query the username, bio ..all settings from Moralis DB
  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (bio) {
      myDetails.set("bio", bio);
    }

    if (selectedPFP){
      myDetails.set("pfp", selectedPFP);
    }

    if (userName) {
      myDetails.set("username", userName);
    }

    //For the banner, we upload it to IPFS
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    await myDetails.save();
    window.location.reload();
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
              onChange={(e) => setUserName(e.target.value)}
            ></Input>
            <Input
              label="Bio"
              name="bioChange"
              width="100%"
              labelBgColor="#141d26"
              onChange={(e) => setBio(e.target.value)}
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
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className={styles.save} onClick={() => saveEdits()}>
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
