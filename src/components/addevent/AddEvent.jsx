import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getStackHolderCom } from "../../api/stackHolderCommunityApi.js";
import { getFieldType } from "../../api/getFieldTypeApi.js"
import { getProgramRole } from "../../api/getProgramRoleApi.js";
import { useMutation } from "@tanstack/react-query";
import { addEvent } from "../../api/addEventByOrgApi.js";
import { editEvent } from "../../api/EditEvent.js"
import useOrgAuthStore from "../../store/useOrgAuthStore"
import MultiSelect from '../multiselect/MultiSelect.jsx';




const useProgramRole = () => {
    return useQuery({
        queryKey: ['programRole'],
        queryFn: getProgramRole,
    });
};

const useFieldType = () => {
    return useQuery({
        queryKey: ['fieldType'],
        queryFn: getFieldType,
    });
};
const useStackHolderCom = () => {
    return useQuery({
        queryKey: ['stackHolderCom'],
        queryFn: getStackHolderCom,
    });
};

const AddEvent = ({ onFormClose, eventToEdit }) => {
    const { data, isLoading, isError, error } = useStackHolderCom();
    const { data: fieldTypeData, } = useFieldType();
    const { data: programRoleData, } = useProgramRole();
    const programRole = programRoleData?.data;
    const fieldType = fieldTypeData?.data;
    const stackHolderCom = data?.data;


    const [formData, setFormData] = useState({
        title: eventToEdit?.title || '',
        short_desc: eventToEdit?.short_desc || '',
        long_desc: eventToEdit?.long_desc || '',
        from_date: eventToEdit?.from_date || '',
        to_date: eventToEdit?.to_date || '',
        image: eventToEdit?.image || null,
        status: eventToEdit?.status || '',
        purpose: eventToEdit?.purpose || '',
        impact: eventToEdit?.impact || '',
        stack_holders: eventToEdit?.stack_holders || [],
        program: eventToEdit?.program || [],
        time: eventToEdit?.time || '',
        address: eventToEdit?.address || '',
        role: eventToEdit?.role || [],
    });

    const token = useOrgAuthStore((state) => state.orgUser?.token);


    const mutation = useMutation({
        mutationFn: (formData) => {
            const formDataToSend = new FormData();
            console.log('identityProof:', formData.identityProof);
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (value instanceof File) {
                        formDataToSend.append(key, value, value.name);
                    } else {
                        formDataToSend.append(key, value);
                    }
                }
            });
            if (eventToEdit) {
                return editEvent(eventToEdit.id, formDataToSend, token);
            } else {
                return addEvent(formDataToSend, token);
            }

        },
        onSuccess: () => {
            onFormClose();
            alert(eventToEdit ? 'Event updated successfully' : 'Event added successfully');

        },
        onError: (error) => {
            console.error('Submission error:', error);
            alert(error.message || 'Failed to submit application');
        }

    })

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setFormData(prev => ({
                ...prev,
                [name]: selectedOptions
            }));
        } else if (files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center modal-overlay px-4 sm:px-8">
            <div className="bg-white w-full max-w-4xl rounded-xl p-6 relative mx-auto max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onFormClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <RxCross1 size={18} />
                </button>

                {/* Title */}
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Event</h2>
                    <p className="text-xs text-gray-500">ROOTS & REACH</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter event title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                            <input
                                type="text"
                                name="short_desc"
                                value={formData.short_desc}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief description"
                                required
                            />
                        </div>
                    </div>

                    {/* Long Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Long Description *</label>
                        <textarea
                            name="long_desc"
                            value={formData.long_desc}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Detailed description"
                            required
                        ></textarea>
                    </div>

                    {/* Row 2 - Date Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From Date *</label>
                            <input
                                type="date"
                                name="from_date"
                                value={formData.from_date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To Date *</label>
                            <input
                                type="date"
                                name="to_date"
                                value={formData.to_date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image *</label>
                        <div className="relative">
                            <input
                                type="file"
                                name="image"
                                id="event-image"
                                onChange={handleChange}
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            <label
                                htmlFor="event-image"
                                className="border border-gray-300 rounded-lg py-2 px-3 outline-none text-gray-500 flex items-center gap-2 hover:border-gray-400 transition-colors"
                            >
                                <FontAwesomeIcon icon={faFileArrowUp} className="text-gray-400" />
                                <span>
                                    {formData.image ? formData.image.name : "Upload Event Image"}
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >{ }
                                <option value="">Select Status</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose *</label>
                            <input
                                type="text"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Event purpose"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Impact *</label>
                            <input
                                type="text"
                                name="impact"
                                value={formData.impact}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Impact"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MultiSelect
                            name="stack_holders"
                            label="Stakeholders"
                            options={stackHolderCom}
                            selectedValues={formData.stack_holders}
                            onChange={handleChange}
                            placeholder="Select stakeholders"
                        />
                        <MultiSelect
                            name="program"
                            label="Program"
                            options={fieldType}
                            selectedValues={formData.program}
                            onChange={handleChange}
                            placeholder="Select programs"
                        />

                    </div>

                    {/* Row 5 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Event address"
                                required
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <MultiSelect
                            name="role"
                            label="Role"
                            options={programRole}
                            selectedValues={formData.role}
                            onChange={handleChange}
                            placeholder="Select roles"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onFormClose}
                            className="bg-gray-200 w-1/3 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#06acff] w-2/3 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {eventToEdit ? "Edit Event" : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;