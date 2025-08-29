import React, { useState } from "react";
import RegisterModal from "../register/RegisterModal";
import Login from "../login/Login";


const Landing = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [role, setRole] = useState("");

    const openModal = (userType) => {
        setRole(userType);
        setShowRegister(true);
    };

    return (
        <div className="relative h-screen w-full">
            <img
                src="/img/landing.png"
                alt="Group Hug"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 img-overlay" />

            <div className="relative z-10 flex flex-col items-center justify-end h-full pb-10 px-5 text-start text-white">
                <h1 className="w-full text-xl font-extralight mb-2 text-left">
                    Make a Difference <br /> Anytime, Anywhere.
                </h1>
                <p className=" w-full text-sm text-gray-200 mb-6 text-left ">
                    Explore causes, lend a hand to spark change with every action!
                </p>
                <div className="flex flex-col gap-4 w-full  ">
                    <button onClick={() => openModal("volunteer")} className="border border-white py-2 rounded-[10px] hover:bg-white hover:text-black transition">
                        Volunteer
                    </button>
                    <button onClick={() => openModal("organization")} className="border border-white py-2 rounded-[10px] hover:bg-white hover:text-black transition">
                        Organisation
                    </button>
                </div>
            </div>

            {showRegister && (
                <RegisterModal
                    onClose={() => setShowRegister(false)}
                    onSwitchToLogin={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                    }}
                    role={role}
                />
            )}
            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onSwitchToRegister={() => {
                        setShowLogin(false);
                        setShowRegister(true);
                    }}
                    role={role}
                />
            )}
        </div>
    );
};

export default Landing;


