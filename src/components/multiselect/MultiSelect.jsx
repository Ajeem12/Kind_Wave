import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Custom MultiSelect Component
const MultiSelect = ({
    options,
    selectedValues,
    onChange,
    name,
    label,
    placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (value) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange({
            target: {
                name,
                value: newValues
            }
        });
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} *
            </label>
            <div
                className="border border-gray-300 rounded-lg py-2 px-3 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">
                    {selectedValues.length > 0
                        ? `${selectedValues.length} selected`
                        : placeholder}
                </span>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options?.map((option) => (
                        <div
                            key={option.id}
                            className="px-4 py-2 hover:bg-gray-100 flex items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleOption(option.id);
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option.id)}
                                readOnly
                                className="mr-2 h-4 w-4 text-blue-600 rounded"
                            />
                            <span>{option.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;