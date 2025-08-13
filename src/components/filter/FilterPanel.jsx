import React, { useEffect } from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";

const FilterPanel = ({
    title,
    options,
    selected,
    setSelected,
    onClose,
    onApply,
    handleSearch
}) => {


    useEffect(() => {
        onApply();
    }, [selected]);

    const toggleSelection = (option) => {
        setSelected(prev => {

            const isSelected = prev.some(item => item.id === option.id);

            if (isSelected) {
                return prev.filter(item => item.id !== option.id);
            } else {
                return [...prev, { id: option.id, label: option.label }];
            }
        });
    };

    const isOptionSelected = (option) => {
        return selected.some(item => item.id === option.id);
    };

    return (
        <div className="animate-fadeIn mt-4">
            <button onClick={onClose} className="absolute top-4">
                <FaArrowRight className="rotate-180" />
            </button>
            <h2 className="ml-2 font-semibold">{title}</h2>
            <div className="max-h-[60vh] overflow-y-auto">
                {options.map((opt) => (
                    <div
                        key={opt.id}
                        className="flex items-center py-3 px-2 border-b border-gray-100 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={() => toggleSelection(opt)}
                    >
                        <div
                            className={`w-4 h-4 border-1 rounded mr-3 flex items-center justify-center 
                ${isOptionSelected(opt)
                                    ? "bg-[#06acff] border-blue-500"
                                    : "border-gray-400"
                                }`}
                        >
                            {isOptionSelected(opt) && <FaCheck className="text-white text-xs" />}
                        </div>
                        <span className="text-xs">{opt.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between gap-4 mt-6 sticky bottom-0 bg-white pt-4 pb-2">
                <button
                    className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    onClick={() => setSelected([])}
                >
                    Clear All
                </button>
                <button
                    className="flex-1 py-3 rounded-lg bg-[#06acff] text-white hover:bg-blue-700 transition"
                    onClick={
                        () => {
                            handleSearch();
                            onClose();
                        }
                    }
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;