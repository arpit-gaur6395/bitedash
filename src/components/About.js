
function About() {
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
            <div className="text-center mb-8 md:mb-16">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">About BiteDash</h1>
                <p className="text-base md:text-lg text-gray-600">Delivering happiness, one meal at a time</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">🎯 Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        To revolutionize the food delivery experience by connecting hungry customers with their favorite restaurants through innovative technology, exceptional service, and a commitment to quality. We strive to make every meal a memorable experience.
                    </p>
                </div>

                <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">👁️ Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        To become the most trusted and loved food delivery platform, known for our reliability, extensive restaurant partnerships, and customer-centric approach. We envision a world where delicious food is just a tap away for everyone.
                    </p>
                </div>

                <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">💡 Our Story</h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        [Add your company story here - when it was founded, the inspiration behind starting it, and your journey so far]
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="text-center">
                        <div className="text-4xl md:text-6xl mb-4">🚀</div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Innovation</h3>
                        <p className="text-gray-600 text-sm">We constantly push boundaries to create better solutions for our customers and partners.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-6xl mb-4">❤️</div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Customer First</h3>
                        <p className="text-gray-600 text-sm">Every decision we make is centered around providing the best experience for our customers.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-6xl mb-4">🤝</div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Partnership</h3>
                        <p className="text-gray-600 text-sm">We build strong, lasting relationships with our restaurant partners and delivery team.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-6xl mb-4">🌱</div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Sustainability</h3>
                        <p className="text-gray-600 text-sm">We're committed to reducing our environmental impact and promoting sustainable practices.</p>
                    </div>
                </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 md:p-8 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">Be part of the food delivery revolution</p>
                <button className="bg-orange-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
                    Contact Us
                </button>
            </div>
        </div>
    );
}

export default About;