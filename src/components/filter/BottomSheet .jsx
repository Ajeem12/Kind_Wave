import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa";
import FilterPanel from "./FilterPanel";
import RegionPanel from "./RegionPanel";

const BottomSheet = ({ isOpen, onClose, selectedFilters, setSelectedFilters }) => {
    const [showOrgSelect, setShowOrgSelect] = useState(false);
    const [selectedOrgs, setSelectedOrgs] = useState([]);
    const [showOrgTypeSelect, setShowOrgTypeSelect] = useState(false);
    const [selectedOrgTypes, setSelectedOrgTypes] = useState([]);
    const [showFieldSelect, setShowFieldSelect] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [showCommunitySelect, setShowCommunitySelect] = useState(false);
    const [selectedCommunities, setSelectedCommunities] = useState([]);
    const [showSupportSelect, setShowSupportSelect] = useState(false);
    const [selectedSupports, setSelectedSupports] = useState([]);
    const [showRegionSelect, setShowRegionSelect] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [regionSearch, setRegionSearch] = useState("");

    const organizations = [
        "Aasheyein",
        "Arials Foundation",
        "Bemore",
        "Bradys orphan",
        "Cosmod Club",
        "Cosmod Divas Raipur",
        "khwabh",
        "lets smile together",
        "MICA's Mission",
    ];

    const orgnizationType = [
        "Community-Based Organizations (CBOs)",
        "Corporate Social Responsibility (CSR)",
        "Government Welfare Agencies",
        "Fundraisers",
        "Hybrid Models",
        "International Aid",
        "Mutual Aid Networks",
        "Non-Governmental Organizations (NGO)",
        "Nonprofits & Charities",
    ];

    const fieldOptions = [
        "Art",
        "Education/Teaching",
        "Food",
        "Housing/Sheltar",
        "Legal Aid",
        "Medical/HealthCare",
        "Mental Health",
    ];

    const communityOptions = [
        "Children",
        "Differently-abled",
        "Elderly",
        "Migrants & Refugees",
        "Orphans",
        "Veterans",
        "Women",
    ];

    const supportOptions = ["Donation", "Volunteer"];

    const countryCityData = {
        India: ["Delhi", "Mumbai", "Bangalore", "Chennai"],
        USA: ["New York", "Los Angeles", "Chicago", "Houston"],
        UK: ["London", "Manchester", "Liverpool"],
    };


    const countryOptions = Object.keys(countryCityData).map((country) => ({
        value: country,
        label: country,
    }));

    const filteredCountryOptions = countryOptions.filter(option =>
        option.label.toLowerCase().includes(regionSearch.toLowerCase())
    );

    const cityOptions =
        selectedCountry && countryCityData[selectedCountry.value]
            ? countryCityData[selectedCountry.value].map(city => ({
                value: city,
                label: city,
            }))
            : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 modal-overlay z-40"
                        onClick={onClose}
                    />

                    {/* Bottom Sheet Panel */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 w-full md:w-[50%] bg-white rounded-t-2xl shadow-xl z-70 p-4 px-6 md:left-[25%] max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}

                    >
                        {showOrgSelect || showOrgTypeSelect || showFieldSelect || showCommunitySelect || showSupportSelect || showRegionSelect ? (
                            <>
                                {/* Close Icon */}
                                < div className="flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="text-black"
                                    >
                                        <RxCross2 size={24} />
                                    </button>
                                </div>
                            </>) : null}

                        {/* Main Content */}
                        {!showOrgSelect && !showOrgTypeSelect && !showFieldSelect && !showCommunitySelect && !showSupportSelect && !showRegionSelect ? (
                            <>
                                {/* Title */}
                                <div className="flex  justify-between mb-5">
                                    <h2 className="text-lg font-normal">Sort & Filter</h2>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={onClose}
                                            className="text-black"
                                        >
                                            <RxCross2 size={24} />
                                        </button>
                                    </div>
                                </div>
                                {/* Sort Dropdown */}
                                <div className="mb-2">
                                    <select className="w-full p-3 border border-gray-300 rounded-lg outline-none cursor-pointer text-xs">
                                        <option disabled selected className="text-gray-400">Sort by</option>
                                        <option value="az">Alphabetical (A-Z)</option>
                                        <option value="date">Date</option>
                                        <option value="name">Name</option>
                                    </select>
                                </div>


                                {/* Filter Options */}
                                <ul className="mb-6">
                                    {[
                                        "Region",
                                        "Organisations",
                                        "Organisation Type",
                                        "Field",
                                        "Communities",
                                        "Support",
                                    ].map((label) => (
                                        <li
                                            key={label}
                                            className="flex justify-between items-center border-b border-gray-300 py-3 hover:bg-gray-50 px-2 cursor-pointer"
                                            onClick={() => {
                                                if (label === "Region") setShowRegionSelect(true);
                                                if (label === "Organisations") setShowOrgSelect(true);
                                                if (label === "Organisation Type")
                                                    setShowOrgTypeSelect(true);
                                                if (label === "Field") setShowFieldSelect(true);
                                                if (label === "Communities")
                                                    setShowCommunitySelect(true);
                                                if (label === "Support") setShowSupportSelect(true);
                                            }}
                                        >
                                            <span className="text-xs">{label}</span>
                                            <div className="text-gray-400">
                                                <FaArrowRight />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Footer Buttons */}
                                <div className="flex justify-between gap-4 mt-6 sticky bottom-0 bg-white pt-4 pb-2">
                                    <button
                                        className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                        onClick={() => {
                                            setSelectedOrgs([]);
                                        }}
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        className="flex-1 py-3 rounded-lg bg-[#06acff] text-white hover:bg-blue-700 transition"
                                        onClick={onClose}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </>
                        ) : null}

                        {showOrgSelect && (
                            <FilterPanel
                                title="Organisation"
                                options={organizations}
                                selected={selectedOrgs}
                                setSelected={setSelectedOrgs}
                                onClose={() => setShowOrgSelect(false)}
                                onApply={() => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        orgs: selectedOrgs,
                                    }));
                                    setShowOrgSelect(false);
                                }}
                            />
                        )}

                        {showOrgTypeSelect && (
                            <FilterPanel
                                title="Organisation Type"
                                options={orgnizationType}
                                selected={selectedOrgTypes}
                                setSelected={setSelectedOrgTypes}
                                onClose={() => setShowOrgTypeSelect(false)}
                                onApply={() => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        orgTypes: selectedOrgTypes,
                                    }));
                                    setShowOrgTypeSelect(false);
                                }}
                            />
                        )}

                        {showFieldSelect && (
                            <FilterPanel
                                title="Fields"
                                options={fieldOptions}
                                selected={selectedFields}
                                setSelected={setSelectedFields}
                                onClose={() => setShowFieldSelect(false)}
                                onApply={() => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        fields: selectedFields,
                                    }));
                                    setShowFieldSelect(false);
                                }}
                            />
                        )}
                        {showCommunitySelect && (
                            <FilterPanel
                                title="Communities"
                                options={communityOptions}
                                selected={selectedCommunities}
                                setSelected={setSelectedCommunities}
                                onClose={() => setShowCommunitySelect(false)}
                                onApply={() => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        communities: selectedCommunities,
                                    }));
                                    setShowCommunitySelect(false);
                                }}
                            />
                        )}

                        {showSupportSelect && (
                            <FilterPanel
                                title="Support"
                                options={supportOptions}
                                selected={selectedSupports}
                                setSelected={setSelectedSupports}
                                onClose={() => setShowSupportSelect(false)}
                                onApply={() => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        supports: selectedSupports,
                                    }));
                                    setShowSupportSelect(false);
                                }}
                            />
                        )}
                        {showRegionSelect && (
                            <RegionPanel
                                filteredCountryOptions={filteredCountryOptions}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                                cityOptions={cityOptions}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                onClose={() => setShowRegionSelect(false)}
                                onApply={() => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        region: selectedCity ? selectedCity.label : null,
                                    }));
                                    setShowRegionSelect(false);
                                }}
                                regionSearch={regionSearch}
                                setRegionSearch={setRegionSearch}
                            />
                        )}
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
};

export default BottomSheet;
