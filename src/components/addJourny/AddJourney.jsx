import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addJourny } from "../../api/addJournyApi";
import { editJourny } from "../../api/editJorneyApi";
import { RxCross1 } from 'react-icons/rx';
import useOrgAuthStore from "../../store/useOrgAuthStore";


const AddJourney = ({ onJournyClose, journeyToEdit }) => {
    const [formData, setFormData] = useState({
        title: journeyToEdit?.title || '',
        description: journeyToEdit?.desc || '',
    });


    const token = useOrgAuthStore((state) => state.orgUser?.token);


    const mutation = useMutation({
        mutationFn: () => {
            const journeyData = new FormData();
            journeyData.append('title', formData.title);
            journeyData.append('description', formData.description);
            if (journeyToEdit) {
                return editJourny(journeyToEdit.id, journeyData, token);
            } else {
                return addJourny(journeyData, token);
            }
        },
        onSuccess: () => {
            onJournyClose();
            alert(journeyToEdit ? 'Journey update successfully' : 'Journey saved successfully');
        },
        onError: (error) => {
            console.error('Submission error:', error);
            alert(error.message || 'Failed to add journey');
        }
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };


    return (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Journey</h2>
                    <button
                        onClick={onJournyClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                        aria-label="Close"
                    >
                        <RxCross1 size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* Title Field */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none transition"
                                placeholder="Enter journey title"
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none transition"
                                placeholder="Enter journey description"
                            ></textarea>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onJournyClose}
                            className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-5 py-2 text-sm font-medium text-white bg-[#06acff] rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {journeyToEdit ? 'Update Journey' : 'Add Journey'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJourney;