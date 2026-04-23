import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './src/components/ErrorBoundary.js';
import App from './App';
import './src/styles/main.css';

// Code splitting - lazy load all route components
const Body = lazy(() => import('./src/components/Body.js'));
const Cart = lazy(() => import('./src/components/Cart.js'));
const RestaurantDetail = lazy(() => import('./src/components/RestaurantDetail.js'));
const Grocery = lazy(() => import('./src/components/GroceryNew.js'));
const About = lazy(() => import('./src/components/About.js'));
const Contact = lazy(() => import('./src/components/Contact.js'));

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
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Body />
                    </Suspense>
                )
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <About />
                    </Suspense>
                )
            },
            {
                path: 'contact',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                    </Suspense>
                )
            },
            {
                path: 'cart',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Cart />
                    </Suspense>
                )
            },
            {
                path: 'restaurant/:id',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <RestaurantDetail />
                    </Suspense>
                )
            },
            {
                path: 'grocery',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Grocery />
                    </Suspense>
                )
            }
        ]
    }
]);

root.render(
    <ErrorBoundary>
        <RouterProvider router={appRouter} />
    </ErrorBoundary>
);