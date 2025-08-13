import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getEventList, getVolEventList } from "../../api/getEventListApi.js"
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
            queryFn: () => role === 2 ? getVolEventList() : getEventList(token),
            enabled: !!token,
        });
    };

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

    const searchResult = searchResults?.data
    const displayEvents = searchResult?.length > 0 ? searchResult : eventData;



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-4 mb-20">
                {searchResult?.length > 0 ? (
                    <>
                        {displayEvents?.map((event, index) => (
                            <div key={index} onClick={() => handleCardClick(event)}>
                                <EventCard
                                    id={event.id}
                                    image={event.image}
                                    title={event.title}
                                    organizer={event.organization_details?.organization_name}
                                    dateRange={`${event?.from_date} - ${event?.to_date}`}
                                    description={event.long_desc}
                                />
                            </div>

                        ))}
                    </>
                ) : (
                    <>
                        {displayEvents?.map((event, index) => (
                            <div key={index} onClick={() => handleCardClick(event)}>
                                <EventCard
                                    id={event.id}
                                    image={event.image}
                                    title={event.title}
                                    organizer={event.organization_details?.organization_name}
                                    dateRange={`${event?.from_date} - ${event?.to_date}`}
                                    description={event.long_desc}
                                />
                            </div>
                        ))}
                    </>
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