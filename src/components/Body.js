import Restaurant from "./Restaurant";

function Body() {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 md:py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                            Delicious Food, <span className="text-orange-500">Delivered Fast</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Order from your favorite restaurants and get it delivered to your doorstep in minutes. Fresh, hot, and always on time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Restaurant Section */}
            <div className="container mx-auto px-4 py-8">
                <Restaurant />
            </div>
        </div>
    );
}

export default Body;