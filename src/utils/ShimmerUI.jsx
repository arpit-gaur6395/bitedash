function ShimmerUI() {
    return (
        <div className="container mx-auto px-4 pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                        <div className="relative w-full h-48 bg-gray-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                            <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-1 rounded-md w-12 h-6"></div>
                            <div className="absolute bottom-2 left-2 bg-orange-500 bg-opacity-20 p-1 rounded-md w-16 h-6"></div>
                        </div>

                        <div className="p-4">
                            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>

                            <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
                            <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <div className="h-5 bg-gray-200 rounded w-20"></div>
                                <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShimmerUI;
