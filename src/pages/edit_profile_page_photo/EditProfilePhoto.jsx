import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Check, User } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { updateProfilePic } from "../../api/volUpdatePPApi";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';

const EditProfilePhoto = () => {
    const location = useLocation();
    const userData = location.state?.userData;
    console.log("UserData", userData);

    const [photo, setPhoto] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    const token = useOrgAuthStore((state) => state.orgUser?.token);
    const [selectedFile, setSelectedFile] = useState(null);
    const imgUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        if (userData?.profile_photo) {
            setPhoto(`${imgUrl}/volunteer/${userData?.profile_photo}`);
        }
    }, [userData]);

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => updateProfilePic(formData, token),
        onSuccess: () => {
            swal('Success', 'Profile picture updated successfully!', 'success');
            setIsEditing(false);
        },
        onError: (error) => {
            swal('Error', error.message || 'Failed to update profile picture', 'error');
        }
    });

    const defaultAvatar = (
        <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-20 h-20 text-gray-400" />
        </div>
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(reader.result);
                setIsEditing(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!selectedFile) {
            swal('Error', 'Please select a file first', 'error');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);
        mutate(formData);
    };

    const handleCancel = () => {
        setPhoto(null);
        setSelectedFile(null);
        setIsEditing(false);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className=" p-6 ">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile Photo</h2>

            <div className="flex flex-col items-center">
                {/* Photo Preview */}
                <div className="relative mb-6">
                    {photo ? (
                        <img
                            src={photo}
                            alt="Profile preview"
                            className="w-40 h-40 rounded-full object-cover border-2 border-gray-200"
                        />
                    ) : (
                        defaultAvatar
                    )}
                </div>

                {/* Action Buttons */}
                {!isEditing ? (
                    <div className="flex gap-3">
                        <button
                            onClick={triggerFileInput}
                            className="flex items-center gap-2 px-4 py-2 bg-[#06acff] text-white rounded-lg hover:bg-[#0595e0] transition-colors"
                            disabled={isLoading}
                        >
                            <Upload size={18} />
                            {isLoading ? 'Uploading...' : 'Upload Photo'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                <>
                                    <Check size={18} />
                                    Save
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            disabled={isLoading}
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Help Text */}
            <p className="mt-6 text-sm text-gray-500 text-center">
                {photo ?
                    "Your new profile photo will be visible to other users" :
                    "Upload a photo to personalize your profile"
                }
            </p>
        </div>
    );
};

export default EditProfilePhoto;