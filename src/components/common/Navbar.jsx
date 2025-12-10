import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getUser } from "../../api/userAPI";
import { auth } from "../../config/firebase.init";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Fetch user role when user is authenticated
    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    const userData = await getUser(user.email);
                    setRole(userData?.role || null);
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        };

        if (!loading) {
            fetchUserRole();
        }
    }, [user, loading]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem("token");
            setRole(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Join as Employee", path: "/join-as-employee" },
        { title: "Join as HR Manager", path: "/join-as-hr-manager" }
    ];

    // Show loading state
    if (loading) {
        return (
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        AssetVerse
                    </Link>
                    <div className="text-gray-500">Loading...</div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navbar Main */}
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        AssetVerse
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        
                        {user ? (
                            <>
                                {/* Profile Dropdown for logged-in users */}
                                <div className="dropdown dropdown-end">
                                    <div 
                                        tabIndex={0} 
                                        className="avatar cursor-pointer flex items-center gap-2"
                                        onClick={(e) => e.currentTarget.focus()}
                                    >
                                        <div className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2 bg-gray-200 flex items-center justify-center overflow-hidden">
                                            {user?.photoURL ? (
                                                <img 
                                                    src={user.photoURL} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-blue-600 font-bold text-lg">
                                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-gray-700 font-medium hidden lg:block">
                                            {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
                                        </span>
                                    </div>

                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 z-50"
                                    >
                                        {/* Employee Links */}
                                        {role === "employee" && (
                                            <>
                                                <li className="border-b pb-1 mb-1"><span className="text-sm text-gray-500 font-bold">EMPLOYEE</span></li>
                                                <li><Link to="/dashboard/my-assets" className="hover:bg-blue-50">📦 My Assets</Link></li>
                                                <li><Link to="/dashboard/request-asset" className="hover:bg-blue-50">➕ Request Asset</Link></li>
                                                <li><Link to="/dashboard/my-team" className="hover:bg-blue-50">👥 My Team</Link></li>
                                                <div className="divider my-1"></div>
                                            </>
                                        )}

                                        {/* HR Manager Links */}
                                        {role === "hr" && (
                                            <>
                                                <li className="border-b pb-1 mb-1"><span className="text-sm text-gray-500 font-bold">HR MANAGER</span></li>
                                                <li><Link to="/assets-list" className="hover:bg-blue-50">📋 Asset List</Link></li>
                                                <li><Link to="/add-asset" className="hover:bg-blue-50">➕ Add Asset</Link></li>
                                                <li><Link to="/all-requests" className="hover:bg-blue-50">📝 All Requests</Link></li>
                                                <li><Link to="/dashboard/employees" className="hover:bg-blue-50">👥 Employee List</Link></li>
                                                <li><Link to="/dashboard/upgrade-package" className="hover:bg-blue-50">💎 Upgrade Package</Link></li>
                                                <div className="divider my-1"></div>
                                            </>
                                        )}

                                        {/* Common Links */}
                                        <li><Link to="/dashboard/profile" className="hover:bg-blue-50">👤 Profile</Link></li>
                                        <li><button 
                                            onClick={handleLogout} 
                                            className="hover:bg-red-50 text-red-600 font-medium"
                                        >
                                            🚪 Logout
                                        </button></li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Public Navigation Links */}
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                                <Link
                                    to="/login"
                                    className="btn btn-primary btn-sm text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden btn btn-ghost p-2"
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-gray-100">
                        
                        {user ? (
                            <>
                                {/* Mobile Menu for logged-in users */}
                                <div className="mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-full ring-2 ring-blue-500 ring-offset-2 bg-gray-200 flex items-center justify-center overflow-hidden">
                                                {user?.photoURL ? (
                                                    <img 
                                                        src={user.photoURL} 
                                                        alt="Profile" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-blue-600 font-bold text-xl">
                                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{user?.displayName || 'User'}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                            <p className="text-xs font-medium mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full inline-block">
                                                {role === "employee" ? "Employee" : "HR Manager"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Employee Mobile Links */}
                                {role === "employee" && (
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">EMPLOYEE MENU</div>
                                        <Link 
                                            to="/dashboard/my-assets" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">📦</span>
                                            <span>My Assets</span>
                                        </Link>
                                        <Link 
                                            to="/dashboard/request-asset" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">➕</span>
                                            <span>Request Asset</span>
                                        </Link>
                                        <Link 
                                            to="/dashboard/my-team" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">👥</span>
                                            <span>My Team</span>
                                        </Link>
                                        <div className="border-t border-gray-200 my-3"></div>
                                    </div>
                                )}

                                {/* HR Manager Mobile Links */}
                                {role === "hr" && (
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">HR MANAGER MENU</div>
                                        <Link 
                                            to="/dashboard/asset-list" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">📋</span>
                                            <span>Asset List</span>
                                        </Link>
                                        <Link 
                                            to="add-asset" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">➕</span>
                                            <span>Add Asset</span>
                                        </Link>
                                        <Link 
                                            to="/dashboard/all-requests" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">📝</span>
                                            <span>All Requests</span>
                                        </Link>
                                        <Link 
                                            to="/dashboard/employees" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">👥</span>
                                            <span>Employee List</span>
                                        </Link>
                                        <Link 
                                            to="/dashboard/upgrade-package" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-lg">💎</span>
                                            <span>Upgrade Package</span>
                                        </Link>
                                        <div className="border-t border-gray-200 my-3"></div>
                                    </div>
                                )}

                                {/* Common Mobile Links */}
                                <Link 
                                    to="/dashboard/profile" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                >
                                    <span className="text-lg">👤</span>
                                    <span>Profile</span>
                                </Link>

                                <div className="pt-4 mt-4 border-t border-gray-200">
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="btn btn-error w-full flex items-center justify-center gap-2"
                                    >
                                        <span>🚪</span>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Mobile Menu for public users */}
                                <div className="space-y-3">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    ))}
                                    <div className="pt-4">
                                        <Link
                                            to="/login"
                                            className="btn btn-primary w-full text-white flex items-center justify-center py-3"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login to Dashboard
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;