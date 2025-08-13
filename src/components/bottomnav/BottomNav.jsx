

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faUser as faSolidfaUser,
    faHeart as faSolidHeart,
    faNoteSticky as faSolidNoteSticky,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHeart as faRegularHeart,
    faNoteSticky as faRegularNoteSticky,
    faUser as faRegularfaUser
} from '@fortawesome/free-regular-svg-icons';
import useOrgAuthStore from '../../store/useOrgAuthStore';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = useOrgAuthStore((state) => state.orgUser?.role);

    const navItems = [
        {
            type: 'icon',
            icon: faSearch,
            label: 'Explore',
            path: '/'
        },
        {
            type: 'image',
            imgSrc: '/img/handheart1.png',
            activeImgSrc: '/img/hearthand2.png',
            label: 'Org',
            path: '/organization'
        },
        {
            type: 'icon',
            icon: faRegularHeart,
            blueIcon: faSolidHeart,
            label: 'Wishlist',
            path: '/wishlist'
        },
        {
            type: 'icon',
            icon: faRegularNoteSticky,
            blueIcon: faSolidNoteSticky,
            label: 'Application',
            path: '/application'
        },
        {
            type: 'icon',
            icon: faRegularfaUser,
            blueIcon: faSolidfaUser,
            label: 'Profile',
            path: role === 2 ? '/profile-page' : '/profile'
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
            <div className="flex justify-around items-center">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center p-2 w-full ${isActive ? 'text-[#06acff]' : 'text-black'}`}
                        >
                            {item.type === 'image' ? (
                                <img
                                    src={isActive ? item.activeImgSrc : item.imgSrc}
                                    alt={item.label}
                                    className="w-6 h-6 object-contain"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={isActive && item.blueIcon ? item.blueIcon : item.icon}
                                    className="text-xl"
                                />
                            )}
                            <span className="text-xs mt-1">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
