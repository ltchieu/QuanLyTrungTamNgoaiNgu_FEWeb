import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../componets/header";

const MainLayout: React.FC = () => {
    return(
        <div className="app-layout">
            <Header/>
            <main className="content">
                <Outlet/>
            </main>
        </div>
    );
}
export default MainLayout