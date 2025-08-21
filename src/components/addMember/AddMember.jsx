import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addMember, editMember } from '../../api/addMemberApi';
import { FaCamera, FaUser } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import useOrgAuthStore from "../../store/useOrgAuthStore";
import swal from 'sweetalert';

const AddMember = ({ onMemberClose, memberToEdit }) => {
    const [formData, setFormData] = useState({
        profile_photo: null,
        name: memberToEdit?.name || '',
        previewImage: memberToEdit?.profile_photo || null
    });

    const fileInputRef = useRef(null);
    const token = useOrgAuthStore((state) => state.orgUser?.token);

    const mutation = useMutation({
        mutationFn: (formData) => {
            const memberData = new FormData();
            memberData.append('name', formData.name);
            if (formData.profile_photo) {
                memberData.append('profile_photo', formData.profile_photo);
            }
            if (memberToEdit) {
                return editMember(memberToEdit.id, memberData, token);
            } else {
                return addMember(memberData, token);
            }
        },
        onSuccess: () => {
            onJournyClose();
            swal(memberToEdit ? 'Member updated successfully' : 'Member added successfully');
        },
        onError: (error) => {
            console.error('Submission error:', error);
            swal(error.message || 'Failed to add member');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profile_photo: file,
                previewImage: URL.createObjectURL(file)
            }));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4 ">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {memberToEdit ? 'Edit Member' : 'Add New Member'}
                    </h2>
                    <button
                        onClick={onMemberClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                        aria-label="Close"
                    >
                        <RxCross1 size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        {/* Profile Photo Upload */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                {formData.previewImage ? (
                                    <img
                                        src={formData.previewImage}
                                        alt="Profile preview"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-gray-200 flex items-center justify-center">
                                        <FaUser className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                                >
                                    <FaCamera size={16} />
                                </button>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Click camera icon to upload photo
                            </p>
                        </div>

                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="Enter member's full name"
                            />
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onMemberClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-[#00ACFF] rounded-[10px] text-white  shadow-[0_2px_4px_rgba(0,0,0,0.25)] px-5 "
                        >
                            {mutation.isPending
                                ? 'Processing...'
                                : memberToEdit ? 'Update Member' : 'Add Member'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMember;