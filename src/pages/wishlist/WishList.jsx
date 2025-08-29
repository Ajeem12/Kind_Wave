import React, { useEffect, useState } from 'react';
import EventCard from '../../components/event_card/EventCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { getWhishCart } from "../../api/addToWhishCartApi"
import { removeFromWhishCart } from "../../api/removeFromWishCartApi"
import useOrgAuthStore from '../../store/useOrgAuthStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


const WishList = () => {
    const [activeTab, setActiveTab] = useState('Events');
    const [likedStates, setLikedStates] = useState({});
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const queryClient = useQueryClient();

    const useGetWhishCart = (token) => {
        return useQuery({
            queryKey: ["whishCart", token],
            queryFn: () => getWhishCart(token),
            enabled: !!token,
        });
    }
    const { data: whishCartData, isLoading: whishCartLoading, error: whishCartError } = useGetWhishCart(token);
    const whishCartList = whishCartData?.data?.org;
    const imgurl = import.meta.env.VITE_MEDIA_URL;
    const eventWhishCart = whishCartData?.data.event


    const removeMutation = useMutation({
        mutationFn: (orgId) => removeFromWhishCart(orgId, token),
        onSuccess: () => {
            queryClient.invalidateQueries(['whishCart', token]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleRemove = (org) => {
        removeMutation.mutate({ orgId: org.id });
    };

    useEffect(() => {
        const updatedStates = {};
        whishCartList?.forEach(item => {
            updatedStates[item.organization_id] = true;
        });
        setLikedStates(updatedStates);
    }, [whishCartList]);




    return (
        <div className="wishlist-container max-w-6xl mx-auto py-4 mb-20">
            {/* Tabs */}
            <div className=" bg-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.25)]">
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
                                    wishId={event.id}
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
                                    className="relative p-4 rounded-lg flex flex-col items-center justify-center 
                  hover:bg-gray-50 transition-colors duration-200 h-[150px] w-[100%]  shadow-[0_2px_4px_rgba(0,0,0,0.25)]
                 "
                                >
                                    <div className="h-40 w-44 md:h-40 mb-2 flex items-center justify-center">
                                        <img
                                            src={org?.organization_details?.photo ? `${imgurl}/organization/${org?.organization_details?.photo}` : `/img/ngo.png`}
                                            alt={`${org?.organization_details?.organization_name} logo`}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleRemove(org)}
                                        className="absolute top-2 right-2"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSolidHeart}
                                            size="lg"
                                            color={likedStates[org.organization_id] ? "#ffffff" : "rgba(0,0,0,0.3)"}
                                            className={`drop-shadow-[0_0_1.8px_rgba(0,0,0,0.25)]`}
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





