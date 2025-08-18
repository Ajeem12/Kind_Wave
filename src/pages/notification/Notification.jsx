import React from 'react';
import { appliedVolForOrg } from "../../api/appliedVolListForOrgApi";
import { useQuery } from '@tanstack/react-query';
import { Clock, Check, X, User, Mail, Phone, Calendar, MapPin, Briefcase, Clock as TimeIcon } from 'lucide-react';
import useOrgAuthStore from '../../store/useOrgAuthStore';
import { format } from 'date-fns';
// import { Link } from 'react-router-dom';

const Notification = () => {
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const role = useOrgAuthStore((state) => state.orgUser?.role);
    const imgUrl = import.meta.env.VITE_MEDIA_URL;

    const { data: volData, isLoading, isError } = useQuery({
        queryKey: ["appliedVolForOrg", token],
        queryFn: () => appliedVolForOrg(token),
        enabled: !!token && role === 1,
    });

    const handleStatusUpdate = (applicationId, newStatus) => {
        // Implement your status update logic here
        console.log(`Updating application ${applicationId} to status ${newStatus}`);
        // You would typically call an API here to update the status
    };

    const getStatusText = (statusCode) => {
        switch (statusCode) {
            case 0: return 'Rejected';
            case 1: return 'Pending';
            case 2: return 'Approved';
            default: return 'Unknown';
        }
    };

    const getStatusColor = (statusCode) => {
        switch (statusCode) {
            case 0: return 'bg-red-100 text-red-800';
            case 1: return 'bg-yellow-100 text-yellow-800';
            case 2: return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-red-500 bg-red-50 rounded-lg">
                Failed to load applications. Please try again later.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Volunteer Applications</h1>
                <div className="text-sm text-gray-500">
                    {volData?.data?.length || 0} applications
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {volData?.data?.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {volData.data.map((application, index) => (
                            <li key={index} className="p-6 hover:bg-gray-50">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Volunteer Info */}
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        {application.volunteer_details.profile_photo ? (
                                            <img
                                                className="h-20 w-20 rounded-full object-cover mb-3"
                                                src={`${imgUrl}/volunteer/${application.volunteer_details.profile_photo}`}
                                                alt={application.volunteer_details.full_name}
                                            />
                                        ) : (
                                            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                                                <User className="h-10 w-10 text-gray-400" />
                                            </div>
                                        )}
                                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                                            {getStatusText(application.status)}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        {/* Volunteer Details */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {application.volunteer_details.full_name}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                    <span>{application.volunteer_details.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                    <span>{application.volunteer_details.contact_no}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                                    <span>{application.volunteer_details.occupation}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                    <span>Applied: {format(new Date(application.created_at), 'MMM dd, yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Opportunity Details */}
                                        <div className="border-t pt-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Opportunity Details</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">{application.title}</h5>
                                                    <p className="text-sm text-gray-500 mt-1">{application.short_desc}</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                        <span>
                                                            {format(new Date(application.from_date), 'MMM dd')} - {format(new Date(application.to_date), 'MMM dd, yyyy')}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <TimeIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                        <span>{application.time}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                                        <span>{application.address}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        {application.status === 1 && (
                                            <div className="flex flex-wrap gap-3 mt-4">
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 2)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <Check className="h-4 w-4 mr-2" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 0)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <X className="h-4 w-4 mr-2" />
                                                    Reject
                                                </button>
                                                {/* <Link
                                                    to={`/volunteers/${application.volunteer_id}`}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    View Full Profile
                                                </Link> */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-8 text-center">
                        <Clock className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No applications yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            When volunteers apply to your opportunities, they'll appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;