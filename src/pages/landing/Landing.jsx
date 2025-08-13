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
                src="https://imgs.search.brave.com/BBi3liU6fdDvDS_y4BjHGhi8IN9KIEFBJD-x0NjcSWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kaXZlcnNlLWdy/b3VwLXBlb3BsZS10/b2dldGhlci1zdHVk/aW8tcG9ydHJhaXRf/NTM4NzYtODM5MjYu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA"
                alt="Group Hug"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 modal-overlay" />

            <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-4 text-start text-white">
                <h1 className="text-2xl font-semibold mb-2">Make a Difference Anytime, Anywhere.</h1>
                <p className="text-sm text-gray-200 mb-6">
                    Explore causes, lend a hand to spark change with every action!
                </p>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <button onClick={() => openModal("volunteer")} className="border border-white py-2 rounded-md hover:bg-white hover:text-black transition">
                        Volunteer
                    </button>
                    <button onClick={() => openModal("organization")} className="border border-white py-2 rounded-md hover:bg-white hover:text-black transition">
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
