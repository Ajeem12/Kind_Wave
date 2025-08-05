import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import Select from "react-select";

const RegionPanel = ({
    filteredCountryOptions,
    selectedCountry,
    setSelectedCountry,
    cityOptions,
    selectedCity,
    setSelectedCity,
    onClose,
    onApply,
    setRegionSearch,
}) => {
    const bottomRef = useRef(null);

    // Scroll to bottom when input/select is focused
    const handleFocus = () => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 200);
    };


    return (
        <div className="animate-fadeIn mt-4 ">
            <button onClick={onClose} className="absolute top-4">
                <FaArrowRight className="rotate-180" />
            </button>
            <h2 className="ml-2 font-semibold mb-4"> Region</h2>

            <Select
                options={filteredCountryOptions}
                value={selectedCountry}
                onChange={option => {
                    setSelectedCountry(option);
                    setSelectedCity(null);
                }}
                placeholder="Select Country"
                className="mb-3"
                isClearable
                onFocus={handleFocus}
            />
            <Select
                options={cityOptions}
                value={selectedCity}
                onChange={option => setSelectedCity(option)}
                placeholder="Select City"
                className="mb-3"
                isDisabled={!selectedCountry}
                isClearable
                onFocus={handleFocus}
            />
            <div className="flex justify-between gap-4 mt-6 sticky bottom-0 bg-white pt-4 pb-2">
                <button
                    className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    onClick={() => {
                        setSelectedCountry(null);
                        setSelectedCity(null);
                        setRegionSearch("");
                    }}
                >
                    Clear All
                </button>
                <button
                    className="flex-1 py-3 rounded-lg bg-[#06acff] text-white hover:bg-blue-700 transition"
                    onClick={onApply}
                    disabled={!selectedCountry || !selectedCity}
                >
                    Apply
                </button>
            </div>
            <div ref={bottomRef} />
        </div>
    )
};

export default RegionPanel;