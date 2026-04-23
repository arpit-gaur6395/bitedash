import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { useAuth } from "../context/AuthContext.js";
import LoginModalNew from "./LoginModalNew.js";

function Header() {
    const { getTotalItems, isCartOpen, setIsCartOpen } = useCart();
    const { user, isLoggedIn, logout } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const totalItems = getTotalItems();

    const handleLogin = () => {
        setIsLoginModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white bg-opacity-95 border-b border-gray-200 shadow-sm py-3 px-4 md:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="text-xl md:text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors decoration-none flex items-center gap-1">
                            🍕 BiteDash
                        </Link>
                    </div>

                    <nav className="hidden md:block">
                        <ul className="flex gap-6 lg:gap-8 list-none m-0 p-0 items-center">
                            <li>
                                <Link
                                    to="/"
                                    className="text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors rounded-md py-2 px-3 md:py-3 md:px-4"
                                >
                                    Restaurants
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="grocery"
                                    className="text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors rounded-md py-2 px-3 md:py-3 md:px-4"
                                >
                                    Grocery
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="relative py-2 px-3 md:py-3 md:px-4 rounded-md border border-gray-200 bg-white text-gray-600 font-medium transition-colors flex items-center gap-1 hover:border-orange-500 hover:bg-orange-50"
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                >
                                    🛒 Cart
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{totalItems}</span>
                                    )}
                                </button>
                            </li>
                            <li>
                                {isLoggedIn ? (
                                    <div className="flex items-center gap-2 py-2 px-3 md:py-3 md:px-4 rounded-md bg-orange-100 border border-orange-200">
                                        <span className="text-sm font-medium text-orange-500">👤 {user?.name}</span>
                                        <button
                                            className="px-2 md:px-3 py-1 md:py-2 rounded-sm bg-red-500 text-white font-medium transition-colors hover:bg-red-600"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>

                    <button
                        className="md:hidden text-gray-600 hover:text-orange-500 p-2"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                        <div className="w-6 h-0.5 bg-current"></div>
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
                        <ul className="flex flex-col gap-4 list-none m-0 p-0">
                            <li>
                                <Link
                                    to="/"
                                    className="block text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors rounded-md py-3 px-4"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Restaurants
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="grocery"
                                    className="block text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors rounded-md py-3 px-4"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Grocery
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="w-full relative py-3 px-4 rounded-md border border-gray-200 bg-white text-gray-600 font-medium transition-colors flex items-center gap-2 hover:border-orange-500 hover:bg-orange-50"
                                    onClick={() => {
                                        setIsCartOpen(!isCartOpen);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    🛒 Cart
                                    {totalItems > 0 && (
                                        <span className="absolute top-2 right-4 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{totalItems}</span>
                                    )}
                                </button>
                            </li>
                            <li>
                                {isLoggedIn ? (
                                    <div className="py-3 px-4 rounded-md bg-orange-100 border border-orange-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-orange-500">👤 {user?.name}</span>
                                            <button
                                                className="px-3 py-1.5 rounded-sm bg-red-500 text-white font-medium transition-colors hover:bg-red-600"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg font-medium transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>
                )}
            </header>

            <LoginModalNew
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
}

export default Header;