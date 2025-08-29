import React from 'react';
import useOrgAuthStore from '../../store/useOrgAuthStore';
import { Link, useLocation } from 'react-router-dom';


const formatDateToIndian = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
};

const getStatusLabelAndColor = (status) => {
    switch (status) {
        case 0: return { label: 'Submited', color: 'text-[#00acff]' };
        case 1: return { label: 'Viewed', color: 'text-violet-500' };
        case 2: return { label: 'Accepted', color: 'text-[#00b92e]' };
        case 3: return { label: 'Rejected', color: 'text-[#ff0000]' };
        default: return { label: 'Unknown', color: 'text-gray-500' };
    }
};

const RecentApplications = ({ data, onJourneyClick }) => {
    const location = useLocation();
    const role = useOrgAuthStore((state) => state.orgUser?.role);

    return (
        <div className="mb-4">
            <div className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth py-2 px-4">
                {data?.map((app) => {
                    const { label, color } = getStatusLabelAndColor(app.status);
                    const isProfilePage = location.pathname === '/profile' && role === 1;
                    const name = role === 1 ? app?.volunteer_details?.full_name : app?.event_details?.title;
                    const desc = role === 1 ? app?.short_desc : app?.event_details?.organization_details?.organization_name;
                    const date = role === 1 ? `${app.from_date} to ${app.to_date}` : `Date: ${formatDateToIndian(app.created_at)}`;
                    const link = role === 1 ? `/vol-details/${app.volunteer_id}` : ``;
                    return (
                        <div
                            key={app.id}
                            onClick={() => onJourneyClick(app)}
                            className="min-w-[160px] md:min-w-[200px] rounded-[10px] shadow-[0_4px_4.2px_rgba(0,0,0,0.25)] p-2 cursor-pointer hover:shadow-md transition"
                        >
                            {!isProfilePage && (
                                <Link >
                                    <h3 className="text-xs font-semibold truncate">{name}</h3>
                                    <p className="text-[11px] text-gray-600 truncate">{desc}</p>
                                    <p className="text-[10px] text-gray-400">{date}</p>
                                    <span className={`text-[10px] ${color}`}>{label}</span>
                                </Link>
                            )}
                            {isProfilePage && (
                                <>
                                    <p className="text-[11px] text-gray-600">{app?.desc}</p>
                                    <h3 className="text-xs font-medium truncate">{app?.title}</h3>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentApplications;


