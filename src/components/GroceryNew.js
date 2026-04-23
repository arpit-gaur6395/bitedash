import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.js";
import groceryData from "../utils/GroceryData.js";

function GroceryShimmerUI() {
    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-between items-start lg:items-center mb-6 md:mb-8 gap-4">
                <div className="flex gap-2 flex-wrap w-full lg:w-auto">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-8 md:h-10 bg-gray-200 rounded-full w-20 md:w-24 animate-pulse"></div>
                    ))}
                </div>
                <div className="flex gap-2 w-full lg:w-auto">
                    <div className="h-8 md:h-10 bg-gray-200 rounded-lg w-40 md:w-48 animate-pulse"></div>
                    <div className="h-8 md:h-10 bg-gray-200 rounded-lg w-16 md:w-20 animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                        <div className="relative w-full h-32 md:h-40 rounded-md overflow-hidden mb-4 bg-gray-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                            <div className="absolute top-2 right-2 bg-red-500 bg-opacity-20 px-2 py-1 rounded-md w-10 h-5 md:w-12 md:h-6"></div>
                        </div>

                        <div className="h-5 md:h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-3 md:h-4 bg-gray-200 rounded mb-4 w-full"></div>
                        <div className="h-3 md:h-4 bg-gray-200 rounded mb-4 w-5/6"></div>

                        <div className="flex justify-between items-center">
                            <div className="h-4 md:h-5 bg-gray-200 rounded w-16 md:w-20"></div>
                            <div className="h-6 md:h-8 bg-gray-200 rounded w-12 md:w-16"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Grocery() {
    const { addItem } = useCart();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        setIsDataLoaded(false);

        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1200));
            setIsDataLoaded(true);
            setIsLoading(false);
        };

        loadData();
    }, []);

    const categories = ["All", ...new Set(groceryData.map(item => item.category))];

    const filteredProducts = groceryData.filter(product => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSearch = () => {
        setSearchTerm(searchQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setSearchTerm("");
    };

    const handleInputChange = (value) => {
        setSearchQuery(value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (isLoading || !isDataLoaded) {
        return <GroceryShimmerUI />;
    }

    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-between items-start lg:items-center mb-6 md:mb-8 gap-4">
                <div className="flex gap-2 flex-wrap w-full lg:w-auto">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`px-3 py-2 md:px-4 py-2 rounded-full border font-medium transition-colors text-sm md:text-base ${selectedCategory === category
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-500"
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2 w-full lg:w-auto">
                    <div className="relative flex-1">
                        <input
                            className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-base outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            type="text"
                            placeholder="Search groceries..."
                            value={searchQuery}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                                onClick={handleClearSearch}
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button
                        className="px-3 md:px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap text-sm md:text-base"
                        onClick={handleSearch}
                    >
                        🔍 Search
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:shadow-lg">
                        <div className="relative w-full h-32 md:h-40 rounded-md overflow-hidden mb-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.discount && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                                    -{product.discount}%
                                </div>
                            )}
                        </div>

                        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>

                        <div className="flex justify-between items-center">
                            <div>
                                {product.discount && (
                                    <span className="text-sm text-gray-400 line-through mr-2">
                                        ₹{product.originalPrice}
                                    </span>
                                )}
                                <span className="text-base md:text-lg font-bold text-orange-500">
                                    ₹{product.price}
                                </span>
                            </div>
                            <button
                                className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                                onClick={() => addItem({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image
                                })}
                            >
                                Add +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No groceries found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}

export default Grocery;
