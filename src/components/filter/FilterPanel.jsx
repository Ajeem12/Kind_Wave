import React from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";

const FilterPanel = ({
    title,
    options,
    selected,
    setSelected,
    onClose,
    onApply,
}) => (
    <div className="animate-fadeIn mt-4">
        <button onClick={onClose} className="absolute top-4">
            <FaArrowRight className="rotate-180" />
        </button>
        <h2 className="ml-2 font-semibold">{title}</h2>
        <div className="max-h-[60vh] overflow-y-auto">
            {options.map((opt) => (
                <div
                    key={opt}
                    className="flex items-center py-3 px-2 border-b border-gray-100 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() =>
                        setSelected((prev) =>
                            prev.includes(opt)
                                ? prev.filter((item) => item !== opt)
                                : [...prev, opt]
                        )
                    }
                >
                    <div
                        className={`w-4 h-4 border-1 rounded mr-3 flex items-center justify-center 
              ${selected.includes(opt)
                                ? "bg-[#06acff] border-blue-500"
                                : "border-gray-400"
                            }`}
                    >
                        {selected.includes(opt) && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="text-xs">{opt}</span>
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
                onClick={onApply}
            >
                Apply
            </button>
        </div>
    </div>
);

export default FilterPanel;