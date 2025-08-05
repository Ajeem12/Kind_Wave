import React, { useState } from "react";
import { eventData } from "../../utils/eventData.js";
import { useQuery } from '@tanstack/react-query';
import { getEventList } from "../../api/getEventListApi.js"
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import ApplicationForm from "../applicationform/ApplicationForm.jsx";
import useOrgAuthStore from "../../store/useOrgAuthStore.js"

const EventList = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const useEventList = (token) => {
        return useQuery({
            queryKey: ["eventList", token],
            queryFn: () => getEventList(token),
            enabled: !!token,
        });
    };

    const { data, isLoading, error } = useEventList(token);
    const eventData = data?.data;


    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    const handleVolunteerClick = () => {
        setShowApplicationForm(true);
        setSelectedEvent(null);
    };


    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;




    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6  md:p-4 mb-20">
                {eventData?.map((event) => (
                    <div key={event.id} onClick={() => handleCardClick(event)}>
                        <EventCard
                            image={event.image}
                            title={event.title}
                            organizer={event.organization_details.organization_name}
                            dateRange={event.dateRange}
                            description={event.long_desc}
                        />
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <EventModal
                    isOpen={selectedEvent !== null}
                    onEventModalClose={() => setSelectedEvent(null)}
                    onVolunteer={handleVolunteerClick}
                    event={selectedEvent}
                />
            )}

            {/* Application Form Modal */}
            {showApplicationForm && (
                <ApplicationForm onFormClose={() => setShowApplicationForm(false)} />
            )}
        </>
    );
};

export default EventList;
