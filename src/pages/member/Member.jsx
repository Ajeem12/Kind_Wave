import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { getMemberById } from "../../api/addMemberApi";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AddMember from "../../components/addMember/AddMember";
const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const Member = () => {
    const { id } = useParams();
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["member", id, token],
        queryFn: () => getMemberById(id, token),
        enabled: !!id && !!token,
    });

    const member = data?.data;

    if (isLoading) return <div className="p-6">Loading member details...</div>;
    if (error) return <div className="p-6 text-red-500">Error loading member details.</div>;
    if (!member) return <div className="p-6">Member not found.</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            {/* Header with Edit Button */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Member Details</h1>
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                    <FaEdit />
                    Edit
                </button>
            </div>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={
                        member.profile_photo
                            ? `${import.meta.env.VITE_MEDIA_URL}/members/${member.profile_photo}`
                            : "/default-avatar.png"
                    }
                    alt={member.full_name}
                    className="w-24 h-24 rounded-full object-cover mb-2 border-4 border-gray-200"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                    {member.full_name}
                </h2>
                <p className="text-gray-500">{member.role || "Member"}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Full Name
                    </label>
                    <p className="text-gray-800">{member.full_name}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Joined Date
                    </label>
                    <p className="text-gray-800">{formatDate(member.created_at)}</p>
                </div>
            </div>

            {/* Reuse AddMember as Edit Modal */}
            {isEditModalOpen && (
                <AddMember
                    onMemberClose={() => {
                        setIsEditModalOpen(false);
                        refetch();
                    }}
                    memberToEdit={member}
                />
            )}
        </div>
    );
};

export default Member;

