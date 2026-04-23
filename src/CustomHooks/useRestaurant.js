import { useState, useEffect } from "react";
import { fetchRestaurantMenu } from "../services/swiggyAPI.js";

function useRestaurant(resId) {
    const [resInfo, setResInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadRestaurant() {
            if (resId) {
                try {
                    setIsLoading(true);
                    const data = await fetchRestaurantMenu(resId);
                    setResInfo(data ? data[resId] : null);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        loadRestaurant();
    }, [resId]);

    return { resInfo, isLoading, error };
}

export default useRestaurant;