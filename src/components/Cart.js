function Cart() {
    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">🛒 Shopping Cart</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">Your cart is empty</p>
            <div className="bg-gray-100 rounded-lg p-6 md:p-8 text-center">
                <div className="text-4xl md:text-6xl mb-4">🛒</div>
                <p className="text-gray-500 mb-4 text-sm md:text-base">No items in cart</p>
                <button className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default Cart;