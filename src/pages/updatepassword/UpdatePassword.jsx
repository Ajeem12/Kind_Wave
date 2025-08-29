

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { changePass } from "../../api/changePassApi";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { useLocation } from 'react-router-dom';

const UpdatePassword = () => {
    const location = useLocation();
    const userData = location.state?.userData;
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = useOrgAuthStore((state) => state.orgUser?.token);

    const mutation = useMutation({
        mutationFn: (data) => changePass(data, token),
        onMutate: () => {
            setErrorMessage('');
            setSuccessMessage('');
        },
        onSuccess: () => {
            setSuccessMessage('Password updated successfully!');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setTimeout(() => setSuccessMessage(''), 5000);
        },
        onError: (error) => {
            setErrorMessage(error.response?.data?.message ||
                error.message ||
                'Failed to update password. Please try again.');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        // Clear messages when user makes changes
        if (successMessage || errorMessage) {
            setSuccessMessage('');
            setErrorMessage('');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = 'Current password is required';
        }
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        } else if (formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = 'New password must be different from current password';
        }
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            mutation.mutate({
                old_password: formData.currentPassword,
                new_password: formData.newPassword,
                new_password_confirmation: formData.confirmPassword,
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 ">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Update Password
            </h2>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {successMessage}
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none  ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                        autoComplete="current-password"
                    />
                    {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none  ${errors.newPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                        autoComplete="new-password"
                    />
                    {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none  ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                        autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={mutation.isLoading}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-[10px]  text-sm font-medium text-white bg-[#00acff] shadow-[0_2px_4px_rgba(0,0,0,0.25)] focus:outline-none ${mutation.isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {mutation.isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </>
                    ) : (
                        'Update Password'
                    )}
                </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Password requirements:</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                        <svg className="flex-shrink-0 h-4 w-4 text-green-500 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Minimum 6 characters
                    </li>
                    <li className="flex items-start">
                        <svg className="flex-shrink-0 h-4 w-4 text-green-500 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Must not match current password
                    </li>
                    <li className="flex items-start">
                        <svg className="flex-shrink-0 h-4 w-4 text-green-500 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        New and confirm passwords must match
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UpdatePassword;