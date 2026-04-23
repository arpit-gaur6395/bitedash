import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";

function Card(props) {
  const { resdata } = props;
  const { addItem } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg p-3 md:p-6 w-full max-w-sm bg-gray-50 shadow-sm font-sans transition-all cursor-pointer relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 group">
      <Link
        to={`/restaurant/${resdata.id}`}
        className="decoration-none text-inherit"
      >
        <div className="relative w-full h-32 md:h-48 rounded-md overflow-hidden mb-3">
          <img
            src={resdata?.image}
            alt={resdata?.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-xs md:text-sm font-medium flex items-center gap-1 shadow-md">
            ⭐ {resdata?.rating}
          </div>
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-xs font-medium">
            🕐 {resdata?.deliveryTime}
          </div>
        </div>

        <div className="p-0">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 m-0 mb-1 md:mb-2 leading-tight">{resdata?.name}</h3>
          <p className="text-xs md:text-sm text-gray-500 m-0 mb-2 md:mb-4 leading-relaxed line-clamp-2">{resdata?.cuisine}</p>
        </div>
      </Link>

      <div className="flex justify-between items-center pt-1 md:pt-2 border-t border-gray-200">
        <p className="text-xs md:text-base font-semibold text-orange-500 m-0">{resdata?.costForTwo} for two</p>
        <button
          className="px-1.5 py-0.5 md:px-3 md:py-1.5 bg-orange-500 text-white border-none rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all shadow-sm hover:bg-orange-600 hover:scale-105 group-hover:bg-orange-600"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem({
              id: resdata.id,
              name: resdata.name,
              price: parseInt(resdata.costForTwo.replace('₹', '').replace(' for two', '')) / 2,
              image: resdata.image
            });
          }}
        >
          Add +
        </button>
      </div>
    </div>
  );
}

export default Card;