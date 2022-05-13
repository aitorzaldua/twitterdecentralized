import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import MainContent from "./MainContent";

export default function Home() {
  return (
    <>
      <div className="page">
        <div className="sideBar">
          <Sidebar />
        </div>

        <div className="mainWindow">
          <MainContent />
        </div>

        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
