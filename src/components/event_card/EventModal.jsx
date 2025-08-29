import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { FiEdit2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";


const EventModal = ({ isOpen, onEventModalClose, event, onVolunteer, onEdit }) => {
    const roles = useOrgAuthStore((state) => state.orgUser?.role);
    const location = useLocation();


    const imgurl = import.meta.env.VITE_MEDIA_URL;
    if (!isOpen || !event) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',

        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };


    return (
        <>
            <div className="fixed inset-0 z-60 flex items-center justify-center modal-overlay p-4">
                <div className="bg-white rounded-[10px] shadow-lg w-full max-w-lg h-[80%] relative p-4 flex flex-col">
                    {/* Close button */}
                    <button
                        onClick={onEventModalClose}
                        className="absolute top-4 right-5"
                    >
                        <X className="font-black" />
                    </button>

                    {/* Scrollable Content */}
                    <div className="text-sm mt-1 px-[3px] overflow-y-auto flex-1 pb-24">
                        {/* Image */}
                        <img
                            src={`${imgurl}/events/${event.image}`}
                            alt={event.title}
                            className="rounded-[10px] w-full h-44 object-cover"
                        />
                        {/* Title & Date */}
                        <div className="flex items-start">
                            <div className="w-1/2 pr-2">
                                <h2 className="font-semibold text-[15px] break-words leading-snug">
                                    {event.title.charAt(0).toUpperCase() + event.title.slice(1)}
                                </h2>
                            </div>
                            <div className="w-1/2 pl-2 text-right">
                                <span className="font-semibold text-[15px] whitespace-nowrap">
                                    {formatDate(event.from_date)} to {formatDate(event.to_date)}
                                </span>
                            </div>
                        </div>
                        {event?.organization_details?.organization_name ? (
                            <p className="text-sm uppercase font-medium mb-2">
                                {event?.organization_details?.organization_name}
                            </p>
                        ) : (
                            <p className="text-sm uppercase font-medium mb-2">
                                {event?.organization_name}
                            </p>
                        )}

                        <p className="text-sm text-gray-700 mb-3">{event.long_desc}</p>

                        <div className="space-y-1 font-normal text-xs">
                            <p><strong className="font-semibold">Purpose:</strong> {event.purpose}</p>
                            <p><strong className="font-semibold">Impact:</strong> {event.impact}</p>
                            <p><strong className="font-semibold">Stakeholders:</strong> {event.stack_list}</p>
                            <p><strong className="font-semibold">Program:</strong> {event.program}</p>
                            <p><strong className="font-semibold">Time:</strong> {formatTime(event.time)}</p>
                            <p><strong className="font-semibold">Address:</strong> {event.address}</p>
                            <p><strong className="font-semibold">Role:</strong> {event.rolelist}</p>
                        </div>
                    </div>

                    {/* Fixed Buttons */}
                    <div className="absolute left-0 bottom-0 w-full px-4 pb-4 bg-white rounded-[10px]">
                        <p className="my-2 text-xs font-medium ml-1">Get Involved!</p>
                        <div className="flex items-center justify-between gap-2">
                            {roles === 1 && location.pathname !== "/" && (
                                <button
                                    onClick={onEdit}
                                    className="bg-[#06acff] w-2/3 text-white px-4 py-2 rounded-lg"
                                >
                                    <FiEdit2 className="inline mr-1" />
                                    Edit Event
                                </button>
                            )}

                            {location.pathname !== "/profile" && roles !== 1 && (
                                <button
                                    onClick={onVolunteer}
                                    className="text-white text-sm font-normal px-4 py-2 rounded-[10px] bg-[#00acff] w-2/3 shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                                >
                                    Volunteer
                                </button>
                            )}
                            <button className="text-sm font-normal px-4 py-2 rounded-[10px] w-1/3 transition shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventModal;



