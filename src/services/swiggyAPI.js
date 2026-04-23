const CORS_PROXY = 'https://corsproxy.io/?';
const LAT = '28.6139';
const LNG = '77.2090';

// Mock menu data for fallback
const mockMenuData = {
  '1': {
    id: '1',
    name: 'Burger King',
    cuisine: 'Burger, Fast Food',
    rating: 4.2,
    deliveryTime: '30 mins',
    costForTwo: '₹400',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300&q=80',
    menu: [
      { id: '101', name: 'Whopper', category: 'Burgers', price: 199, description: 'Flame-grilled beef patty with fresh vegetables', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80', isVeg: false, rating: 4.5 },
      { id: '102', name: 'Chicken Burger', category: 'Burgers', price: 149, description: 'Crispy chicken patty with special sauce', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80', isVeg: false, rating: 4.3 },
      { id: '103', name: 'Veggie Burger', category: 'Burgers', price: 129, description: 'Fresh vegetable patty with cheese', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.0 },
      { id: '104', name: 'French Fries', category: 'Sides', price: 99, description: 'Crispy golden fries', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.2 },
      { id: '105', name: 'Coke', category: 'Beverages', price: 49, description: 'Refreshing cold drink', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.5 },
    ]
  }
};

/**
 * Fetch restaurant list from Swiggy API
 * Falls back to mock data if API fails
 * @returns {Promise<Array>} List of restaurants
 */
export async function fetchRestaurants() {
  try {
    const url = `${CORS_PROXY}https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data?.data?.cards) {
      const restaurants = [];
      data.data.cards.forEach(card => {
        if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          restaurants.push(...card.card.card.gridElements.infoWithStyle.restaurants);
        }
      });
      if (restaurants.length > 0) {
        return transformRestaurantData(restaurants);
      }
    }

    return mockRestaurants;
  } catch (error) {
    return mockRestaurants;
  }
}

/**
 * Fetch restaurant menu from Swiggy API
 * Falls back to mock data if API fails
 * @param {string} restaurantId - The ID of the restaurant
 * @returns {Promise<Object>} Restaurant menu data
 */
export async function fetchRestaurantMenu(restaurantId) {
  try {
    const url = `${CORS_PROXY}https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const transformed = transformMenuData(data, restaurantId);

    if (transformed && transformed[restaurantId]) {
      return transformed;
    }

    return mockMenuData;
  } catch (error) {
    return mockMenuData;
  }
}

/**
 * Transform raw Swiggy API data to match our app's structure
 * @param {Array} restaurants - Raw restaurant data from API
 * @returns {Array} Transformed restaurant data
 */
function transformRestaurantData(restaurants) {
  return restaurants.map(restaurant => {
    const info = restaurant.info;
    return {
      id: info.id,
      name: info.name,
      cuisine: info.cuisines?.join(', ') || 'Various',
      rating: info.avgRating || 0,
      deliveryTime: `${info.sla?.deliveryTime || 30} mins`,
      costForTwo: `₹${info.costForTwo / 100 || 400}`,
      image: info.cloudinaryImageId
        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.cloudinaryImageId}`
        : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
      areaName: info.areaName || '',
      locality: info.locality || '',
    };
  });
}

/**
 * Transform raw Swiggy menu data to match our app's structure
 * @param {Object} data - Raw menu data from API
 * @param {string} restaurantId - Restaurant ID
 * @returns {Object} Transformed menu data
 */
function transformMenuData(data, restaurantId) {
  if (!data?.data) {
    return null;
  }

  const restaurantInfo = data.data.cards?.[0]?.card?.card?.info;
  const menuCards = data.data.cards?.find(card =>
    card.groupedCard?.cardGroupMap?.REGULAR?.cards
  );

  if (!restaurantInfo || !menuCards) {
    return null;
  }

  const menuItems = [];
  const regularCards = menuCards.groupedCard.cardGroupMap.REGULAR.cards;

  regularCards.forEach(card => {
    if (card.card?.card?.itemCards) {
      card.card.card.itemCards.forEach(itemCard => {
        const item = itemCard.card.info;
        menuItems.push({
          id: item.id,
          name: item.name,
          category: item.category || 'General',
          price: (item.defaultPrice || item.price) / 100,
          description: item.description || item.category || '',
          image: item.imageId
            ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`
            : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
          isVeg: item.isVeg === 1,
          rating: item.ratings?.aggregatedRating?.rating || item.rating || 4.0,
        });
      });
    }
  });

  return {
    [restaurantId]: {
      id: restaurantId,
      name: restaurantInfo.name,
      cuisine: restaurantInfo.cuisines?.join(', ') || 'Various',
      rating: restaurantInfo.avgRating || 0,
      deliveryTime: `${restaurantInfo.sla?.deliveryTime || 30} mins`,
      costForTwo: `₹${(restaurantInfo.costForTwo || 40000) / 100}`,
      image: restaurantInfo.cloudinaryImageId
        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${restaurantInfo.cloudinaryImageId}`
        : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
      menu: menuItems,
    }
  };
}

/**
 * Search restaurants by name or cuisine
 * @param {string} query - Search query
 * @returns {Promise<Array>} Filtered restaurant list
 */
export async function searchRestaurants(query) {
  try {
    const restaurants = await fetchRestaurants();
    const lowerQuery = query.toLowerCase();

    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(lowerQuery) ||
      restaurant.cuisine.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    throw error;
  }
}
