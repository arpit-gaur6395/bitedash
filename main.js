import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './src/components/ErrorBoundary.js';
import App from './App';
import Body from './src/components/Body.js';
import Cart from './src/components/Cart.js';
import RestaurantDetail from './src/components/RestaurantDetail.js';
import Grocery from './src/components/GroceryNew.js';
import About from './src/components/About.js';
import Contact from './src/components/Contact.js';
import './src/styles/main.css';

// Loading fallback component
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'restaurant/:id',
                element: <RestaurantDetail />
            },
            {
                path: 'grocery',
                element: <Grocery />
            }
        ]
    }
]);

root.render(
    <ErrorBoundary>
        <RouterProvider router={appRouter} />
    </ErrorBoundary>
);