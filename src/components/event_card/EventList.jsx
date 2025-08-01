

import React, { useState } from "react";
import { eventData } from "../../utils/eventData.js";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

const EventList = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6  md:p-4 mb-20">
                {eventData.map((event) => (
                    <div key={event.id} onClick={() => handleCardClick(event)}>
                        <EventCard
                            image={event.image}
                            title={event.title}
                            organizer={event.organizer}
                            dateRange={event.dateRange}
                            description={event.description}
                        />
                    </div>
                ))}
            </div>

            <EventModal
                isOpen={selectedEvent !== null}
                onClose={() => setSelectedEvent(null)}
                event={selectedEvent}
            />
        </>
    );
};

export default EventList;
