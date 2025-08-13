import React, { useEffect, useState } from 'react';
import EventCard from '../../components/event_card/EventCard';
import { getWhishCart } from "../../api/addToWhishCartApi"
import useOrgAuthStore from '../../store/useOrgAuthStore';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';

const WishList = () => {
    const [activeTab, setActiveTab] = useState('Events');
    const [likedStates, setLikedStates] = useState({});
    const token = useOrgAuthStore((state) => state.orgUser?.token);

    const useGetWhishCart = (token) => {
        return useQuery({
            queryKey: ["whishCart", token],
            queryFn: () => getWhishCart(token),
            enabled: !!token,
        });
    }
    const { data: whishCartData, isLoading: whishCartLoading, error: whishCartError } = useGetWhishCart(token);
    const whishCartList = whishCartData?.data?.org || [];
    const imgurl = import.meta.env.VITE_MEDIA_URL;
    const eventWhishCart = whishCartData?.data.event



    useEffect(() => {
        const updatedStates = {};
        whishCartList?.forEach(item => {
            updatedStates[item.organization_id] = true;
        });
        setLikedStates(updatedStates);
    }, [whishCartList]);


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
                    <div className="events-tab p-6">
                        {eventWhishCart?.map((event, index) => (
                            <div key={event.id || index}>
                                <EventCard
                                    id={event.event_id}
                                    image={event?.event_details?.image}
                                    title={event?.event_details?.title}
                                    organizer={event?.event_details?.organization_details?.organization_name}
                                    dateRange={`${event?.event_details?.from_date} - ${event?.event_details?.to_date}`}
                                    description={event?.event_details?.long_desc}
                                />
                            </div>
                        ))}
                    </div>
                ) : (

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
                        {whishCartList.map((org, index) => (
                            <div key={index}>
                                <div
                                    className={`relative p-4 rounded-lg flex flex-col items-center justify-center 
                  hover:bg-gray-50 transition-colors duration-200 h-[150px] w-[100%]
                  ${index % 2 === 0
                                            ? "shadow-[2px_2px_4px_rgba(0,0,0,0.1)] "
                                            : "shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]"}`}
                                >
                                    <div className="h-40 w-44 md:h-40 mb-2 flex items-center justify-center">
                                        <img
                                            src={`${imgurl}/organization/${org?.organization_details?.photo}`}
                                            alt={`${org?.organization_details?.organization_name} logo`}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <button
                                        onClick={e => handleLike(e, org)}
                                        className="absolute top-2 right-2"
                                    >
                                        <Heart
                                            size={22}
                                            fill={likedStates[org.id] ? "white" : "black"}
                                            fillOpacity={likedStates[org.id] ? 1 : 0.2}
                                            className={likedStates[org.id] ? "text-gray-50" : "text-[#c4c4c4]"}
                                        />
                                    </button>
                                </div>

                                <h3 className="text-sm font-medium text-black text-start ml-4 mt-1">
                                    {org?.organization_details?.organization_name}
                                </h3>
                                <p className='text-xs text-gray-400 ml-4'>{org?.organization_details?.category_name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;