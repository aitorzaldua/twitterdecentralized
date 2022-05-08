import Link from "next/link";
import Sidebar from "../components/Sidebar";


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
        rightBar
      </div>

    </div>
  )
}
