// Vercel proxy URL (update after deployment)
const VERCEL_PROXY_URL = process.env.REACT_APP_VERCEL_PROXY_URL || 'http://localhost:3000/api';
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
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
    menu: [
      { id: '101', name: 'Whopper', category: 'Burgers', price: 199, isVeg: false, rating: 4.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
      { id: '102', name: 'Veggie Burger', category: 'Burgers', price: 129, isVeg: true, rating: 4.0, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=300&q=80' },
      { id: '103', name: 'Fries', category: 'Sides', price: 99, isVeg: true, rating: 4.2, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '2': {
    id: '2',
    name: 'Pizza Hut',
    cuisine: 'Pizza, Italian',
    rating: 4.1,
    deliveryTime: '35 mins',
    costForTwo: '₹500',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    menu: [
      { id: '201', name: 'Margherita Pizza', category: 'Pizza', price: 249, isVeg: true, rating: 4.3, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80' },
      { id: '202', name: 'Farmhouse Pizza', category: 'Pizza', price: 349, isVeg: true, rating: 4.5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80' },
      { id: '203', name: 'Chicken Pizza', category: 'Pizza', price: 399, isVeg: false, rating: 4.4, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '3': {
    id: '3',
    name: 'KFC',
    cuisine: 'Fast Food',
    rating: 4.3,
    deliveryTime: '25 mins',
    costForTwo: '₹450',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300&q=80',
    menu: [
      { id: '301', name: 'Veggie Burger', category: 'Burger', price: 199, isVeg: true, rating: 4.6, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=300&q=80' },
      { id: '302', name: 'French Fries', category: 'Sides', price: 129, isVeg: true, rating: 4.7, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80' },
      { id: '303', name: 'Coleslaw', category: 'Sides', price: 99, isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '4': {
    id: '4',
    name: 'Dominos',
    cuisine: 'Pizza, Fast Food',
    rating: 4.0,
    deliveryTime: '30 mins',
    costForTwo: '₹400',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    menu: [
      { id: '401', name: 'Pepperoni Pizza', category: 'Pizza', price: 299, isVeg: false, rating: 4.4, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
      { id: '402', name: 'Veg Loaded Pizza', category: 'Pizza', price: 279, isVeg: true, rating: 4.3, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80' },
      { id: '403', name: 'Garlic Bread', category: 'Sides', price: 129, isVeg: true, rating: 4.2, image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '5': {
    id: '5',
    name: 'Haldiram',
    cuisine: 'North Indian, Sweets',
    rating: 4.5,
    deliveryTime: '40 mins',
    costForTwo: '₹600',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979',
    menu: [
      { id: '501', name: 'Raj Kachori', category: 'Snacks', price: 120, isVeg: true, rating: 4.6, image: 'https://images.unsplash.com/photo-1626132647523-66c8b896d19c?auto=format&fit=crop&w=300&q=80' },
      { id: '502', name: 'Chole Bhature', category: 'Main Course', price: 180, isVeg: true, rating: 4.7, image: 'https://images.unsplash.com/photo-1626132647523-66c8b896d19c?auto=format&fit=crop&w=300&q=80' },
      { id: '503', name: 'Gulab Jamun', category: 'Dessert', price: 90, isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1666190054381-6f8ed4cb6eaa?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '6': {
    id: '6',
    name: 'Biryani Blues',
    cuisine: 'Biryani, Mughlai',
    rating: 4.4,
    deliveryTime: '35 mins',
    costForTwo: '₹550',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    menu: [
      { id: '601', name: 'Chicken Biryani', category: 'Biryani', price: 299, isVeg: false, rating: 4.7, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80' },
      { id: '602', name: 'Mutton Biryani', category: 'Biryani', price: 399, isVeg: false, rating: 4.8, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80' },
      { id: '603', name: 'Veg Biryani', category: 'Biryani', price: 249, isVeg: true, rating: 4.3, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '7': {
    id: '7',
    name: 'Subway',
    cuisine: 'Healthy, Sandwich',
    rating: 4.1,
    deliveryTime: '20 mins',
    costForTwo: '₹350',
    image: 'https://images.unsplash.com/photo-1553247407-23251ce81f59',
    menu: [
      { id: '701', name: 'Veggie Delight', category: 'Sandwich', price: 199, isVeg: true, rating: 4.2, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80' },
      { id: '702', name: 'Chicken Teriyaki', category: 'Sandwich', price: 249, isVeg: false, rating: 4.4, image: 'https://images.unsplash.com/photo-1553247407-23251ce81f59?auto=format&fit=crop&w=300&q=80' },
      { id: '703', name: 'Paneer Tikka Sub', category: 'Sandwich', price: 229, isVeg: true, rating: 4.3, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80' },
    ]
  },

  '8': {
    id: '8',
    name: 'McDonalds',
    cuisine: 'Burger, Fast Food',
    rating: 4.2,
    deliveryTime: '25 mins',
    costForTwo: '₹400',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5',
    menu: [
      { id: '801', name: 'McAloo Tikki', category: 'Burger', price: 99, isVeg: true, rating: 4.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
      { id: '802', name: 'McChicken', category: 'Burger', price: 149, isVeg: false, rating: 4.4, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300&q=80' },
      { id: '803', name: 'McFlurry', category: 'Dessert', price: 120, isVeg: true, rating: 4.6, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80' },
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
    // Silently fall back to mock data if proxy server is not running
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
    // Silently fall back to mock data if proxy server is not running
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
