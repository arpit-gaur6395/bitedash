import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import ShimmerUI from "../utils/ShimmerUI.jsx";
import { fetchRestaurants } from "../services/swiggyAPI.js";

function getDeliveryTime(timeString) {
  return parseInt(timeString);
}

function getPrice(priceString) {
  return parseInt(priceString.replace('₹', '').replace(' for two', ''));
}

function isTopRated(restaurant) {
  return restaurant.rating >= 4.5;
}

function isFastDelivery(restaurant) {
  return getDeliveryTime(restaurant.deliveryTime) <= 30;
}

function isBudgetFriendly(restaurant) {
  return getPrice(restaurant.costForTwo) <= 400;
}

function searchInRestaurant(restaurant, searchText) {
  const searchLower = searchText.toLowerCase();
  return (
    restaurant.name.toLowerCase().includes(searchLower) ||
    restaurant.cuisine.toLowerCase().includes(searchLower)
  );
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function sortByRating(a, b) {
  return b.rating - a.rating;
}

function sortByDeliveryTime(a, b) {
  return getDeliveryTime(a.deliveryTime) - getDeliveryTime(b.deliveryTime);
}

function sortByPrice(a, b) {
  return getPrice(a.costForTwo) - getPrice(b.costForTwo);
}

function sortByPriceHigh(a, b) {
  return getPrice(b.costForTwo) - getPrice(a.costForTwo);
}

function Restaurant() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [allRestaurantList, setAllRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {
    try {
      const data = await fetchRestaurants();
      // Remove duplicates based on restaurant id
      const uniqueRestaurants = data.filter((restaurant, index, self) =>
        index === self.findIndex((r) => r.id === restaurant.id)
      );
      setRestaurantList(uniqueRestaurants);
      setAllRestaurantList(uniqueRestaurants);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
      setIsLoading(false);
    }
  }

  function showAllRestaurants() {
    setRestaurantList(allRestaurantList);
    setActiveFilter("all");
  }

  function showTopRatedRestaurants() {
    const filtered = allRestaurantList.filter(isTopRated);
    sortRestaurants(filtered);
    setActiveFilter("top");
  }

  function showFastDeliveryRestaurants() {
    const filtered = allRestaurantList.filter(isFastDelivery);
    sortRestaurants(filtered);
    setActiveFilter("fast");
  }

  function showBudgetFriendlyRestaurants() {
    const filtered = allRestaurantList.filter(isBudgetFriendly);
    sortRestaurants(filtered);
    setActiveFilter("budget");
  }

  function sortRestaurants(restaurants) {
    let sorted = [...restaurants];

    switch (sortBy) {
      case "rating":
        sorted.sort(sortByRating);
        break;
      case "deliveryTime":
        sorted.sort(sortByDeliveryTime);
        break;
      case "priceLow":
        sorted.sort(sortByPrice);
        break;
      case "priceHigh":
        sorted.sort(sortByPriceHigh);
        break;
      case "relevance":
      default:
        break;
    }

    setRestaurantList(sorted);
  }

  function handleSearch() {
    if (searchText.trim() === "") {
      setRestaurantList(allRestaurantList);
      return;
    }

    const filtered = allRestaurantList.filter(restaurant =>
      searchInRestaurant(restaurant, searchText)
    );

    if (filtered.length === 0) {
      setRestaurantList([]);
    } else {
      sortRestaurants(filtered);
    }
  }

  function handleSortChange(value) {
    setSortBy(value);
    sortRestaurants(restaurantList);
  }

  if (isLoading) {
    return <ShimmerUI />;
  }

  return restaurantList.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
      <p className="text-gray-500">Try adjusting your search or filters</p>
    </div>
  ) : (
    <div className="container mx-auto px-4 pb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap w-full lg:w-auto">
          <button
            className={`px-3 py-2 md:px-4 py-2 rounded-full border font-medium transition-colors text-sm md:text-base ${activeFilter === "all"
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-500"
              }`}
            onClick={showAllRestaurants}
          >
            All
          </button>
          <button
            className={`px-3 py-2 md:px-4 py-2 rounded-full border font-medium transition-colors text-sm md:text-base ${activeFilter === "top"
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-500"
              }`}
            onClick={showTopRatedRestaurants}
          >
            Top
          </button>
          <button
            className={`px-3 py-2 md:px-4 py-2 rounded-full border font-medium transition-colors text-sm md:text-base ${activeFilter === "fast"
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-500"
              }`}
            onClick={showFastDeliveryRestaurants}
          >
            Fast
          </button>
          <button
            className={`px-3 py-2 md:px-4 py-2 rounded-full border font-medium transition-colors text-sm md:text-base ${activeFilter === "budget"
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-500"
              }`}
            onClick={showBudgetFriendlyRestaurants}
          >
            Budget
          </button>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Sort by:</span>
          <select
            className="px-3 py-2 border border-gray-200 rounded-md text-sm outline-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex-1 lg:flex-none"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6 md:mb-8">
        <input
          className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-base outline-none transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          type="text"
          value={searchText}
          placeholder="Search restaurants or cuisines..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
          className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 font-medium transition-colors hover:bg-orange-500 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 whitespace-nowrap"
          onClick={handleSearch}
        >
          🔍 Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-center">
        {restaurantList.map((restaurant) => (
          <Card key={restaurant.id} resdata={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default Restaurant;
