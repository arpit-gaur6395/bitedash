import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 md:py-16">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
                    <div className="mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            🍕 BiteDash
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
                            Your trusted food delivery partner, bringing delicious meals from your favorite restaurants right to your doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                ⭐ 4.8 Rating
                            </span>
                            <span className="flex items-center gap-2">
                                🚀 30-min Delivery
                            </span>
                            <span className="flex items-center gap-2">
                                🏆 Best Service
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="list-none p-0 m-0">
                                <li className="mb-3">
                                    <Link
                                        to="/"
                                        className="text-gray-300 text-sm md:text-base transition-all duration-300 hover:text-orange-400 hover:translate-x-1 inline-block"
                                    >
                                        �️ Restaurants
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        to="about"
                                        className="text-gray-300 text-sm md:text-base transition-all duration-300 hover:text-orange-400 hover:translate-x-1 inline-block"
                                    >
                                        📖 About Us
                                    </Link>
                                </li>
                            </ul>
                            <ul className="list-none p-0 m-0">
                                <li className="mb-3">
                                    <Link
                                        to="contact"
                                        className="text-gray-300 text-sm md:text-base transition-all duration-300 hover:text-orange-400 hover:translate-x-1 inline-block"
                                    >
                                        📞 Contact
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        to="grocery"
                                        className="text-gray-300 text-sm md:text-base transition-all duration-300 hover:text-orange-400 hover:translate-x-1 inline-block"
                                    >
                                        🛒 Grocery
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-6 md:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-gray-300 text-sm md:text-base">
                                &copy; 2024 BiteDash. All rights reserved.
                            </p>
                            <p className="text-gray-400 text-xs md:text-sm mt-2 flex items-center justify-center md:justify-start gap-1">
                                Made with
                                <span className="text-red-500 animate-pulse">&hearts;</span>
                                for food lovers
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs md:text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                🔒 Secure
                            </span>
                            <span className="flex items-center gap-1">
                                🌟 Trusted
                            </span>
                            <span className="flex items-center gap-1">
                                🚀 Fast
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;