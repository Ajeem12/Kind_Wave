import React, { useState } from 'react';
import { User, Edit, Check, X } from 'lucide-react';

const EditProfileName = () => {
    const [name, setName] = useState('John Doe');
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);

    const handleEditClick = () => {
        setTempName(name);
        setIsEditing(true);
    };

    const handleSave = () => {
        setName(tempName);
        setIsEditing(false);
        alert('Name updated successfully!');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setTempName(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile Name</h2>

            <div className="flex flex-col items-center">
                {/* Name Display/Edit */}
                <div className="relative mb-6 w-full">
                    {!isEditing ? (
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                            <span className="text-xl font-medium">{name}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full">
                            <input
                                type="text"
                                value={tempName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                            />
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {!isEditing ? (
                    <button
                        onClick={handleEditClick}
                        className="flex items-center gap-2 px-4 py-2 bg-[#06acff] text-white rounded-lg"
                    >
                        <Edit size={18} />
                        Edit Name
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Check size={18} />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Help Text */}
            <p className="mt-6 text-sm text-gray-500 text-center">
                {isEditing
                    ? "Update your display name"
                    : "This name will be visible to other users"}
            </p>
        </div>
    );
};

export default EditProfileName;