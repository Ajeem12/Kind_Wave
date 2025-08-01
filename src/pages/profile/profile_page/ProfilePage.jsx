import { FaArrowRight, FaCamera, FaLock, FaPen, FaRegBell, FaSlidersH } from "react-icons/fa";
import { FiLogOut, FiMail, } from "react-icons/fi";


const ProfilePage = () => {
    const profilePageItems = [
        { id: 1, text: 'Edit ProfilePage Photo', icon: <FaCamera />, completed: false },
        { id: 2, text: 'Edit ProfilePage Name', icon: <FaPen />, completed: true },
        { id: 3, text: 'Change Email Address', icon: <FiMail />, completed: false },
        { id: 4, text: 'Change Password', icon: <FaLock />, completed: false },
        { id: 5, text: 'Notifications', icon: <FaRegBell />, completed: false },
        { id: 6, text: 'Preferences', icon: <FaSlidersH />, completed: false },
        { id: 7, text: 'Log Out', icon: <FiLogOut />, completed: false }
    ];

    return (
        <div className="relative">
            {/* Blue Top Half */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#49A6d3] to-[#81d0ee]  z-0"></div>

            {/* White Bottom Half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-12 pb-8">
                {/* ProfilePage Section */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-md border-4 border-white flex items-center justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4128/4128176.png"
                            alt="ProfilePage"
                            className="w-20 h-20 rounded-full"
                        />
                    </div>
                    <h1 className="mt-4 text-xl font-bold text-white tracking-wide">RHYTHM SINGHAL</h1>
                </div>

                {/* Options Section */}
                <div className="w-[85%] max-w-sm bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
                    {profilePageItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm text-gray-800">{item.text}</span>
                            </div>
                            <FaArrowRight className="text-gray-400" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;