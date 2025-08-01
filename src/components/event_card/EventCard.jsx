import { Heart } from "lucide-react";
import React, { useState } from "react";

const EventCard = ({ image, title, organizer, dateRange, description }) => {
    const [isLiked, setIsLiked] = useState()

    const handleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <div className="bg-white overflow-hidden max-w-sm">
            <div className="relative w-full h-48">
                {/* Top Image */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <button onClick={handleLike} className="absolute top-2 right-2">
                    <Heart
                        size={22}
                        fill={isLiked ? "white" : "black"}
                        fillOpacity={isLiked ? 1 : 0.4}
                        className={isLiked ? "text-white" : "text-[#6d6052]"}
                    />
                </button>

            </div>
            {/* Card Content */}
            <div className="py-2 space-y-1">
                {/* Title and Date */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-sm text-black uppercase">{title}</h3>
                        <p className="text-xs text-gray-600">{organizer}</p>
                    </div>
                    <p className="font-bold text-sm text-black whitespace-nowrap">{dateRange}</p>
                </div>
                {/* Description */}
                <p className="text-xs text-gray-700">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default EventCard;


