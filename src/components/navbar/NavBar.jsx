import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, LogOut, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import useOrgAuthStore from "../../store/useOrgAuthStore";

const NavBar = () => {
    const location = useLocation();
    const logoutOrg = useOrgAuthStore((state) => state.logoutOrg);

    const formatPath = (path) => {
        if (path === "/") return "Home";
        return path.slice(1).charAt(0).toUpperCase() + path.slice(2);
    };

    const routes = ["/", "/organization", "/application"];



    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
                <Link to="/">               {/* Logo */}
                    <motion.h1
                        className="text-xl font-bold text-sky-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        KindWave
                    </motion.h1>
                </Link>

                {/* Menu for large screens */}
                <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    {routes.map((path) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={`hover:text-sky-500 relative ${isActive ? "text-sky-600 font-semibold" : ""
                                    }`}
                            >
                                {formatPath(path)}
                                {isActive && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 h-0.5 bg-sky-500 w-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Search & Logout icons (always visible) */}
                <div className="flex items-center gap-4 text-gray-700">


                    {/* Profile icon - large screens only */}
                    <Link to="/profile" className="hidden md:flex items-center gap-1 hover:text-sky-500">
                        <User size={18} />
                        <span className="text-sm hidden sm:inline">Profile</span>
                    </Link>

                    {/* Wishlist icon - large screens only */}
                    <Link to="/wishlist" className="hidden md:flex items-center gap-1 hover:text-pink-500">
                        <Heart size={18} />
                        <span className="text-sm hidden sm:inline">Wishlist</span>
                    </Link>
                    <motion.button
                        className="hover:text-red-500 flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => logoutOrg()}
                    >
                        <LogOut size={18} />
                        <span className="text-sm ">Logout</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
