import React, { useState } from 'react';

const OrgDetails = () => {
    const [editMode, setEditMode] = useState(false);
    const [orgData, setOrgData] = useState({
        name: 'Helping Hands Foundation',
        email: 'support@helpinghands.org.in',
        phone: '+91 98123 45678',
        address: '12 Community Lane, Lajpat Nagar, New Delhi 110024, India',
        website: 'www.helpinghands.org.in',
        description: 'Non-profit organization dedicated to supporting underprivileged communities across India through education, healthcare, and skill development initiatives since 2008.',
        employees: 35,
        industry: 'Non-Governmental Organization (NGO)',
        founded: '2008'
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrgData({
            ...orgData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditMode(false);
        // Here you would typically send data to an API
        console.log('Organization data updated:', orgData);
    };




    return (
        <div className="max-w-4xl mx-auto p-6 mb-16">
            <div className="flex justify-start items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Organization Details</h2>
                {/* <button
                    onClick={() => setEditMode(!editMode)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    {editMode ? 'Cancel' : 'Edit Details'}
                </button> */}
            </div>

            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Organization Name</label>
                            <input
                                type="text"
                                name="name"
                                value={orgData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={orgData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={orgData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={orgData.website}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Number of Employees</label>
                            <input
                                type="number"
                                name="employees"
                                value={orgData.employees}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Industry</label>
                            <input
                                type="text"
                                name="industry"
                                value={orgData.industry}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={orgData.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={orgData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Save Changes
                    </button>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                            <div className="mt-4 space-y-3">
                                <p><span className="font-medium text-gray-700">Name:</span> {orgData.name}</p>
                                <p><span className="font-medium text-gray-700">Industry:</span> {orgData.industry}</p>
                                <p><span className="font-medium text-gray-700">Founded:</span> {orgData.founded}</p>
                                <p><span className="font-medium text-gray-700">Employees:</span> {orgData.employees}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                            <div className="mt-4 space-y-3">
                                <p><span className="font-medium text-gray-700">Email:</span> {orgData.email}</p>
                                <p><span className="font-medium text-gray-700">Phone:</span> {orgData.phone}</p>
                                <p><span className="font-medium text-gray-700">Website:</span> {orgData.website}</p>
                                <p><span className="font-medium text-gray-700">Address:</span> {orgData.address}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">About</h3>
                        <p className="mt-2 text-gray-600">{orgData.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrgDetails;