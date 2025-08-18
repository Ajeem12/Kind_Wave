import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import RecentApplications from "../../components/recentapplications/RecentApplications";
import EventCard from "../../components/event_card/EventCard";
import EventModal from "../../components/event_card/EventModal.jsx";
import { useQuery } from '@tanstack/react-query';
import { appliedVolForOrg } from "../../api/appliedVolListForOrgApi.js"
import { getEventList } from "../../api/getEventListApi.js"
import { getOrgProfile } from "../../api/getOrgProfileApi.js";
import { orgVolList } from "../../api/orgVolListApi.js"
import { getAppliedVolunteer } from "../../api/appliedVolunteerApi.js"
import useOrgAuthStore from "../../store/useOrgAuthStore.js"
import AddEvent from "../../components/addevent/AddEvent.jsx";
import AddJourney from "../../components/addJourny/AddJourney.jsx";


const StatsCard = ({ number, label }) => (
    <div className="flex flex-col items-center bg-white rounded-full w-20 h-20 justify-center shadow-md">
        <p className="text-lg font-bold">{number}</p>
        <p className="text-xs text-gray-600">{label}</p>
    </div>
);

const ProfilePage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showAddJourney, setShowAddJourney] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [journeyToEdit, setJourneyToEdit] = useState(null);


    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const role = useOrgAuthStore((state) => state.orgUser?.role);
    const useEventList = (token) => {
        return useQuery({
            queryKey: ["eventList", token],
            queryFn: () => getEventList(token),
            enabled: !!token,
        });
    };

    const useOrgProfile = (token) => {
        return useQuery({
            queryKey: ["orgProfile", token],
            queryFn: () => getOrgProfile(token),
            enabled: !!token,
        });
    };

    const useOrgVolList = (token) => {
        return useQuery({
            queryKey: ["orgVolList", token],
            queryFn: () => orgVolList(token),
            enabled: !!token,
        });
    }

    const useAppliedVolForOrg = (token) => {
        return useQuery({
            queryKey: ["appliedVolForOrg", token],
            queryFn: () => appliedVolForOrg(token),
            enabled: !!token,
        });
    }

    const useAppliedVolunteer = (token) => {
        return useQuery({
            queryKey: ["appliedVolunteer", token],
            queryFn: () => getAppliedVolunteer(token),
            enabled: !!token,
        });
    }

    const { data: orgVolListData, isLoading: orgVolListLoading, error: orgVolListError } = useOrgVolList(token);

    const volunteers = Array.isArray(orgVolListData) && orgVolListData.length > 0
        ? orgVolListData[0].volunteers
        : [];

    console.log("Volunteers:", volunteers.length);



    const { data: appliedVolForOrgData, isLoading: appliedVolForOrgLoading, error: appliedVolForOrgError } = useAppliedVolForOrg(token);
    // console.log("List  ", appliedVolForOrgData?.data);


    const { data: appliedVolunteerData, isLoading: appliedVolunteerLoading, error: appliedVolunteerError } = useAppliedVolunteer(token);
    const volunteer = appliedVolunteerData?.data
    // console.log("Volunteer: ", volunteer);





    const { data: orgProfileData, isLoading: orgProfileLoading, error: orgProfileError } = useOrgProfile(token);
    const jurnyData = orgProfileData?.data?.journey_details

    const { data, isLoading, error } = useEventList(token);
    const eventData = data?.data;


    const handleEditClick = (event) => {
        setEventToEdit(event);
        setShowEdit(true);
        setSelectedEvent(null);
    };

    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    const handleJourneyClick = (journey) => {
        setJourneyToEdit(journey);
        setShowAddJourney(true);
    };

    const handleVolunteerClick = () => {
        setShowshow(true);
        setSelectedEvent(null);
    };


    return (
        <>
            <div className="min-h-screen font-sans flex flex-col mb-20">

                <Link to={"/profile-page"}
                    state={{ orgProfileData: orgProfileData?.data }}>
                    <FontAwesomeIcon
                        icon={faGear}
                        className="absolute top-20 right-4 text-black z-20"
                        size="lg"
                    />
                </Link>


                {/* Main Content Area */}
                <main className="flex-1">

                    <div className="relative h-96 overflow-hidden">
                        {/* Half circle background - absolutely positioned within its container */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px]  h-[300px] bg-gradient-to-b from-[#49A6d3] to-[#81d0ee] rounded-b-full"></div>

                        {/* Profile Content */}
                        <div className="relative z-10 pt-12 text-center">
                            <img
                                src="/img/s6.png"
                                alt="Logo"
                                className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-white p-2 shadow-lg"
                            />
                            <h1 className="font-bold text-xl md:text-2xl text-white mt-3">{orgProfileData?.data?.organization_name}</h1>
                            <p className="text-white text-sm md:text-lg">Charity</p>
                        </div>

                        {/* Stats */}
                        <div className="absolute top-[57%] left-[8%]">
                            <StatsCard number={eventData?.length} label="Events" />
                        </div>
                        <div className="absolute top-[65%] left-[40%]">
                            <StatsCard number="10" label="Impact" />
                        </div>
                        <div className="absolute top-[57%] right-[8%]">
                            <StatsCard number={volunteers.length} label="Volunteers" />
                        </div>
                    </div>

                    {/* Page Content - now flows normally */}
                    <div className="px-6 pb-10">
                        {/* Members */}
                        <div className="flex items-center justify-between mb-2 mt-6">
                            <h2 className="font-semibold text-sm md:text-lg">Members</h2>
                            {/* {role === 1 && (<FontAwesomeIcon icon={faPen} className="text-gray-600" size="md" />)} */}
                        </div>
                        <div className="flex gap-4 mb-6 overflow-x-auto">
                            {volunteers.map((member, idx) => (
                                <div key={idx} className="flex flex-col items-center text-xs md:text-base">
                                    <img
                                        src={"https://cdn-icons-png.flaticon.com/512/4128/4128176.png"}
                                        alt={member.full_name}
                                        className="w-12 h-12 md:w-24 md:h-24 rounded-full object-cover"

                                    />
                                    <span className="mt-1">{member.full_name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Journey Section */}
                        <div className="flex items-center justify-between mb-2 ">
                            <h2 className="font-semibold text-sm md:text-lg">Journey</h2>
                            {role === 1 && (<FontAwesomeIcon onClick={() => setShowAddJourney(true)} icon={faPen} className="text-gray-600" size="md" />
                            )}
                        </div>
                        <RecentApplications data={jurnyData} onJourneyClick={handleJourneyClick} />

                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm text-gray-700">Event</h2>
                            <h2 className="text-sm text-gray-700">See more</h2>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
                    </div>
                </main>
            </div>
            {selectedEvent && (
                <EventModal
                    isOpen={selectedEvent !== null}
                    onEventModalClose={() => setSelectedEvent(null)}
                    onVolunteer={handleVolunteerClick}
                    onEdit={() => handleEditClick(selectedEvent)}
                    event={selectedEvent}
                />
            )}
            {showEdit && (
                <AddEvent onFormClose={() => {
                    setShowEdit(false);
                    setEventToEdit(null);
                }}
                    eventToEdit={eventToEdit}
                />
            )}

            {showAddJourney && (
                <AddJourney onJournyClose={() => {
                    setShowAddJourney(false);
                    setJourneyToEdit(null);
                }}
                    journeyToEdit={journeyToEdit}

                />
            )}
        </>
    );
};

export default ProfilePage;