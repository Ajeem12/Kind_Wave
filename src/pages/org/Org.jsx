import React, { useState } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import s1 from "../../../public/img/s1.png";
import s2 from "../../../public/img/s2.png";
import s3 from "../../../public/img/s3.png";
import s4 from "../../../public/img/s4.png";
import s5 from "../../../public/img/s5.png";
import s6 from "../../../public/img/s6.png";
import s7 from "../../../public/img/s7.png";
import s8 from "../../../public/img/s8.png";
import s9 from "../../../public/img/s9.png";
import s10 from "../../../public/img/s10.png";
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Org = () => {
    const location = useLocation()
    const organizations = [
        { name: "B'MORE", logo: s8, type: "NGO" },
        { name: "SMILE", logo: s1, type: "Fundraiser" },
        { name: "WE THRIVE", logo: s2, type: "CBO" },
        { name: "IMPACT BRIDGE", logo: s3, type: "CSR" },
        { name: "ONEWORLD AID", logo: s4, type: "International Aid" },
        { name: "CARE CORE", logo: s5, type: "Nonprofits" },
        { name: "ROOTS & REACH", logo: s6, type: "Charity" },
        { name: "SOLIDARITY", logo: s7, type: "Fundraiser" },
        { name: "GIVING GROVE", logo: s9, type: "Mutual Aid" },
        { name: "RELIFELINK", logo: s10, type: "Government Welfare" },
    ];

    const [likedStates, setLikedStates] = useState(Array(organizations.length).fill(false));


    const handleLike = (e, idx) => {
        e.preventDefault();
        e.stopPropagation();
        setLikedStates(prev => {
            const updated = [...prev];
            updated[idx] = !updated[idx];
            return updated;
        });
    };

    return (
        <>
            {location.pathname === "/wishlist" ? null : <SearchBar />}

            <div className="p-6 max-w-6xl mx-auto mb-20 mt-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {organizations.map((org, index) => (
                        <Link to="/profile" key={index}>
                            <div
                                className={`relative p-4 rounded-lg flex flex-col items-center justify-center 
                  hover:bg-gray-50 transition-colors duration-200 h-[150px] w-[155px]  mx-auto
                  ${index % 2 === 0
                                        ? "shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
                                        : "shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]"}`}
                            >
                                <div className="h-40 w-44 md:h-40 mb-2 flex items-center justify-center">
                                    <img
                                        src={org.logo}
                                        alt={`${org.name} logo`}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <button
                                    onClick={e => handleLike(e, index)}
                                    className="absolute top-2 right-2"
                                >
                                    <Heart
                                        size={22}
                                        fill={likedStates[index] ? "white" : "black"}
                                        fillOpacity={likedStates[index] ? 1 : 0.2}
                                        className={likedStates[index] ? "text-gray-50" : "text-[#c4c4c4]"}
                                    />
                                </button>
                            </div>

                            <h3 className="text-sm font-medium text-black text-start ml-4 mt-1">
                                {org.name}
                            </h3>
                            <p className='text-xs text-gray-400 ml-4'>{org.type}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Org;
