import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.js";
import { theme } from "../styles/theme.js";
import { fetchRestaurantMenu } from "../services/swiggyAPI.js";
import ShimmerUI from "../utils/ShimmerUI.jsx";

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        setIsLoading(true);
        const data = await fetchRestaurantMenu(id);
        setRestaurant(data ? data[id] : null);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadMenu();
  }, [id]);

  if (isLoading) {
    return <ShimmerUI />;
  }

  if (!restaurant) {
    return (
      <div style={{
        padding: theme.spacing.xxxl,
        textAlign: "center",
        color: theme.colors.textLight
      }}>
        <h2>{error || "Restaurant not found"}</h2>
        <button
          style={{
            padding: theme.spacing.sm + " " + theme.spacing.lg,
            backgroundColor: theme.colors.primary,
            color: "white",
            border: "none",
            borderRadius: theme.borderRadius.md,
            cursor: "pointer",
            marginTop: theme.spacing.md
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const categories = ["All", ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = selectedCategory === "All"
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const headerStyle = {
    position: "relative",
    height: "300px",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${restaurant.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "flex-end",
    padding: theme.spacing.xl
  };

  const headerContentStyle = {
    color: "white",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%"
  };

  const backButtonStyle = {
    padding: theme.spacing.sm + " " + theme.spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: theme.borderRadius.md,
    cursor: "pointer",
    marginBottom: theme.spacing.lg,
    backdropFilter: "blur(10px)",
    transition: theme.transitions.fast
  };

  const restaurantNameStyle = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    margin: `0 0 ${theme.spacing.sm} 0`
  };

  const restaurantMetaStyle = {
    display: "flex",
    gap: theme.spacing.lg,
    fontSize: theme.typography.fontSize.lg,
    opacity: 0.9
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: theme.spacing.xl
  };

  const categoryTabsStyle = {
    display: "flex",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
    borderBottom: `1px solid ${theme.colors.border}`,
    overflowX: "auto",
    paddingBottom: theme.spacing.xs
  };

  const categoryTabStyle = {
    padding: theme.spacing.sm + " " + theme.spacing.lg,
    backgroundColor: "transparent",
    border: "none",
    borderRadius: theme.borderRadius.md + " " + theme.borderRadius.md + " 0 0",
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textLight,
    transition: theme.transitions.fast,
    whiteSpace: "nowrap"
  };

  const activeTabStyle = {
    ...categoryTabStyle,
    color: theme.colors.primary,
    backgroundColor: "rgba(252, 128, 25, 0.1)",
    borderBottom: `2px solid ${theme.colors.primary}`
  };

  const menuGridStyle = {
    display: "grid",
    gap: theme.spacing.lg
  };

  const menuItemStyle = {
    display: "flex",
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.sm,
    transition: theme.transitions.fast,
    border: `1px solid ${theme.colors.border}`
  };

  const menuItemImageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: theme.borderRadius.md,
    objectFit: "cover",
    flexShrink: 0
  };

  const menuItemContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const menuItemHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm
  };

  const menuItemNameStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs
  };

  const vegIndicatorStyle = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold"
  };

  const vegStyle = {
    backgroundColor: "#27ae60",
    color: "white"
  };

  const nonVegStyle = {
    backgroundColor: "#e74c3c",
    color: "white"
  };

  const menuItemDescriptionStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
    margin: `0 0 ${theme.spacing.md} 0`,
    lineHeight: "1.4"
  };

  const menuItemFooterStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const menuItemPriceStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    margin: 0
  };

  const addButtonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.primary,
    color: "white",
    border: "none",
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: "pointer",
    transition: theme.transitions.fast,
    boxShadow: theme.shadows.sm
  };

  const ratingBadgeStyle = {
    backgroundColor: "#27ae60",
    color: "white",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing.xs
  };

  return (
    <div>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <button
            style={backButtonStyle}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            ← Back
          </button>
          <h1 style={restaurantNameStyle}>{restaurant.name}</h1>
          <div style={restaurantMetaStyle}>
            <span>{restaurant.cuisine}</span>
            <span>⭐ {restaurant.rating}</span>
            <span>🕐 {restaurant.deliveryTime}</span>
            <span>💰 {restaurant.costForTwo} for two</span>
          </div>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={categoryTabsStyle}>
          {categories.map((category) => (
            <button
              key={category}
              style={selectedCategory === category ? activeTabStyle : categoryTabStyle}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={menuGridStyle}>
          {filteredMenu.map((item) => (
            <div key={item.id} style={menuItemStyle}>
              <img
                src={item.image}
                alt={item.name}
                style={menuItemImageStyle}
              />
              <div style={menuItemContentStyle}>
                <div>
                  <div style={menuItemHeaderStyle}>
                    <h3 style={menuItemNameStyle}>
                      <span
                        style={{
                          ...vegIndicatorStyle,
                          ...(item.isVeg ? vegStyle : nonVegStyle)
                        }}
                      >
                        {item.isVeg ? "🌱" : "🍗"}
                      </span>
                      {item.name}
                    </h3>
                    <div style={ratingBadgeStyle}>
                      ⭐ {item.rating}
                    </div>
                  </div>
                  <p style={menuItemDescriptionStyle}>{item.description}</p>
                </div>
                <div style={menuItemFooterStyle}>
                  <p style={menuItemPriceStyle}>₹{item.price}</p>
                  <button
                    style={addButtonStyle}
                    onClick={() => addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      restaurantId: id,
                      restaurantName: restaurant.name
                    })}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = theme.colors.primaryDark;
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = theme.colors.primary;
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;