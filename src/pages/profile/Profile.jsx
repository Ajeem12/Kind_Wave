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
import { getMember } from "../../api/addMemberApi.js";
import { getAppliedVolunteer } from "../../api/appliedVolunteerApi.js"
import useOrgAuthStore from "../../store/useOrgAuthStore.js"
import AddEvent from "../../components/addevent/AddEvent.jsx";
import AddJourney from "../../components/addJourny/AddJourney.jsx";
import AddMember from "../../components/addMember/AddMember.jsx";


const StatsCard = ({ number, label }) => (
    <div className="flex flex-col items-center bg-white rounded-full w-[87px] h-[87px] justify-center shadow-md">
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
    const [showAddMember, setShowAddMember] = useState(false);



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

    const useGetMember = (token) => {
        return useQuery({
            queryKey: ["member", token],
            queryFn: () => getMember(token),
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
    const { data: memberData, isLoading: memberLoading, error: memberError } = useGetMember(token);
    const member = memberData?.data

    const volunteers = Array.isArray(orgVolListData) && orgVolListData.length > 0
        ? orgVolListData[0].volunteers
        : [];


    const { data: appliedVolForOrgData, isLoading: appliedVolForOrgLoading, error: appliedVolForOrgError } = useAppliedVolForOrg(token);


    const { data: appliedVolunteerData, isLoading: appliedVolunteerLoading, error: appliedVolunteerError } = useAppliedVolunteer(token);
    const volunteer = appliedVolunteerData?.data


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

    const handleEditMember = () => {
        setShowAddMember(true);
    }

    const handleVolunteerClick = () => {
        setShowshow(true);
        setSelectedEvent(null);
    };

    const [showAll, setShowAll] = useState(false);

    const visibleEvents = eventData ? (showAll ? eventData : eventData.slice(0, 2)) : [];
    const ImgUrl = import.meta.env.VITE_MEDIA_URL;




    return (
        <>
            <div className="min-h-screen flex flex-col mb-20">

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
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[550px]  h-[330px] bg-gradient-to-b from-[#49a6d3] to-[#81d0ee] rounded-b-full"></div>
                        {/* Profile Content */}
                        <div className="relative z-10 pt-12 text-center">
                            <img
                                src={orgProfileData?.data?.photo ? `${ImgUrl}/organization/${orgProfileData?.data?.photo}` : `/img/ngo.png`}
                                alt="Logo"
                                className="w-36 h-36 md:w-32 md:h-32 mx-auto rounded-full bg-white p-1 shadow-lg"
                            />
                            <h1 className="font-bold text-lg md:text-2xl  mt-3">{orgProfileData?.data?.organization_name}</h1>
                            <p className="text-sm md:text-lg mb-3">{orgProfileData?.data?.category_details?.category_name}</p>
                        </div>

                        {/* Stats */}
                        <div className="absolute top-[68%] left-[8%]">
                            <StatsCard number={eventData?.length} label="Events" />
                        </div>
                        <div className="absolute top-[75%] left-[40%]">
                            <StatsCard number={orgProfileData?.data?.impact} label="Impact" />
                        </div>
                        <div className="absolute top-[68%] right-[7%]">
                            <StatsCard number={volunteers?.length} label="Volunteers" />
                        </div>
                    </div>

                    {/* Page Content - now flows normally */}
                    <div className="px-6 pb-10">
                        {/* Members */}
                        <div className="flex items-center justify-between mb-2 mt-6">
                            <h2 className="text-sm  md:text-lg">Members</h2>
                            {role === 1 && (<FontAwesomeIcon icon={faPen} onClick={() => setShowAddMember(true)} className="text-gray-600" size="sm" />)}
                        </div>
                        <div className="mb-6">
                            <div
                                className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {member?.map((member, idx) => (
                                    <Link
                                        key={idx}
                                        to={`/member-details/${member.id}`}
                                        className="flex flex-col items-center text-xs md:text-base min-w-[80px] md:min-w-[120px] flex-shrink-0"
                                    >
                                        <img
                                            src={`${ImgUrl}/members/${member.profile_photo}`}
                                            alt={member.full_name}
                                            className="w-12 h-12 md:w-24 md:h-24 rounded-full object-cover"
                                        />
                                        <span className="mt-1">{member.full_name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Journey Section */}
                        <div className="flex items-center justify-between mb-2 ">
                            <h2 className="text-sm md:text-lg">Journey</h2>
                            {role === 1 && (<FontAwesomeIcon onClick={() => setShowAddJourney(true)} icon={faPen} className="text-gray-600" size="sm" />
                            )}
                        </div>
                        <RecentApplications data={jurnyData} onJourneyClick={handleJourneyClick} />

                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm text-gray-700">Event</h2>
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-sm text-gray-700"
                            >
                                {showAll ? "See less" : "See more"}
                            </button>
                        </div>
                        <>
                            {visibleEvents?.map((event) => (
                                <div key={event.id} onClick={() => handleCardClick(event)}>
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
            {showAddMember && (
                <AddMember onMemberClose={() => setShowAddMember(false)} />
            )}
        </>
    );
};

export default ProfilePage;