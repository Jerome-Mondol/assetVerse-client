import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext.jsx';
import { createHRInDB } from '../../../api/authAPI.js';

const HRRegister = () => {
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { signUpWithEmailAndPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !companyName || !companyLogo || !email || !dob || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredentials = await signUpWithEmailAndPassword(email, password);

            if(userCredentials) {

            const hrData = {
                name,
                companyName,
                companyLogo,
                email,
                dateOfBirth: dob,
                firebaseUID: userCredentials.uid,
            };

            const createdHR = await createHRInDB(hrData);
            console.log(createdHR);
            }

            navigate('/login')
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Join as HR Manager
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Register your company and manage employees easily
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                required
                                value={companyName}
                                onChange={e => setCompanyName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="TechCorp Pvt Ltd"
                            />
                        </div>

                        {/* Company Logo (URL) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
                            <input
                                type="text"
                                required
                                value={companyLogo}
                                onChange={e => setCompanyLogo(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="https://i.ibb.co/logo.png"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="you@company.com"
                            />
                        </div>

                        {/* DOB */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                required
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    minLength={6}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Minimum 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2 text-sm"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Confirm password"
                            />
                        </div>

                        {/* T&C */}
                        <div className="flex items-center">
                            <input type="checkbox" required className="h-4 w-4 text-blue-600" />
                            <label className="ml-2 text-sm text-gray-700">
                                I agree to the{" "}
                                <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms</Link>{" "}
                                &{" "}
                                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Create HR Account
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRRegister;
