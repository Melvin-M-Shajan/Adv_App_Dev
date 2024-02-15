import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Sidebar.css";
const Dashboard = () => {
    const navigate = useNavigate();
    const SideBar1 = () => {
        return (
            <div className="bac">
            <div className="dashboardSideBar">
                <div className="dashboardSidebarInnerContainer">
                    <Link to="/aboutus">
                        <button className="dashboardSidebarBtn">Home</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/appoint">
                        <button className="dashboardSidebarBtn">Appointment</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/service">
                        <button className="dashboardSidebarBtn">View Services</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/profile">
                        <button className="dashboardSidebarBtn">Profile</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/">
                        <button className="dashboardSidebarBtn">Logout</button>
                    </Link>
                    &nbsp;&nbsp;
                </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboardMainContainer">
            <SideBar1 />
        </div>
    );
}

export default Dashboard;