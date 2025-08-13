import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { volApply } from "../../api/volApplyApi";
import useOrgAuthStore from "../../store/useOrgAuthStore"
import { getVolEventList } from "../../api/getEventListApi";
import swal from 'sweetalert';



const ApplicationForm = ({ onFormClose, event }) => {
    const Id = event?.id;
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        age: '',
        gender: '',
        dob: '',
        mobile: '',
        email: '',
        occupation: '',
        address: '',
        identityProof: null,
    });

    const token = useOrgAuthStore((state) => state.orgUser?.token);

    const useEventList = (token) => {
        return useQuery({
            queryKey: ["eventList", token],
            queryFn: () => getVolEventList(token),
            enabled: !!token,
        });
    };

    const { data, isLoading, error } = useEventList(token);
    const eventData = data?.data;
    console.log(eventData);



    const mutation = useMutation({
        mutationFn: (formData) => {
            const formDataToSend = new FormData();
            console.log('identityProof:', formData.identityProof);
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (value instanceof File) {
                        formDataToSend.append(key, value, value.name);
                    } else {
                        formDataToSend.append(key, value);
                    }
                }
            });
            if (Id) {
                formDataToSend.append('event_id', Id);
            }
            for (let [key, val] of formDataToSend.entries()) {
                console.log(key, val);
            }

            return volApply(formDataToSend, token);
        },
        onSuccess: () => {
            swal('Application submitted successfully!');
            onFormClose();
        },
        onError: (error) => {
            console.error('Submission error:', error);
            swal(error.message || 'Failed to submit application');
        }
    });


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.identityProof || !(formData.identityProof instanceof File)) {
            alert('Please select a valid file');
            return;
        }
        mutation.mutate(formData);
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center modal-overlay px-8">
            <div className="bg-white w-full max-w-md rounded-xl p-5 relative mx-auto">
                {/* Close Button */}
                <button
                    onClick={onFormClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <RxCross1 size={18} />
                </button>

                {/* Title */}
                <div className="text-center mb-3">
                    <h2 className="text-lg font-semibold">Application Form</h2>
                    <p className="text-xs text-gray-500">ROOTS & REACH</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="flex flex-col gap-3 px-3">
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Middle Name"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />
                    </div>

                    <div className="flex flex-row gap-2 px-3">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-2 outline-none text-gray-500 w-1/3"
                        >
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-2 outline-none placeholder-gray-400 w-2/3"
                        />

                    </div>

                    <div className="flex flex-col gap-3 px-3">
                        {/* <div className="relative">
                            <input
                                type="date"
                                id="dob-input"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <label
                                htmlFor="dob-input"
                                className={`border border-gray-300 rounded-xl py-2 px-3 outline-none flex items-center justify-between ${formData.dob ? 'text-gray-800' : 'text-gray-500'
                                    }`}
                            >
                                <span>
                                    {formData.dob
                                        ? new Date(formData.dob).toLocaleDateString()
                                        : 'Date of Birth'}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </label>
                        </div> */}
                        <div className="relative">
                            <input
                                type="date"
                                id="dob-input"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
                            />
                            <label
                                htmlFor="dob-input"
                                className={`border border-gray-300 rounded-xl py-2 px-3 outline-none flex items-center justify-between pointer-events-none ${formData.dob ? 'text-gray-800' : 'text-gray-500'
                                    }`}
                            >
                                <span>
                                    {formData.dob
                                        ? new Date(formData.dob).toLocaleDateString()
                                        : 'Date of Birth'}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </label>
                        </div>

                        <input
                            type="tel"
                            placeholder="Mobile No."
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Home Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                        />

                        <div className="relative">
                            <input
                                type="file"
                                name="identityProof"
                                id="file-upload"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".pdf,.jpg,.jpeg,.png"

                            />
                            <label
                                htmlFor="file-upload"
                                className="border border-gray-300 rounded-xl py-2 px-3 outline-none text-gray-500 flex items-center gap-2 hover:border-gray-400 transition-colors"
                            >
                                <FontAwesomeIcon icon={faFileArrowUp} className="text-gray-400" />
                                <span>
                                    {formData.identityProof
                                        ? formData.identityProof.name
                                        : "Upload Identity Proof"}
                                </span>
                            </label>
                        </div>
                        {/* <select
                            name="event"
                            value={formData.event}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl py-2 px-3 outline-none text-gray-500"
                        >
                            <option value="" disabled>Event</option>
                            {eventData?.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.title}
                                </option>
                            ))}
                        </select> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row justify-between gap-3 pt-3 px-3">
                        <button
                            type="button"
                            className="bg-gray-200 px-4 py-2 rounded-xl flex-1 hover:bg-gray-300 transition-colors"
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            className="bg-[#06acff] text-white px-4 py-2 rounded-xl flex-1 hover:bg-[#0595e0] transition-colors"
                        >
                            {mutation.isPending ? 'Submitting...' : 'Apply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;

