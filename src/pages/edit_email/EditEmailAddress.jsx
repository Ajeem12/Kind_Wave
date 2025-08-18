import React, { useState } from 'react';
import { Mail, Edit, Check, X } from 'lucide-react';

const EditEmailAddress = () => {
    const [email, setEmail] = useState('user@example.com');
    const [isEditing, setIsEditing] = useState(false);
    const [tempEmail, setTempEmail] = useState(email);
    const [emailError, setEmailError] = useState('');

    const handleEditClick = () => {
        setTempEmail(email);
        setIsEditing(true);
        setEmailError('');
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSave = () => {
        if (!validateEmail(tempEmail)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setEmail(tempEmail);
        setIsEditing(false);
        alert('Email updated successfully!');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEmailError('');
    };

    const handleChange = (e) => {
        setTempEmail(e.target.value);
        if (emailError) setEmailError('');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Email Address</h2>

            <div className="flex flex-col items-center">
                {/* Email Display/Edit */}
                <div className="relative mb-6 w-full">
                    {!isEditing ? (
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <Mail className="w-6 h-6 text-gray-400" />
                            </div>
                            <span className="text-lg font-medium">{email}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full">
                            <input
                                type="email"
                                value={tempEmail}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm mt-2 w-full text-left">
                                    {emailError}
                                </p>
                            )}
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
                        Change Email
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            disabled={!tempEmail}
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
                    ? "Enter your new email address"
                    : "This email will be used for account notifications"}
            </p>
        </div>
    );
};

export default EditEmailAddress;