import React from 'react';

const ApplyVolDetails = () => {
    // Demo data for a volunteer
    const volunteer = {
        name: "Rajesh Kumar",
        email: "rajesh.kumar@example.com",
        phone: "+91-9876543210",
        address: "45, MG Road, Indiranagar, Bengaluru, Karnataka, India",
        skills: ["Communication", "Leadership", "Event Management"],
        about: "Dedicated volunteer passionate about serving the community and helping those in need. Experienced in organizing local events, coordinating relief efforts, and working with diverse groups."
    };


    return (
        <div className='p-6'>
            <div className="rounded-lg shadow-sm overflow-hidden  border border-gray-100">
                {/* Header */}
                <div className="bg-[#06acff] px-4 py-3">
                    <h2 className="text-white text-lg font-medium">{volunteer.name}</h2>
                    <p className="text-blue-100 text-sm">{volunteer.email}</p>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-1">Contact</h3>
                        <p className="text-gray-600 text-sm">{volunteer.phone}</p>
                        <p className="text-gray-600 text-sm">{volunteer.address}</p>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-1">Skills</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {volunteer.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wider mb-1">About</h3>
                        <p className="text-gray-600 text-sm leading-snug">{volunteer.about}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyVolDetails;