
import React, { useState } from 'react';
import useScreenSize from '../../utils/useScreenSize';
import BottomSheet from '../../components/filter/BottomSheet ';
import RecentApplications from '../../components/recentapplications/RecentApplications';
import AllApplications from '../../components/allapplication/AllApplications';

const Application = () => {
    const [showAll, setShowAll] = useState(false);
    const screenWidth = useScreenSize();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    let itemsToShow = 2;
    if (screenWidth > 768) itemsToShow = 6;
    if (screenWidth > 1024) itemsToShow = 7;

    const recentApplications = [
        { id: 1, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Draft', statusColor: 'text-gray-800' },
        { id: 2, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Submitted', statusColor: 'text-blue-800' },
        { id: 3, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Draft', statusColor: 'text-gray-800' },
        { id: 4, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Submitted', statusColor: 'text-blue-800' },
    ];

    const allApplications = [
        { id: 1, title: 'LITTLE HELPERS', organization: 'Roots & Reach', date: '01-05-25 - 01-05-25', status: 'Pending', statusColor: 'text-yellow-600' },
        { id: 2, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Rejected', statusColor: 'text-red-800' },
        { id: 3, title: 'LITTLE HELPERS', organization: 'Roots & Reach', date: '01-05-25 - 01-05-25', status: 'Accepted', statusColor: 'text-green-800' },
        { id: 4, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Rejected', statusColor: 'text-red-800' },
        { id: 5, title: 'LITTLE HELPERS', organization: 'Roots & Reach', date: '01-05-25 - 01-05-25', status: 'Accepted', statusColor: 'text-green-800' },
        { id: 6, title: 'LITTLE HELPERS', organization: 'Cosmos Divas Rotary Club', date: '01-05-25 - 01-05-25', status: 'Rejected', statusColor: 'text-red-800' },
    ];

    const displayedApplications = showAll ? allApplications : allApplications.slice(0, itemsToShow);

    return (
        <>
            <div className="py-4 p-6 max-w-6xl mx-auto mb-20">
                <div className="flex justify-center items-center mb-3">
                    <h1 className="text-lg font-bold">APPLICATIONS</h1>
                </div>
                <>
                    <h2 className="text-base font-semibold mb-2">Recent</h2>
                    <RecentApplications data={recentApplications} />
                </>

                <AllApplications
                    data={displayedApplications}
                    showAll={showAll}
                    setShowAll={setShowAll}
                    setIsFilterOpen={setIsFilterOpen}
                />
            </div>

            <BottomSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </>
    );
};

export default Application;
