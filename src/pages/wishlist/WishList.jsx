import React, { useState } from 'react';
import EventCard from '../../components/event_card/EventCard';
import s1 from "../../../public/img/s1.png"
import s2 from "../../../public/img/s2.png"
import s3 from "../../../public/img/s3.png"
import s8 from "../../../public/img/s8.png"
import EventList from '../../components/event_card/EventList';
import { Link } from 'react-router-dom';
import Org from '../org/Org';

const WishList = () => {
    const [activeTab, setActiveTab] = useState('Events');
    const [organizations] = useState([
        { name: "B'MORE", logo: s8, type: "NGO" },
        { name: "SMILE", logo: s1, type: "Fundraiser" },
        { name: "WE THRIVE", logo: s2, type: "CBO" },
        { name: "IMPACT BRIDGE", logo: s3, type: "CSR" },
    ]);

    return (
        <div className="wishlist-container max-w-6xl mx-auto py-4">
            {/* Tabs */}
            <div className=" bg-white border-b border-gray-200">
                <div className="flex flex-col items-center justify-center px-4">
                    <h1 className="text-lg font-bold text-gray-800  text-center">WISHLIST</h1>
                    <div className="flex justify-center items-center gap-26">
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'Events' ? 'text-black font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('Events')}
                        >
                            Events
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'Organisations' ? 'text-black font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('Organisations')}
                        >
                            Organisations
                        </button>
                    </div>
                </div>
            </div>


            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'Events' ? (
                    <div className="events-tab">
                        <EventList />
                    </div>
                ) : (
                    <Org />
                )}
            </div>
        </div>
    );
};

export default WishList;