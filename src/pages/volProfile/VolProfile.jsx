import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { volProfileUpdate } from "../../api/volProfileUpdateApi";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useOrgAuthStore from '../../store/useOrgAuthStore';
import { useMutation } from '@tanstack/react-query';
import swal from 'sweetalert';

const VolProfile = () => {
    const location = useLocation();
    const userData = location.state?.userData;
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        dob: '',
        mobile: '',
        email: '',
        occupation: '',
        address: '',
        profile_photo: null,
        id: '',
    });


    useEffect(() => {
        if (userData) {
            setFormData({
                fullName: userData.full_name || '',
                age: userData.age || '',
                gender: userData.gender || '',
                dob: userData.dob || '',
                mobile: userData.contact_no || '',
                email: userData.email || '',
                occupation: userData.occupation || '',
                address: userData.address || '',
                profile_photo: null,
                id: userData.id || '',
            });
        }
    }, [userData]);

    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                profile_photo: files[0],
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }


        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.age || formData.age < 10 || formData.age > 100) newErrors.age = 'Please enter a valid age (10-100)';
        if (!formData.gender) newErrors.gender = 'Please select a gender';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.profile_photo && !userData?.profile_photo) {
            newErrors.profile_photo = 'Please upload a profile photo';
        }
        return newErrors;
    };

    const profileMutation = useMutation({
        mutationFn: (formData) => {
            const formDataToSend = new FormData();
            formDataToSend.append('full_name', formData.fullName);
            formDataToSend.append('dob', formData.dob);
            formDataToSend.append('occupation', formData.occupation);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('contact_no', formData.mobile);
            formDataToSend.append('age', formData.age);
            formDataToSend.append('id', formData.id);

            if (formData.profile_photo instanceof File) {
                formDataToSend.append('image', formData.profile_photo);
            }

            return volProfileUpdate(formDataToSend, token);
        },
        onSuccess: () => {
            setIsSubmitted(false);
            swal('Profile saved successfully!');
        },
        onError: (error) => {
            setIsSubmitted(false);
            swal('Error saving profile: ' + error.message);
        }
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            setIsSubmitted(true);
            profileMutation.mutate(formData);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="min-h-screen sm:px-6 lg:px-8 mb-20">
            <div className="py-4 px-6 ">
                <h2 className="text-lg font-semibold text-center">Personal Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            Age *
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.age ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            placeholder="Enter your age"
                            min="16"
                            max="100"
                        />
                        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender *
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.gender ? 'border-red-500' : 'border-gray-300'} outline-none`}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth *
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.dob ? 'border-red-500' : 'border-gray-300'} outline-none`}
                        />
                        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number *
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            placeholder="+1 234 567 8900"
                        />
                        {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            placeholder="john.doe@example.com"
                            disabled
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                        Occupation *
                    </label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.occupation ? 'border-red-500' : 'border-gray-300'} outline-none`}
                        placeholder="Software Engineer"
                    />
                    {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>}
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} outline-none`}
                        placeholder="123 Main St, City, Country"
                    ></textarea>
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div className="relative">
                    <input
                        type="file"
                        name="profile_photo"
                        id="file-upload"
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".jpg,.jpeg,.png"
                    />
                    <label
                        htmlFor="file-upload"
                        className={`block border ${errors.profile_photo ? 'border-red-500' : 'border-gray-300'} rounded-xl py-2 px-3 outline-none text-gray-500 flex items-center gap-2 hover:border-gray-400 transition-colors`}
                    >
                        <FontAwesomeIcon icon={faFileArrowUp} className="text-gray-400" />
                        <span>
                            {formData.profile_photo
                                ? formData.profile_photo.name
                                : userData?.profile_photo
                                    ? "Change Profile Photo"
                                    : "Upload Profile Photo"}
                        </span>
                    </label>
                    {errors.profile_photo && <p className="mt-1 text-sm text-red-600">{errors.profile_photo}</p>}
                    {userData?.profile_photo && !formData.profile_photo && (
                        <p className="mt-1 text-sm text-gray-500">Current photo: {userData.profile_photo}</p>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitted}
                        className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#00acff] transition-all ${isSubmitted ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        {isSubmitted ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            'Save Profile'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VolProfile;


