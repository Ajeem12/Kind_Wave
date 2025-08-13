import React from 'react';
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';
import useOrgAuthStore from '../../store/useOrgAuthStore';

const formatDateToIndian = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const getStatusLabelAndColor = (status) => {
    switch (status) {
        case 0:
            return { label: 'Submited', color: 'text-[#06acff] ' };
        case 1:
            return { label: 'Viewed', color: 'text-violet-500 ' };
        case 2:
            return { label: 'Accepted', color: 'text-green-500 ' };
        case 3:
            return { label: 'Rejected', color: 'text-red-500 ' };
        default:
            return { label: 'Unknown', color: 'text-gray-500 ' };
    }
};

const AllApplications = ({
    data,
    showAll,
    setShowAll,
    setIsFilterOpen,
}) => {
    const roles = useOrgAuthStore((state) => state.orgUser?.role);
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-800 ml-2">All</h2>
                <button
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setIsFilterOpen(true)}
                    aria-label="Filter applications"
                >
                    <FiFilter className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.map((app) => {
                    const { label, color } = getStatusLabelAndColor(app.status);
                    return (
                        <div
                            key={app.id}
                            className="rounded-lg p-3 shadow-md transition-all cursor-pointer"
                        >
                            {roles === 1 ? (
                                <h3 className="text-xs">{app.volunteer_details?.full_name}</h3>
                            ) : (
                                <h3 className="text-xs">{app.event_details?.title}</h3>
                            )}
                            {roles === 1 ? (
                                <p className="text-gray-600 text-xs md:text-base">{app.short_desc}</p>
                            ) : (
                                <p className="text-gray-600 text-xs md:text-base">{app?.event_details?.organization_details?.organization_name}</p>
                            )}
                            <p className="text-[8px] text-gray-400">
                                {roles === 1
                                    ? `Date: ${app.from_date} - ${app.to_date}`
                                    : `Date: ${formatDateToIndian(app.created_at)}`}
                            </p>
                            <span className={`text-[10px] ${color}`}>
                                {label}
                            </span>

                        </div>
                    );
                })}
            </div>

            {data.length > 1 && (
                <div className="flex justify-end items-center pt-2">
                    <button
                        className="text-sm font-medium flex items-center gap-1"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        {showAll ? (
                            <>
                                <FiChevronUp className="w-4 h-4" />
                                See less
                            </>
                        ) : (
                            <>
                                <FiChevronDown className="w-4 h-4" />
                                See more
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllApplications;
