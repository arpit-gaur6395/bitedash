import { useCart } from "../context/CartContext.js";

function CartSidebarNew() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed top-0 h-full w-80 md:w-96 bg-white shadow-2xl transition-transform duration-300 z-50 flex flex-col ${isCartOpen ? 'right-0' : '-right-96'
        }`}>
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 m-0">🛒 Shopping Cart</h2>
          <button
            className="bg-none border-none text-xl md:text-2xl cursor-pointer text-gray-500 px-2 py-1 rounded-md transition-fast hover:bg-gray-100 p-1"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6">
          {items.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-4">🛒</div>
              <p className="text-gray-500 mb-4 text-sm md:text-base">Your cart is empty</p>
              <button
                className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm md:text-base"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3 md:p-4 flex gap-3 md:gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-orange-500 font-bold mb-2 text-sm md:text-base">₹{item.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-gray-200 text-gray-600 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm md:text-base"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="text-gray-800 font-medium w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                      <button
                        className="bg-gray-200 text-gray-600 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm md:text-base"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-md text-xs md:text-sm hover:bg-red-600 transition-colors ml-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 md:p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base md:text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-lg md:text-xl font-bold text-orange-500">₹{totalPrice}</span>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebarNew;
