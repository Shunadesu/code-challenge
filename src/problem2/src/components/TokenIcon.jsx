import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const TOKENS_BASE_URL = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

const getTokenIcon = async (currency) => {
    try {
        const response = await axios.get(`${TOKENS_BASE_URL}/${currency}.svg`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching icon for ${currency}:`, error.message);
        return null;
    }
};

const TokenIcon = ({ currency }) => {
    const [iconSvg, setIconSvg] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(false); // Track error state

    useEffect(() => {
        const fetchIcon = async () => {
            const svg = await getTokenIcon(currency);
            if (svg) {
                setIconSvg(svg);
                setError(false);
            } else {
                setError(true);
            }
            setLoading(false);
        };

        if (currency) {
            // Start loading the icon
            fetchIcon();

            // Set a timeout for 5 seconds to handle the failure case
            const timeout = setTimeout(() => {
                setLoading(false);  // Stop loading after 5 seconds
                if (!iconSvg) {
                    setError(true); // Show fail icon if the icon is still not loaded
                }
            }, 5000);

            return () => clearTimeout(timeout); // Cleanup timeout on component unmount or change
        }
    }, [currency, iconSvg]); // Added iconSvg as dependency to detect changes

    // Show loading text if still fetching the icon
    if (loading) {
        return <span>Loading...</span>;
    }

    // If there's an error (icon didn't load), show the fail icon
    if (error) {
        return (
            <span
                className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white"
                role="img" 
                aria-label="Fail"
            />                
        );
    }

    // Render the SVG icon once it's successfully fetched
    return (
        <div
            className="token-icon"
            dangerouslySetInnerHTML={{ __html: iconSvg }} // Render raw SVG
        />
    );
};

TokenIcon.propTypes = {
    currency: PropTypes.string.isRequired,
};

export default TokenIcon;
