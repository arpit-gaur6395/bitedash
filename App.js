import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './src/context/CartContext.js';
import { AuthProvider } from './src/context/AuthContext.js';

// Code splitting - lazy load components
const Header = lazy(() => import('./src/components/Header.js'));
const Footer = lazy(() => import('./src/components/Footer.js'));
const CartSidebarNew = lazy(() => import('./src/components/CartSidebarNew.js'));

// Loading fallback component
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Suspense fallback={<LoadingFallback />}>
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1">
                            <Outlet />
                        </main>
                        <Footer />
                        <CartSidebarNew />
                    </div>
                </Suspense>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;