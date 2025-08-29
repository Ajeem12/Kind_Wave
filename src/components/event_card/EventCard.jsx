import { Heart } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addToWhishCart, getWhishCart } from "../../api/addToWhishCartApi"
import { removeFromEventWhishCart } from "../../api/removeFromWishCartApi"
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { useLocation } from "react-router-dom";

const EventCard = ({ id, image, title, organizer, dateRange, description, wishId }) => {
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
        if (role === 1) return;
        if (!isLiked) {
            addToWishlistMutation.mutate();
        }
    };

    const removeMutation = useMutation({
        mutationFn: (evtId) => removeFromEventWhishCart(evtId, token),
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist', token]);
            setIsLiked(false);
        },
        onError: (err) => {
            console.error(err);
        }
    });


    const handleRemove = (wishId) => {
        removeMutation.mutate({ evtId: wishId });
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

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isLiked) {
                            handleRemove(wishId);
                        } else {
                            handleLike();
                        }
                    }}
                    className="absolute top-2 right-2"
                >
                    <FontAwesomeIcon
                        icon={faSolidHeart}
                        size="lg"
                        color={isLiked ? "#ffffff" : "rgba(0,0,0,0.3)"}
                        className="drop-shadow-[0_0_1.8px_rgba(0,0,0,0.25)]"
                    />
                </button>

            </div>
            {/* Card Content */}
            <div className="px-2 my-[10px]">
                {/* Title and Date */}
                <div className="flex items-start">
                    {/* Title - 50% width */}
                    <div className="w-1/2 pr-2">
                        <h3
                            className="font-semibold text-[15px] break-words leading-snug"
                            style={{ letterSpacing: "0.5px" }}
                        >
                            {title.charAt(0).toUpperCase() + title.slice(1)}
                        </h3>
                    </div>


                    {/* Date range - 50% width */}
                    <div className="w-1/2 pl-2 text-right">
                        <p className="font-semibold text-[15px] whitespace-nowrap">
                            {formatDateRange(dateRange)}
                        </p>
                    </div>
                </div>
                <p className="text-sm font-medium uppercase" style={{ letterSpacing: "0.5px" }}>{organizer}</p>
                {/* Description */}
                <p className="text-xs text-gray-700">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default EventCard;