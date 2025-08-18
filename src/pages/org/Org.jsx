import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { addToWhishCart, getWhishCart } from "../../api/addToWhishCartApi"
import { getOrgList } from "../../api/orgListApi"
import useOrgAuthStore from '../../store/useOrgAuthStore';

const Org = () => {
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchResults = (results) => {
        setSearchResults(results);
    };
    const location = useLocation()
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const role = useOrgAuthStore((state) => state.orgUser?.role);

    const useGetOrgList = (token) => {
        return useQuery({
            queryKey: ["orgList", token],
            queryFn: () => getOrgList(token),
            enabled: !!token,
        });
    }

    const useGetWhishCart = (token) => {
        return useQuery({
            queryKey: ["whishCart", token],
            queryFn: () => getWhishCart(token),
            enabled: !!token,
        });
    }
    const { data: whishCartData, isLoading: whishCartLoading, error: whishCartError } = useGetWhishCart(token);
    const whishCartList = whishCartData?.data?.org || [];

    const isOrgInWishlist = (orgId) => {
        return whishCartList?.some(item => item.organization_id === orgId);
    };

    const { data, isLoading, error } = useGetOrgList(token);
    const orgList = data?.data || [];
    const imgurl = import.meta.env.VITE_MEDIA_URL;

    const [likedStates, setLikedStates] = useState({});

    useEffect(() => {
        const updatedStates = {};
        whishCartList?.forEach(item => {
            updatedStates[item.organization_id] = true;
        });
        setLikedStates(updatedStates);
    }, [whishCartList]);

    const addToWishlistMutation = useMutation({
        mutationFn: (whish_cart_id) => addToWhishCart({ whish_cart_id, type: 0 }, token),
        onSuccess: () => {
            console.log("Successfully added to wishlist");
        },
        onError: (error) => {
            console.error("Error adding to wishlist:", error);
        }
    });


    const handleLike = (e, org) => {
        e.preventDefault();
        e.stopPropagation();
        if (role === 1) return;

        if (isOrgInWishlist(org.id)) {
            console.log("Organization is already in wishlist");
            return;
        }
        addToWishlistMutation.mutate(org.id);

        setLikedStates(prev => ({
            ...prev,
            [org.id]: !prev[org.id]
        }));
    };

    return (
        <>
            {location.pathname === "/wishlist" ? null : <SearchBar onSearchResults={handleSearchResults} />}

            <div className="p-6 max-w-6xl mx-auto mb-20 ">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {orgList.map((org, index) => (
                        <div key={index}>
                            {role === 2 ? (
                                <Link to="/org-details">
                                    <div
                                        className={`relative p-4 rounded-lg flex flex-col items-center justify-center 
                  hover:bg-gray-50 transition-colors duration-200 h-[150px] w-[100%]
                  ${index % 2 === 0
                                                ? "shadow-[2px_2px_4px_rgba(0,0,0,0.1)] "
                                                : "shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]"}`}
                                    >
                                        <div className="h-40 w-44 md:h-40 mb-2 flex items-center justify-center">
                                            <img
                                                src={`${imgurl}/organization/${org?.photo}`}
                                                alt={`${org.organization_name} logo`}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>

                                        <button
                                            onClick={e => handleLike(e, org)}
                                            className="absolute top-2 right-2"
                                        >
                                            <Heart
                                                size={22}
                                                fill={likedStates[org.id] ? "white" : "black"}
                                                fillOpacity={likedStates[org.id] ? 1 : 0.2}
                                                className={likedStates[org.id] ? "text-gray-50" : "text-[#c4c4c4]"}
                                            />
                                        </button>
                                    </div>

                                    <h3 className="text-sm font-medium text-black text-start ml-4 mt-1">
                                        {org?.organization_name}
                                    </h3>
                                    <p className='text-xs text-gray-400 ml-4'>{org?.category_details?.category_name}</p>
                                </Link>
                            ) : (
                                <Link to="/org-details" key={index}>
                                    <div
                                        className={`relative p-4 rounded-lg flex flex-col items-center justify-center 
                  hover:bg-gray-50 transition-colors duration-200 h-[150px] w-[100%]
                  ${index % 2 === 0
                                                ? "shadow-[2px_2px_4px_rgba(0,0,0,0.1)] "
                                                : "shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]"}`}
                                    >
                                        <div className="h-40 w-44 md:h-40 mb-2 flex items-center justify-center">
                                            <img
                                                src={`${imgurl}/organization/${org?.photo}`}
                                                alt={`${org.organization_name} logo`}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>

                                        <button
                                            onClick={e => handleLike(e, org)}
                                            className="absolute top-2 right-2"
                                        >
                                            <Heart
                                                size={22}
                                                fill={likedStates[org.id] ? "white" : "black"}
                                                fillOpacity={likedStates[org.id] ? 1 : 0.2}
                                                className={likedStates[org.id] ? "text-gray-50" : "text-[#c4c4c4]"}
                                            />
                                        </button>
                                    </div>

                                    <h3 className="text-sm font-medium text-black text-start ml-4 mt-1">
                                        {org?.organization_name}
                                    </h3>
                                    <p className='text-xs text-gray-400 ml-4'>{org?.category_details?.category_name}</p>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Org;

