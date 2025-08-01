import React from 'react';

const RecentApplications = ({ data }) => {
    return (
        <div className="mb-4">
            <div className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar px-4 py-2">
                {data.map((app) => (
                    <div
                        key={app.id}
                        className="w-[180px] md:w-[265px] flex-shrink-0 rounded-lg p-3 shadow-md transition-shadow bg-white"
                    >
                        <h3 className="text-sm md:text-lg font-semibold">{app.title}</h3>
                        <p className="text-gray-600 text-xs md:text-base">{app.organization}</p>
                        <p className="text-gray-500 text-[11px] md:text-sm">Date: {app.date}</p>
                        <span className={`text-[10px] md:text-sm rounded-full ${app.statusColor}`}>
                            {app.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentApplications;
