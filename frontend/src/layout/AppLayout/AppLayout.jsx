import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdOutlineAssignment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoIosAlbums } from "react-icons/io";
import "./AppLayout.scss";

export default function AppLayout(){
    const items = [
        {to:"/app",label:"Dashboard",icon:<RxDashboard/>},
        {to:"/app/assignments",label:"Assignments",icon:<MdOutlineAssignment />},
        {to:"/app/attempts",label:"Attempts",icon:<IoIosAlbums />},
        {to:"/app/profile",label:"Profile",icon:<CgProfile />},
    ]

    return(
        <div className="shell">
            <Sidebar title="CipherSQLStudio" items={items}/>
            <main className="shell_main">
                <Outlet/>
            </main>
        </div>
    )
}