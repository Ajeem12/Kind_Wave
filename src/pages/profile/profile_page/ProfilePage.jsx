import { FaArrowRight, FaCamera, FaLock, FaPen, FaRegBell, FaSlidersH } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FiLogOut, FiMail, } from "react-icons/fi";
import { getVolProfile } from "../../../api/volProfileApi";
import useOrgAuthStore from "../../../store/useOrgAuthStore"
import AddEvent from "../../../components/addevent/AddEvent";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UpdateProfile from "../../../components/updateProfileForOrg/UpdateProfie";
import { useLocation, useNavigate } from "react-router-dom";


const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const orgProfileData = location.state?.orgProfileData;
    const logoutOrg = useOrgAuthStore((state) => state.logoutOrg);
    const role = useOrgAuthStore((state) => state.orgUser?.role);
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    const handleAddEventClick = () => {
        setShowAddEventModal(true);
    };

    const handleUpdateProfile = () => {
        setShowEditProfileModal(true);
    };

    const handleLogout = () => {
        logoutOrg();
    };

    const handleResetPassword = () => {
        navigate('/reset-password');
    }

    const useUserProfile = (token) => {
        return useQuery({
            queryKey: ["volProfile", token],
            queryFn: () => getVolProfile(token),
            enabled: !!token,
        });
    }

    const { data: userProfileData, isLoading: userProfileLoading, error: userProfileError } = useUserProfile(token);
    const userData = userProfileData?.data


    const profilePageItems = [
        { id: 1, text: 'Edit ProfilePage Photo', icon: <FaCamera />, completed: false },
        { id: 2, text: 'Edit ProfilePage Name', icon: <FaPen />, completed: true },
        { id: 3, text: 'Change Email Address', icon: <FiMail />, completed: false },
        { id: 4, text: 'Change Password', icon: <FaLock />, completed: false, onClick: handleResetPassword },
        { id: 5, text: 'Notifications', icon: <FaRegBell />, completed: false },
        { id: 6, text: 'Preferences', icon: <FaSlidersH />, completed: false },
        { id: 7, text: 'Log Out', icon: <FiLogOut />, completed: false, onClick: handleLogout },
        ...(role === 1 ? [{ id: 8, text: 'Add Event', icon: <MdEvent />, completed: false, onClick: handleAddEventClick }] : []),
        ...(role === 1 ? [{ id: 9, text: 'Update Profile', icon: <FaPen />, completed: false, onClick: handleUpdateProfile }] : []),
    ];

    return (
        <div className="relative mb-10">
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
                    <h1 className="mt-4 text-xl font-bold text-white tracking-wide">{userData?.full_name}</h1>
                </div>

                {/* Options Section */}
                <div className="w-[85%] max-w-sm bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
                    {profilePageItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={item.onClick}
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
            {showAddEventModal && (
                <AddEvent onFormClose={() => setShowAddEventModal(false)} />
            )}

            {showEditProfileModal && (
                <UpdateProfile data={orgProfileData} onFormClose={() => setShowEditProfileModal(false)} />
            )}
        </div>
    );
};

export default ProfilePage;