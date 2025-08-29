import { FaCamera, FaLock, FaPen, FaRegBell, FaBell, FaSlidersH } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { FiLogOut, FiMail, FiUser } from "react-icons/fi";
import { getVolProfile } from "../../../api/volProfileApi";
import useOrgAuthStore from "../../../store/useOrgAuthStore";
import AddEvent from "../../../components/addevent/AddEvent";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UpdateProfile from "../../../components/updateProfileForOrg/UpdateProfie";
import { useLocation, useNavigate } from "react-router-dom";
import { appliedVolForOrg } from "../../../api/appliedVolListForOrgApi";

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orgProfileData = location.state?.orgProfileData;
    const logoutOrg = useOrgAuthStore((state) => state.logoutOrg);
    const role = useOrgAuthStore((state) => state.orgUser?.role);
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    const { data: volD } = useQuery({
        queryKey: ["appliedVolForOrg", token],
        queryFn: () => appliedVolForOrg(token),
        enabled: !!token && role === 1,
    });

    const volData = volD?.data || [];
    const pendingApplications = volData.filter(app => app.status === 1);
    const hasPendingApplications = pendingApplications.length > 0;

    // Handle blinking effect for new notifications
    useEffect(() => {
        if (hasPendingApplications) {
            setIsBlinking(true);
            const timer = setTimeout(() => {
                setIsBlinking(false);
            }, 5000); // Blink for 5 seconds
            return () => clearTimeout(timer);
        }
    }, [hasPendingApplications]);

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
        navigate('/reset-password', { state: { userData } });
    };

    const handleNotification = () => {
        navigate("/notification");
    };

    const handleProfileUpdate = () => {
        navigate("/update-profile", { state: { userData } })
    }

    const handleUpdateProfilePhoto = () => {
        navigate("/edit-profile", { state: { userData } })
    }

    const { data: userProfileData } = useQuery({
        queryKey: ["volProfile", token],
        queryFn: () => getVolProfile(token),
        enabled: !!token,
    });

    const userData = userProfileData?.data;
    const imgUrl = import.meta.env.VITE_MEDIA_URL;

    const getNotificationIcon = () => {
        if (hasPendingApplications) {
            return (
                <div className="relative">
                    <div className="relative">
                        <FaBell />
                        <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center ${isBlinking && 'animate-pulse'}`}>
                            {pendingApplications.length}
                        </span>
                    </div>
                </div>
            );
        }
        return <FaRegBell />;
    };

    // Create profile items based on role
    const getProfilePageItems = () => {
        const items = [];

        if (role === 2) { // User/Volunteer
            items.push(
                // { id: 1, text: 'Update Profile', icon: <FiUser />, onClick: handleProfileUpdate },
                { id: 2, text: 'Update Profile Photo', icon: <FaCamera />, onClick: handleUpdateProfilePhoto }
            );
        } else if (role === 1) { // Organization
            items.push(
                { id: 3, text: 'Update Profile', icon: <FaPen />, onClick: handleUpdateProfile },
                {
                    id: 5,
                    text: 'Notifications',
                    icon: getNotificationIcon(),
                    onClick: handleNotification,
                    badge: hasPendingApplications ? pendingApplications.length : null
                },
                { id: 6, text: 'Add Event', icon: <MdEvent />, onClick: handleAddEventClick }
            );
        }

        // Common items for both roles
        items.push(
            { id: 4, text: 'Change Password', icon: <FaLock />, onClick: handleResetPassword },
            { id: 7, text: 'Log Out', icon: <FiLogOut />, onClick: handleLogout }
        );

        return items;
    };

    const profilePageItems = getProfilePageItems();

    return (
        <div className="relative mb-10">
            {/* Blue Top Half */}
            <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-[#49A6d3] to-[#81d0ee] z-0" />
            {/* White Bottom Half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white z-0" />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-12 pb-8">
                {/* Profile Section */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-md border-4 border-white flex items-center justify-center">
                        <img
                            src={userData?.profile_photo
                                ? `${imgUrl}/volunteer/${userData.profile_photo}`
                                : "/img/man.png"
                            }
                            alt="Profile"
                            className="w-20 h-20 rounded-full"
                        />
                    </div>
                    <h1 className="mt-4 text-xl font-bold text-white tracking-wide uppercase">{userData?.full_name}</h1>
                </div>

                {/* Options Section */}
                <div className="w-[85%] max-w-sm bg-white mt-8 rounded-md overflow-hidden">
                    {profilePageItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={item.onClick}
                            className={`flex items-center justify-between p-2 cursor-pointer ${index !== profilePageItems.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm text-gray-800">{item.text}</span>
                                {/* {item.badge && (
                                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                )} */}
                            </div>
                            <FaArrowRight className="text-gray-300" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
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