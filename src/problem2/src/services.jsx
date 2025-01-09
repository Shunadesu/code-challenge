import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const TOKENS_BASE_URL = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

const getTokenIcon = async (currency) => {
    try {
        // Construct the URL for the token icon
        const response = await axios.get(`${TOKENS_BASE_URL}/${currency}.svg`, {
            responseType: "text", // Ensure the response is treated as plain text for SVG
        });
        // console.log(response.data)
        return response.data; // SVG content
    } catch (error) {
        console.error(`Error fetching icon for ${currency}:`, error.message);
        return null;
    }
};
const TokenIcon = ({ currency }) => {
    const [iconSvg, setIconSvg] = useState(null);

    useEffect(() => {
        const fetchIcon = async () => {
            const svg = await getTokenIcon(currency);
            console.log(svg)
            setIconSvg(svg);
        };

        if (currency) {
            fetchIcon();
        }
    }, [currency]);

    if (!iconSvg) {
        return <span>Loading icon...</span>; // Placeholder while fetching
    }

    return (
        <img
            src={iconSvg}
            className="token-icon"
        />
    );
};
TokenIcon.propTypes = {
    currency: PropTypes.string.isRequired,
};

export default TokenIcon;
