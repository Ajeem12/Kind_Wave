import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4"
        >
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Illustration Section */}
                <div className="bg-gradient-to-r from-sky-500 to-blue-400 p-8 text-center">
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                    >
                        <svg
                            className="w-32 h-32 mx-auto text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8 text-center">
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-gray-800 mb-2"
                    >
                        404
                    </motion.h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                    <p className="text-gray-500 mb-6">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    >
                        Return Home
                    </motion.button>

                    <div className="mt-6 text-sm text-gray-400">
                        <p>Error code: 404</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NotFound;