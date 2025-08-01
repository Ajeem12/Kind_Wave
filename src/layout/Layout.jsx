import { Outlet } from "react-router-dom";
import BottomNav from "../components/bottomnav/BottomNav";
import NavBar from "../components/navbar/NavBar";
import PageLoader from "../utils/PageLoader";


const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <PageLoader />
            <main className="container  flex-grow  mb-4 max-w-screen-2xl">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
