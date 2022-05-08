import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";


export default function Home() {
  return (
    <div className="page">
      <div className="sideBar">
        <Sidebar />
      </div>

      <Link href={"/profile"}>
        <a className='anchor'>Profile</a>
      </Link>
      <Link href={"/settings"}>
        <a className='anchor'>Settings</a>
      </Link>

      <div className="rightBar">
        <Rightbar />
      </div>

    </div>
  )
}
