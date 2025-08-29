import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProfilePic } from "../../api/volUpdatePPApi";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { useLocation } from "react-router-dom";
import { FaCamera, FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa";
import swal from "sweetalert";

const EditProfilePhoto = () => {
    const location = useLocation();
    const userData = location.state?.userData;
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const userId = userData?.id;
    const imgUrl = import.meta.env.VITE_MEDIA_URL;

    const mutation = useMutation({
        mutationFn: (formData) => updateProfilePic(formData, token),
        onSuccess: () => {
            setPreviewUrl(null);
            swal("Profile picture updated successfully!");
        },
        onError: (err) => alert("Failed to update profile picture: " + err.message),
    });

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            swal("Only JPG, PNG, WEBP images are allowed");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            swal("File must be smaller than 5MB");
            return;
        }

        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleUpload = () => {
        if (!previewUrl) return;

        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files[0]) return;

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("id", userId);

        mutation.mutate(formData);
    };

    const handleCancel = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleChoosePhoto = () => {
        fileInputRef.current?.click();
    };

    return (

        <div className=" mt-10">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Profile Picture</h1>
                <p className="text-gray-600">Choose a new photo for your profile</p>
            </div>

            {/* Profile Photo Preview */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <img
                        src={previewUrl || (userData?.profile_photo ? `${imgUrl}/volunteer/${userData.profile_photo}` : "/default-avatar.png")}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                    />
                    <button
                        onClick={handleChoosePhoto}
                        className="absolute bottom-0 right-0 bg-[#00acff] text-white p-3 rounded-full shadow-md"
                    >
                        <FaCamera className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* File info */}
            {previewUrl && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
                    <p className="text-sm text-[#00acff] font-medium">
                        New photo selected
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        Click Upload to save changes
                    </p>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
                {!previewUrl ? (
                    <button
                        onClick={handleChoosePhoto}
                        className="px-6 py-3 bg-[#00acff] shadow-[0_2px_4px_rgba(0,0,0,0.25)] text-white rounded-lg 0 transition-colors font-medium"
                    >
                        Choose Photo
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleUpload}
                            disabled={mutation.isPending}
                            className="px-6 py-3 bg-[#00acff] shadow-[0_2px_4px_rgba(0,0,0,0.25)] text-white rounded-[10px]  font-medium flex items-center gap-2"
                        >
                            {mutation.isPending ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Upload'
                            )}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-6 py-3  text-gray-700 rounded-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.25)] font-medium flex items-center gap-2"
                        >
                            <FaTimes />
                            Cancel
                        </button>
                    </>
                )}
            </div>

            {/* Status messages */}
            {mutation.isSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center flex items-center justify-center gap-2">
                    <FaCheckCircle />
                    Profile picture updated successfully!
                </div>
            )}

            {mutation.isError && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                    Error: {mutation.error.message}
                </div>
            )}
        </div>

    );
};

export default EditProfilePhoto;