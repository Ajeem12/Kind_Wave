import React, { useState } from 'react';
import { updateProfileForOrg } from "../../api/updateProfileForOrgApi";
import { getCounty, getCity } from "../../api/getCountry&CityApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RxCross1 } from 'react-icons/rx';
import Select from 'react-select';
import useOrgAuthStore from '../../store/useOrgAuthStore';
import swal from 'sweetalert';

const UpdateProfile = ({ onFormClose, data }) => {
    const [formData, setFormData] = useState({
        organization_name: data?.organization_name || '',
        address: data?.address || '',
        contact_no: data?.contact_no || '',
        image: null,
        country: data?.country ? { value: data.country.id, label: data.country.name } : null,
        city: data?.city ? { value: data.city.id, label: data.city.name } : null
    });

    const token = useOrgAuthStore((state) => state.orgUser?.token);

    const { data: countryData = { data: [] } } = useQuery({
        queryKey: ['country'],
        queryFn: getCounty
    });

    const countries = countryData.data?.map(country => ({
        value: country.id,
        label: country.name
    })) || [];

    const { data: citiesData = { data: [] }, isLoading: isLoadingCities } = useQuery({
        queryKey: ['cities', formData.country?.value],
        queryFn: () => getCity(formData.country?.value),
        enabled: !!formData.country
    });

    const cities = citiesData.data?.map(city => ({
        value: city.id,
        label: city.name
    })) || [];

    const mutation = useMutation({
        mutationFn: (data) => updateProfileForOrg(data, token),
        onSuccess: () => {
            swal('Profile updated successfully');
            onFormClose();
        },
        onError: (error) => {
            console.error('Update error:', error);
            swal(error.message || 'Failed to update profile');
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
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Send IDs instead of full objects
        const finalData = {
            ...formData,
            country: formData.country?.value,
            city: formData.city?.value,
        };

        Object.entries(finalData).forEach(([key, value]) => {
            if (value) formDataToSend.append(key, value);
        });

        mutation.mutate(formDataToSend);
    };

    return (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Update Organization Profile</h2>
                    <button
                        onClick={onFormClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                        aria-label="Close"
                    >
                        <RxCross1 size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                name="organization_name"
                                value={formData.organization_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter organization name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter address"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                name="contact_no"
                                value={formData.contact_no}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter contact number"
                                required
                            />
                        </div>

                        {/* React Select Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <Select
                                value={formData.country}
                                onChange={(selected) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        country: selected,
                                        city: null
                                    }));
                                }}
                                options={countries}
                                placeholder="Select a country"
                            />
                        </div>

                        {/* React Select City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <Select
                                value={formData.city}
                                onChange={(selected) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        city: selected
                                    }));
                                }}
                                options={cities}
                                isDisabled={!formData.country || isLoadingCities}
                                placeholder={
                                    !formData.country
                                        ? "Select a country first"
                                        : isLoadingCities
                                            ? "Loading cities..."
                                            : "Select a city"
                                }
                            />
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organization Logo
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="mt-2 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onFormClose}
                            className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-70"
                        >
                            {mutation.isPending ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
