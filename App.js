import { Outlet } from 'react-router-dom';
import { CartProvider } from './src/context/CartContext.js';
import { AuthProvider } from './src/context/AuthContext.js';
import Header from './src/components/Header.js';
import Footer from './src/components/Footer.js';
import CartSidebarNew from './src/components/CartSidebarNew.js';

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
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                    <CartSidebarNew />
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;