import React from 'react';
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';

const AllApplications = ({
    data,
    showAll,
    setShowAll,
    setIsFilterOpen,
}) => {
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
                {data.map((app) => (
                    <div
                        key={app.id}
                        className="rounded-lg p-3 shadow-md transition-all cursor-pointer"
                    >
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 ">{app.title}</h3>
                        <p className="text-xs md:text-base text-gray-600 ">{app.organization}</p>
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] md:text-sm text-gray-500">Date: {app.date}</p>
                            <span className={`text-[10px] md:text-sm px-2 py-1 rounded-full ${app.statusColor}`}>
                                {app.status}
                            </span>
                        </div>
                    </div>
                ))}
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
