import { useState, useEffect } from "react";
import { fetchMetalPrices } from "../../api/metalApi.js";

const useMetalPrices = () => {
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const getMetalPrices = async () => {
            try {
                setLoading(true);
                const data = await fetchMetalPrices();
                if (isMounted) setPrices(data);
            } catch (err) {
                if (isMounted) setError("Failed to fetch metal prices. Retrying...");
                setTimeout(() => setRetry((prev) => prev + 1), 3000); // Retry after 3 seconds
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        getMetalPrices();
        return () => (isMounted = false);
    }, [retry]);

    return { prices, loading, error };
};

export default useMetalPrices;
