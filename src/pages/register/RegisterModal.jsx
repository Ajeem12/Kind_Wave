import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import swal from 'sweetalert';
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerOrganization } from "../../api/orgRegApi"
import { getStackHolderCom } from "../../api/stackHolderCommunityApi";
import { volReg } from "../../api/volRegApi";



const RegisterModal = ({ onClose, role, onSwitchToLogin }) => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const useStackHolderCom = () => {
        return useQuery({
            queryKey: ['stackHolderCom'],
            queryFn: getStackHolderCom,
        });
    };

    const { data, isLoading, isError, error } = useStackHolderCom();
    const stackHolderCom = data?.data;


    const mutation = useMutation({
        mutationFn: role === "volunteer" ? volReg : registerOrganization,
        onSuccess: (res) => {
            swal("Success!", "Registration successful!", "success");
            console.log(res);
            onSwitchToLogin();
            onClose();

        },
        onError: (err) => {
            console.error(err);
            const errors = err.data || {};
            let errorMessage = err.message || "Registration failed";

            if (typeof errors === "object") {
                errorMessage = Object.entries(errors)
                    .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                    .join("\n");
            }

            swal("Oops!", errorMessage, "error");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = role === "volunteer"
            ? { full_name: name, email, password }
            : { organization_name: name, email, password, categories };
        mutation.mutate(payload);
    };


    return (
        <AnimatePresence>
            <>
                {/* Background Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 modal-overlay z-40"
                    onClick={onClose}
                />

                {/* Bottom Sheet Panel */}
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-xl z-50 p-6 md:max-w-md md:left-1/2 md:-translate-x-1/2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Icon */}
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-black"
                        >
                            <RxCross2 size={24} />
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Register as {role}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 ">
                        <input
                            type="text"
                            placeholder={`Enter ${role} Name`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {role === "organization" && (
                            <select
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select Category</option>
                                {stackHolderCom?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>)}


                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                className="rounded text-blue-500 focus:ring-blue-500"
                            />
                            I agree to the process of{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                Personal data
                            </a>
                        </label>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-50"
                        >
                            {mutation.isPending ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="px-3 text-sm text-gray-500">or continue with</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Sign In
                        </button>
                    </p>

                </motion.div>
            </>

        </AnimatePresence >
    );
};

export default RegisterModal;