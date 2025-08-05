import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { FiEdit2 } from "react-icons/fi";

const EventModal = ({ isOpen, onEventModalClose, event, onVolunteer, onEdit }) => {
    const roles = useOrgAuthStore((state) => state.orgUser?.role);


    const imgurl = import.meta.env.VITE_MEDIA_URL;
    if (!isOpen || !event) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };


    return (
        <>
            <div className="fixed inset-0 z-60 flex items-center justify-center modal-overlay p-4">
                <div className="bg-white rounded-lg shadow-lg w-[100%]   max-w-lg  relative p-4">
                    {/* Close button */}
                    <button
                        onClick={onEventModalClose}
                        className="absolute top-5 right-5 text-black "
                    >
                        <RxCross1 size={18} className="font-bold" />
                    </button>

                    {/* Image */}
                    <img
                        src={`${imgurl}/events/${event.image}`}
                        alt={event.title}
                        className="rounded-lg w-full object-cover"
                    />

                    {/* Content */}
                    <div className="text-sm mt-2">
                        {/* Title & Date */}
                        <div className="flex justify-between items-start mb-1">
                            <h2 className="font-semibold text-base text-black">{event.title}</h2>
                            <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(event.from_date)} to {formatDate(event.to_date)}</span>
                        </div>

                        <p className="text-xs uppercase font-medium text-gray-500 mb-2">{event.organization_details.organization_name}</p>
                        <p className="text-sm text-gray-700 mb-3">{event.long_desc}</p>

                        <div className="space-y-1 text-gray-700 text-xs">
                            <p><strong>Purpose:</strong> {event.purpose}</p>
                            <p><strong>Impact:</strong> {event.impact}</p>
                            <p><strong>Stakeholders:</strong> {event.stack_list}</p>
                            <p><strong>Program:</strong> {event.programmlist}</p>
                            <p><strong>Time:</strong> {formatTime(event.time)}</p>
                            <p><strong>Address:</strong> {event.address}</p>
                            <p><strong>Role:</strong> {event.rolelist}</p>
                        </div>
                        {roles === 1 ? (" ") : (<p className="mt-2 ml-1">Get Involved!</p>)}
                        {/* Actions */}
                        <div className="flex items-center justify-between gap-2">
                            {roles === 1 ? (
                                <button
                                    onClick={onEdit}
                                    className="bg-[#06acff] w-2/3 text-white px-4 py-2 rounded-lg"
                                >
                                    <FiEdit2 className="inline mr-1" />
                                    Edit Event
                                </button>
                            ) : (
                                <button onClick={onVolunteer} className=" text-white text-sm px-4 py-2 rounded-lg w-2/3 hover:bg-sky-500 transition">
                                    Volunteer
                                </button>
                            )}

                            <button className="text-sm px-4 py-2 rounded-md w-1/3 shadow-sm transition">
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default EventModal;



