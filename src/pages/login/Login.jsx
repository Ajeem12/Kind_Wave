
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';
import { useMutation } from "@tanstack/react-query";
import { login, volLogin } from "../../api/authApi";
import useOrgAuthStore from "../../store/useOrgAuthStore";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSwitchToRegister, role }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [rememberMe, setRememberMe] = useState(false);
    const loginOrg = useOrgAuthStore((state) => state.loginOrg);

    const mutation = useMutation({
        mutationFn: role === "volunteer" ? volLogin : login,
        onSuccess: (data) => {
            loginOrg(data.data);
            swal("Success!", data.message || "Login successful!", "success");
            navigate("/")
            onClose();

        },
        onError: (err) => {
            console.error(err);
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.data?.error ||
                err?.message ||
                "Login failed";

            swal("Oops!", errorMessage, "error");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            swal({
                title: "Validation Error",
                text: "Please fill in all fields",
                icon: "warning"
            });
            return;
        }

        mutation.mutate({
            email,
            password,
            role: role.toLowerCase()
        });
    };

    return (
        <AnimatePresence>
            <>
                {/* Background Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 mo z-40 modal-overlay "
                    onClick={onClose}
                />

                {/* Bottom Sheet Panel */}
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-xl z-50 p-6 md:max-w-md md:left-1/2 md:-translate-x-1/2 max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Icon */}
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-black transition-colors"
                            aria-label="Close login modal"
                        >
                            <RxCross2 size={24} />
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Login as {role}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={mutation.isPending}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                required
                                disabled={mutation.isPending}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="rounded text-blue-500 focus:ring-blue-500"
                                    disabled={mutation.isPending}
                                />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div> */}

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {mutation.isPending ? (
                                <>
                                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="px-3 text-sm text-gray-500">or continue with</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => {
                                onClose();
                                onSwitchToRegister();
                            }}
                            className="text-blue-500 font-medium hover:underline focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </p>
                </motion.div>
            </>
        </AnimatePresence>
    );
};

export default Login;