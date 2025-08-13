
import React, { useState } from 'react';
import useScreenSize from '../../utils/useScreenSize';
import BottomSheet from '../../components/filter/BottomSheet ';
import RecentApplications from '../../components/recentapplications/RecentApplications';
import AllApplications from '../../components/allapplication/AllApplications';
import { useQuery } from '@tanstack/react-query';
import { getAppliedEventList } from "../../api/applyEventListApi"
import { appliedVolForOrg } from "../../api/appliedVolListForOrgApi"
import useOrgAuthStore from '../../store/useOrgAuthStore';

const Application = () => {
    const [showAll, setShowAll] = useState(false);
    const screenWidth = useScreenSize();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const role = useOrgAuthStore((state) => state.orgUser?.role);



    const useGetAppliedEventList = (token) => {
        return useQuery({
            queryKey: ["appliedEventList", token],
            queryFn: () => getAppliedEventList(token),
            enabled: !!token,
        })
    }

    const useGetAppliedVolForOrg = (token) => {
        return useQuery({
            queryKey: ["appliedVolForOrg", token],
            queryFn: () => appliedVolForOrg(token),
            enabled: !!token && role === 1,
        });
    };

    const { data: volData, isLoading: volLoading, error: volError } = useGetAppliedVolForOrg(token);
    const { data: eventData, isLoading: eventLoading, error: eventError } = useGetAppliedEventList(token);
    const applications = role === 1 ? volData?.data || [] : eventData?.data || [];


    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 7);

    const recentApplications = applications.filter(app => {
        const updatedAt = new Date(app.updated_at);
        return updatedAt >= threeDaysAgo;
    });

    let itemsToShow = 2;
    if (screenWidth > 768) itemsToShow = 6;
    if (screenWidth > 1024) itemsToShow = 7;

    const displayedApplications = showAll ? applications : applications.slice(0, itemsToShow);

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
