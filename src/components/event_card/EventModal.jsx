import React from "react";
import { RxCross1 } from "react-icons/rx";

const EventModal = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center modal-overlay p-2">
            <div className="bg-white rounded-lg shadow-lg w-[100%]   max-w-lg  relative p-5">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-1 right-2 text-black  hover:text-black text-lg"
                >
                    <RxCross1 size={16} />
                </button>

                {/* Image */}
                <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-lg w-full  object-cover"
                />

                {/* Content */}
                <div className="text-sm mt-2">
                    {/* Title & Date */}
                    <div className="flex justify-between items-start mb-1">
                        <h2 className="font-semibold text-base text-black">{event.title}</h2>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{event.dateRange}</span>
                    </div>

                    <p className="text-xs uppercase font-medium text-gray-500 mb-2">{event.organizer}</p>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>

                    <div className="space-y-1 text-gray-700 text-xs">
                        <p><strong>Purpose:</strong> {event.purpose}</p>
                        <p><strong>Impact:</strong> {event.impact}</p>
                        <p><strong>Stakeholders:</strong> {event.stakeholders}</p>
                        <p><strong>Program:</strong> {event.program}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                        <p><strong>Address:</strong> {event.address}</p>
                        <p><strong>Role:</strong> {event.role}</p>
                    </div>
                    <p className="mt-2 ml-1">Get Involved!</p>
                    {/* Actions */}
                    <div className="flex gap-3">
                        <button className="bg-sky-400 text-white text-sm px-4 py-2 rounded-lg w-3/4 hover:bg-sky-500 transition">
                            Volunteer
                        </button>
                        <button className="text-sm px-4 py-2 rounded-md w-1/4 shadow-sm transition">
                            Donate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;


