import { Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addToWhishCart, getWhishCart } from "../../api/addToWhishCartApi"
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { useLocation } from "react-router-dom";

const EventCard = ({ id, image, title, organizer, dateRange, description }) => {
    const location = useLocation();
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const role = useOrgAuthStore((state) => state.orgUser?.role);
    const queryClient = useQueryClient();
    const imgurl = import.meta.env.VITE_MEDIA_URL;

    const { data: wishlistData } = useQuery({
        queryKey: ['wishlist', token],
        queryFn: () => getWhishCart(token),
        enabled: !!token,
    });

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const isEventInWishlist = wishlistData?.data?.event?.some(item => item.event_id === id);
        setIsLiked(isEventInWishlist || false);
    }, [wishlistData, id]);

    const addToWishlistMutation = useMutation({
        mutationFn: () => addToWhishCart({ whish_cart_id: id, type: 1 }, token),
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist']);
            setIsLiked(true);
        },
        onError: (error) => {
            console.error("Error adding to wishlist:", error);
        }
    });

    const handleLike = (e) => {
        e.stopPropagation();
        if (role === 1) return;
        if (!isLiked) {
            addToWishlistMutation.mutate();
        }
    };

    const formatDateRange = (range) => {
        if (!range) return "";
        const [start, end] = range.split(" - ");
        const formatDate = (d) =>
            new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `${formatDate(start)} - ${formatDate(end)}`;
    };



    return (
        <div className="bg-white overflow-hidden max-w-sm">
            <div className="relative w-full h-48">
                {/* Top Image */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img
                        src={`${imgurl}/events/${image}`}
                        alt={title}
                        className="w-full h-full object-cover "
                        loading="lazy"
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
            <div className="py-2 space-y-1 p-2">
                {/* Title and Date */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-base uppercase">{title}</h3>
                        <p className="text-sm font-medium">{organizer}</p>
                    </div>

                    <p className="font-semibold text-sm whitespace-nowrap">
                        {formatDateRange(dateRange)}
                    </p>
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