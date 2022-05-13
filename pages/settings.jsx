import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";

export default function Settings () {
  return (
    <div>
        <div className="page">
      <div className="sideBar">
        <Sidebar />
      </div>

      <Link href={"/profile"}>
        <a className='anchor'>Profile</a>
      </Link>
      <Link href={"/"}>
        <a className='anchor'>Home</a>
      </Link>

      <div className="rightBar">
        <Rightbar />
      </div>

    </div>
    </div>
  )
}


