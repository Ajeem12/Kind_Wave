import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getEventList, getVolEventList } from "../../api/getEventListApi.js"
import { getWhishCart } from "../../api/addToWhishCartApi"
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import ApplicationForm from "../applicationform/ApplicationForm.jsx";
import useOrgAuthStore from "../../store/useOrgAuthStore.js"

const EventList = ({ searchResults }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applicationEvent, setApplicationEvent] = useState(null);


    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const role = useOrgAuthStore((state) => state.orgUser?.role);

    const useEventList = (token) => {
        return useQuery({
            queryKey: ["eventList", token, role],
            queryFn: () => getVolEventList(),
            enabled: !!token,
        });
    };
    const useGetWhishCart = (token) => {
        return useQuery({
            queryKey: ["whishCart", token],
            queryFn: () => getWhishCart(token),
            enabled: !!token,
        });
    }
    const { data: whishCartData, isLoading: whishCartLoading, error: whishCartError } = useGetWhishCart(token);
    const eventWhishCart = whishCartData?.data.event
    const eventWishMap = {};
    eventWhishCart?.forEach(item => {
        eventWishMap[item.event_id] = item.id;
    });
    console.log("Ids", eventWishMap);



    const { data, isLoading, error } = useEventList(token);
    const eventData = data?.data;

    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    const handleVolunteerClick = () => {
        setApplicationEvent(selectedEvent);
        setShowApplicationForm(true);
        setSelectedEvent(null);
    };

    const handleCloseApplicationForm = () => {
        setShowApplicationForm(false);
        setApplicationEvent(null);
    };

    const searchResult = searchResults?.data;
    const displayEvents = searchResult?.length > 0 ? searchResult : eventData;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Events</h2>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-4 mb-20">
                {displayEvents?.length > 0 ? (
                    displayEvents.map((event, index) => (
                        <div key={index} onClick={() => handleCardClick(event)} className="cursor-pointer">
                            <EventCard
                                wishId={eventWishMap[event.id]}
                                id={event.id}
                                image={event.image}
                                title={event.title}
                                organizer={event.organization_details?.organization_name}
                                dateRange={`${event?.from_date} - ${event?.to_date}`}
                                description={event.long_desc}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-700">No Events Found</h1>
                        <p className="text-gray-500 mt-2">
                            {searchResult?.length === 0 ? "No events match your search criteria." : "There are no events available at the moment."}
                        </p>
                    </div>
                )}
            </div>

            {selectedEvent && (
                <EventModal
                    isOpen={selectedEvent !== null}
                    onEventModalClose={() => setSelectedEvent(null)}
                    onVolunteer={handleVolunteerClick}
                    event={selectedEvent}
                />
            )}

            {showApplicationForm && (
                <ApplicationForm
                    event={applicationEvent}
                    onFormClose={handleCloseApplicationForm}
                />
            )}
        </>
    );
};

export default EventList;