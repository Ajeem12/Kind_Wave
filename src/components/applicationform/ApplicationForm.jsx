import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { volApply } from "../../api/volApplyApi";
import { volProfileUpdate } from "../../api/volProfileUpdateApi";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { getVolProfile } from "../../api/volProfileApi";
import swal from 'sweetalert';

const ApplicationForm = ({ onFormClose, event }) => {
    const Id = event?.id;
    const [formData, setFormData] = useState({
        fullName: '',
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

    // Fetch volunteer profile data
    const { data: profileData, isLoading: isProfileLoading } = useQuery({
        queryKey: ["volProfile", token],
        queryFn: () => getVolProfile(token),
        enabled: !!token,
    });

    // Pre-fill form when profile data is available
    useEffect(() => {
        if (profileData?.data) {
            const profile = profileData.data;
            setFormData(prev => ({
                ...prev,
                fullName: profile.full_name || '',
                gender: profile.gender || '',
                dob: profile.dob !== "0000-00-00" ? profile.dob : '',
                mobile: profile.contact_no || '',
                email: profile.email || '',
                occupation: profile.occupation || '',
                address: profile.address || '',
            }));
        }
    }, [profileData]);

    const applicationMutation = useMutation({
        mutationFn: (formData) => {
            const formDataToSend = new FormData();
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
            return volApply(formDataToSend, token);
        }
    });

    const profileMutation = useMutation({
        mutationFn: (formData) => {
            const formDataToSend = new FormData();
            formDataToSend.append('full_name', formData.fullName);
            formDataToSend.append('dob', formData.dob);
            formDataToSend.append('occupation', formData.occupation || '');
            formDataToSend.append('address', formData.address || '');
            formDataToSend.append('gender', formData.gender || '');
            formDataToSend.append('contact_no', formData.mobile || '');
            if (formData.identityProof instanceof File) {
                formDataToSend.append('image', formData.identityProof);
            }
            return volProfileUpdate(formDataToSend, token);
        }
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.identityProof || !(formData.identityProof instanceof File)) {
            swal('Error', 'Please select a valid identity proof file', 'error');
            return;
        }

        try {
            // First update the profile
            await profileMutation.mutateAsync(formData);
            // Then submit the application
            await applicationMutation.mutateAsync(formData);

            swal('Success', 'Application submitted and profile updated successfully!', 'success');
            onFormClose();
        } catch (error) {
            console.error('Submission error:', error);
            swal('Error', error.message || 'Failed to complete submission', 'error');
        }
    };

    const isLoading = applicationMutation.isPending || profileMutation.isPending;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center modal-overlay px-8 bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-xl p-5 relative mx-auto">
                <button
                    onClick={onFormClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    disabled={isLoading}
                >
                    <RxCross1 size={18} />
                </button>

                <div className="text-center mb-3">
                    <h2 className="text-lg font-semibold">Application Form</h2>
                    <p className="text-xs text-gray-500">{event?.organization_details?.organization_name}</p>
                </div>

                {isProfileLoading ? (
                    <div className="text-center py-4">Loading your profile data...</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        <div className="flex flex-col gap-3 px-3">
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-row gap-2 px-3">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl py-2 px-2 outline-none text-gray-500 w-1/3"
                                required
                                disabled={isLoading}
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
                                min="18"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-3 px-3">
                            <div className="relative">
                                <input
                                    type="date"
                                    id="dob-input"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="dob-input"
                                    className={`border border-gray-300 rounded-xl py-2 px-3 outline-none flex items-center justify-between pointer-events-none ${formData.dob ? 'text-gray-800' : 'text-gray-500'
                                        } ${isLoading ? 'opacity-70' : ''}`}
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
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="text"
                                placeholder="Occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                                disabled={isLoading}
                            />
                            <input
                                type="text"
                                placeholder="Home Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl py-2 px-3 outline-none placeholder-gray-400"
                                disabled={isLoading}
                            />

                            <div className="relative">
                                <input
                                    type="file"
                                    name="identityProof"
                                    id="file-upload"
                                    onChange={handleChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className={`border border-gray-300 rounded-xl py-2 px-3 outline-none text-gray-500 flex items-center gap-2 hover:border-gray-400 transition-colors ${isLoading ? 'opacity-70' : ''
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faFileArrowUp} className="text-gray-400" />
                                    <span>
                                        {formData.identityProof
                                            ? formData.identityProof.name
                                            : "Upload Identity Proof"}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between gap-3 pt-3 px-3">
                            <button
                                type="button"
                                onClick={onFormClose}
                                className="text-sm font-normal px-4 py-2 rounded-[10px] w-1/2  shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className=" text-white text-sm w-1/2 font-normal px-4 py-2 rounded-[10px] bg-[#00acff]  shadow-[0_2px_4px_rgba(0,0,0,0.25)]" >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Apply'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ApplicationForm;