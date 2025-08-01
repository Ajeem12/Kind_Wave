
import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import BottomSheet from '../filter/BottomSheet ';

const SearchBar = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
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
        selectedFilters.region ? [selectedFilters.region] : [],
    ].flat();


    const removeTag = (tag) => {
        setSelectedFilters(prev => ({
            ...prev,
            orgs: prev.orgs.filter(t => t !== tag),
            orgTypes: prev.orgTypes.filter(t => t !== tag),
            fields: prev.fields.filter(t => t !== tag),
            communities: prev.communities.filter(t => t !== tag),
            supports: prev.supports.filter(t => t !== tag),
            region: prev.region === tag ? null : prev.region,
        }));
    };


    return (
        <>
            <div className="sticky top-15 md:top-[76px] z-10 px-6 p-4 bg-white/90 backdrop-blur-sm  border-b border-gray-300 drop-shadow-sm">
                {/* Search Input */}
                <div className="relative flex items-center text-sm">
                    <input
                        type="text"
                        placeholder="Search for events, and organizations."
                        className="w-full py-3 pl-10 pr-12 text-gray-700 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 text-gray-500" size={20} />
                    <button
                        className="absolute right-3  text-gray-500 hover:text-gray-700"
                        onClick={() => setIsFilterOpen(true)}
                        aria-label="Filter options"
                    >
                        <FiFilter size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-[8px] text-gray-700 bg-gray-50/30 rounded-full border border-gray-200/50 flex items-center gap-1 backdrop-blur-sm"
                        >
                            <button onClick={() => removeTag(tag)}>
                                <RxCross2 size={14} />
                            </button>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Filter BottomSheet */}
            <BottomSheet
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
        </>
    );
};

export default SearchBar;
