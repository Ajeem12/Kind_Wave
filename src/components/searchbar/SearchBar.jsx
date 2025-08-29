
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaFilter } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';
import BottomSheet from '../filter/BottomSheet ';
import useOrgAuthStore from '../../store/useOrgAuthStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ onSearchResults }) => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const [selectedFilters, setSelectedFilters] = useState({
        orgs: [],
        orgTypes: [],
        fields: [],
        communities: [],
        supports: [],
        region: null,
    });



    const tags = [
        ...selectedFilters.orgs,
        ...selectedFilters.orgTypes,
        ...selectedFilters.fields,
        ...selectedFilters.communities,
        ...selectedFilters.supports,
        selectedFilters.region || null
    ].filter(Boolean);





    const removeTag = (tagToRemove) => {
        console.error("Removing tag:", tagToRemove);
        setSelectedFilters(prev => {
            const isObject = typeof tagToRemove === 'object';

            const shouldKeep = (tag) => {
                if (isObject) {
                    return tag.id !== tagToRemove.id;
                }
                return tag !== tagToRemove;
            };

            return {
                ...prev,
                orgs: prev.orgs.filter(shouldKeep),
                orgTypes: prev.orgTypes.filter(shouldKeep),
                fields: prev.fields.filter(shouldKeep),
                communities: prev.communities.filter(shouldKeep),
                supports: prev.supports.filter(shouldKeep),
                region: (isObject
                    ? (prev.region?.id !== tagToRemove.id)
                    : (prev.region !== tagToRemove))
                    ? prev.region
                    : null
            };
        });
    };

    const handleSearch = async () => {
        try {
            const queryParams = {};

            if (searchText) queryParams.query = searchText;

            if (selectedFilters.orgs.length > 0) {
                queryParams.organization = selectedFilters.orgs.map(org => org.id || org).join(",");
            }

            if (selectedFilters.orgTypes.length > 0) {
                queryParams.orgtype = selectedFilters.orgTypes.map(type => type.id || type).join(",");
            }

            if (selectedFilters.fields.length > 0) {
                queryParams.field = selectedFilters.fields.map(field => field.id || field).join(",");
            }

            if (selectedFilters.communities.length > 0) {
                queryParams.communities = selectedFilters.communities.map(community => community.id || community).join(",");
            }

            if (selectedFilters.supports.length > 0) {
                queryParams.support = selectedFilters.supports.map(support => support.id || support).join(",");
            }

            if (selectedFilters.region) {
                queryParams.region = selectedFilters.region.id || selectedFilters.region;
            }

            const response = await axios.get(`${import.meta.env.VITE_API_URL}filter_serach_event`, {
                params: queryParams,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            onSearchResults(response.data);
            navigate('/');

        } catch (error) {
            console.error("Search error:", error);
        }
    };


    return (
        <>
            <div className="sticky top-15 md:top-[76px] z-10 px-6 p-2 bg-white/90 backdrop-blur-sm  shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                {/* Search Input */}
                <div className="relative flex items-center text-sm">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search for events, and organizations."
                        className="w-full py-3 pl-10 pr-12 bg-white border-[0.5px] border-gray-400 rounded-[10px] outline-none "
                    />
                    <FiSearch onClick={handleSearch} className="absolute left-3 text-gray-500" size={20} />
                    <button
                        className="absolute right-3  text-[#8b8686]"
                        onClick={() => setIsFilterOpen(true)}
                        aria-label="Filter options"
                    >
                        <FaFilter size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => {
                        const isObject = typeof tag === 'object';
                        const tagText = isObject ? tag.label : tag;
                        return (
                            <span
                                // key={tagKey}
                                className="px-3 py-1 text-[8px] rounded-[15px] border border-gray-200/50 flex items-center gap-1 backdrop-blur-sm"
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        removeTag(tag);
                                    }}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <RxCross2 size={14} />
                                </button>
                                {tagText}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Filter BottomSheet */}
            <BottomSheet
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                handleSearch={handleSearch}
            />
        </>
    );
};

export default SearchBar;


