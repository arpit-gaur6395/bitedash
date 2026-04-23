// Vercel proxy URL (update after deployment)
const VERCEL_PROXY_URL = process.env.REACT_APP_VERCEL_PROXY_URL || '/api';
const LAT = '28.6139';
const LNG = '77.2090';

// Mock restaurant data for fallback
const mockRestaurants = [
  {
    id: '1',
    name: 'Burger King',
    cuisine: 'Burger, Fast Food',
    rating: 4.2,
    deliveryTime: '30 mins',
    costForTwo: '₹400',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300&q=80',
    areaName: 'Connaught Place',
    locality: 'Central Delhi'
  },
  {
    id: '2',
    name: 'Pizza Hut',
    cuisine: 'Pizza, Italian',
    rating: 4.1,
    deliveryTime: '35 mins',
    costForTwo: '₹500',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
    areaName: 'Rajouri Garden',
    locality: 'West Delhi'
  },
  {
    id: '3',
    name: 'KFC',
    cuisine: 'Chicken, Fast Food',
    rating: 4.3,
    deliveryTime: '25 mins',
    costForTwo: '₹450',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
    areaName: 'Saket',
    locality: 'South Delhi'
  },
  {
    id: '4',
    name: 'Dominos',
    cuisine: 'Pizza, Fast Food',
    rating: 4.0,
    deliveryTime: '30 mins',
    costForTwo: '₹400',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80',
    areaName: 'Dwarka',
    locality: 'South West Delhi'
  },
  {
    id: '5',
    name: 'Haldiram',
    cuisine: 'North Indian, Sweets',
    rating: 4.5,
    deliveryTime: '40 mins',
    costForTwo: '₹600',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=300&q=80',
    areaName: 'Chandni Chowk',
    locality: 'Old Delhi'
  },
  {
    id: '6',
    name: 'Biryani Blues',
    cuisine: 'Biryani, Mughlai',
    rating: 4.4,
    deliveryTime: '35 mins',
    costForTwo: '₹550',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
    areaName: 'Nehru Place',
    locality: 'South Delhi'
  },
  {
    id: '7',
    name: ' Subway',
    cuisine: 'Healthy, Sandwich',
    rating: 4.1,
    deliveryTime: '20 mins',
    costForTwo: '₹350',
    image: 'https://images.unsplash.com/photo-1553247407-23251ce81f59?auto=format&fit=crop&w=300&q=80',
    areaName: 'Karol Bagh',
    locality: 'Central Delhi'
  },
  {
    id: '8',
    name: 'McDonalds',
    cuisine: 'Burger, Fast Food',
    rating: 4.2,
    deliveryTime: '25 mins',
    costForTwo: '₹400',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300&q=80',
    areaName: 'Vasant Kunj',
    locality: 'South Delhi'
  }
];

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
    const timestamp = Date.now();
    const url = `${VERCEL_PROXY_URL}?path=restaurants/list/v5&lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING&_t=${timestamp}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Try multiple possible response structures
    let restaurants = [];

    // Structure 1: data.data.cards with gridElements
    if (data?.data?.cards) {
      data.data.cards.forEach(card => {
        if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          restaurants.push(...card.card.card.gridElements.infoWithStyle.restaurants);
        }
      });
    }

    // Structure 2: Direct restaurants array
    if (restaurants.length === 0 && Array.isArray(data?.restaurants)) {
      restaurants = data.restaurants;
    }

    // Structure 3: data.restaurants
    if (restaurants.length === 0 && Array.isArray(data?.data?.restaurants)) {
      restaurants = data.data.restaurants;
    }

    console.log('Extracted restaurants:', restaurants.length);

    if (restaurants.length > 0) {
      return transformRestaurantData(restaurants);
    }

    console.log('Falling back to mock data');
    return mockRestaurants;
  } catch (error) {
    console.error('API Error:', error);
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
    const url = `${VERCEL_PROXY_URL}?path=menu/pl&page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
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
