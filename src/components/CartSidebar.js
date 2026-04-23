import { useCart } from "../context/CartContext.js";

function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-2xl transition-transform duration-300 z-50 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none p-1"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {items.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-sm md:text-base">Your cart is empty</p>
              <p className="text-gray-500 text-sm md:text-base">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{item.name}</h3>
                    <p className="text-orange-500 font-medium text-sm md:text-base">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm md:text-base"
                      >
                        -
                      </button>
                      <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm md:text-base"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm md:text-base p-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base md:text-lg font-semibold">Total Amount:</span>
              <span className="text-lg md:text-xl font-bold text-orange-500">₹{totalPrice}</span>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
