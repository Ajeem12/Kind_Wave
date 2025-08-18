// import React from 'react';
// import { getVolDetails } from "../../api/volDetailsForOrgApi"
// import { useParams } from 'react-router-dom';
// import useOrgAuthStore from '../../store/useOrgAuthStore';
// import { useQuery } from '@tanstack/react-query';

// const ApplyVolDetails = () => {
//     const id = useParams()
//     const token = useOrgAuthStore((state) => state.orgUser?.token);


//     const { data: vol, isLoading, isError, error } = useQuery({
//         queryKey: ['volunteerDetails', id],
//         queryFn: () => getVolDetails(id, token),
//         enabled: !!id && !!token,
//     });
//     const volunteer = vol?.data;




//     return (
//         <div className='p-6'>
//             <div className="rounded-lg shadow-sm overflow-hidden  border border-gray-100">
//                 {/* Header */}
//                 <div className="bg-[#06acff] px-4 py-3">
//                     <h2 className="text-white text-lg font-medium">{volunteer?.name}</h2>
//                     <p className="text-blue-100 text-sm">{volunteer?.email}</p>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4 space-y-4">
//                     {/* Contact Info */}
//                     <div>
//                         <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-1">Contact</h3>
//                         <p className="text-gray-600 text-sm">{volunteer?.phone}</p>
//                         <p className="text-gray-600 text-sm">{volunteer?.address}</p>
//                     </div>

//                     {/* Skills */}
//                     <div>
//                         <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-1">Occupation</h3>
//                         <div className="flex flex-wrap gap-1.5">
//                             {/* {volunteer.skills.map((skill, index) => ( */}
//                             <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
//                                 {volunteer?.occupation}
//                             </span>
//                             {/* ))} */}
//                         </div>
//                     </div>

//                     {/* About */}
//                     <div>
//                         <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-1">About</h3>
//                         <p className="text-gray-600 text-sm leading-snug">{volunteer?.about}</p>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default ApplyVolDetails;


import React from 'react';
import { getVolDetails } from "../../api/volDetailsForOrgApi";
import { useParams } from 'react-router-dom';
import useOrgAuthStore from '../../store/useOrgAuthStore';
import { useQuery } from '@tanstack/react-query';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaBirthdayCake, FaBriefcase, FaVenusMars } from 'react-icons/fa';

const ApplyVolDetails = () => {
    const id = useParams()
    const token = useOrgAuthStore((state) => state.orgUser?.token);


    const { data: vol, isLoading, isError, error } = useQuery({
        queryKey: ['volunteerDetails', id],
        queryFn: () => getVolDetails(id, token),
        enabled: !!id && !!token,
    });
    const volunteer = vol?.data;

    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#06acff]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Error loading volunteer details: {error.message}
            </div>
        );
    }

    return (
        <div className='p-6 mb-10'>
            <div className="rounded-lg shadow-sm overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-[#06acff] px-4 py-3">
                    <h2 className="text-white text-lg font-medium flex items-center gap-2">
                        <FaUser className="inline" />
                        {volunteer?.full_name || 'Volunteer'}
                    </h2>
                    <p className="text-blue-100 text-sm flex items-center gap-2">
                        <FaEnvelope className="inline" />
                        {volunteer?.email || 'No email provided'}
                    </p>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-2">Contact</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600 text-sm flex items-center gap-2">
                                <FaPhone className="text-gray-400" />
                                {volunteer?.contact_no || 'No phone number provided'}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-400" />
                                {volunteer?.address || 'No address provided'}
                            </p>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div>
                        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-2">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <FaVenusMars className="text-gray-400" />
                                <div>
                                    <p className="text-gray-500 text-xs">Gender</p>
                                    <p className="text-gray-700">{volunteer?.gender || 'Not specified'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaBirthdayCake className="text-gray-400" />
                                <div>
                                    <p className="text-gray-500 text-xs">Date of Birth</p>
                                    <p className="text-gray-700">
                                        {volunteer?.dob && volunteer.dob !== '0000-00-00'
                                            ? new Date(volunteer.dob).toLocaleDateString()
                                            : 'Not specified'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="text-gray-400" />
                                <div>
                                    <p className="text-gray-500 text-xs">Occupation</p>
                                    <p className="text-gray-700">{volunteer?.occupation || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Account Info */}
                    <div>
                        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-2">Account Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500 text-xs">Member Since</p>
                                <p className="text-gray-700">
                                    {volunteer?.created_at
                                        ? new Date(volunteer.created_at).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyVolDetails;