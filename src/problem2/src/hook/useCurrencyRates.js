// src/hooks/useCurrencyRates.js
import { useState, useEffect } from "react";
import axios from "axios";

const useCurrencyRates = () => {
    const [currencies, setCurrencies] = useState([]);
    const [rates, setRates] = useState({});
    const [convertedAmount, setConvertedAmount] = useState(null);

    // Fetch and process currency rates
    useEffect(() => {
        axios
            .get("https://interview.switcheo.com/prices.json")
            .then((response) => {
                const data = response.data;

                const latestRates = {};
                data.forEach((item) => {
                    if (
                        !latestRates[item.currency] ||
                        new Date(item.date) > new Date(latestRates[item.currency].date)
                    ) {
                        latestRates[item.currency] = item;
                    }
                });

                const prices = {};
                Object.keys(latestRates).forEach((currency) => {
                    prices[currency] = latestRates[currency].price;
                });

                setRates(prices);
                setCurrencies(Object.keys(prices));
            })
            .catch((error) => console.error("Error fetching rates:", error));
    }, []);

    const calculateConversion = (amount, fromCurrency, toCurrency) => {
        if (!rates[fromCurrency] || !rates[toCurrency]) return;

        const rateFromBase = rates[fromCurrency];
        const rateToBase = rates[toCurrency];
        const converted = (amount / rateFromBase) * rateToBase;

        setConvertedAmount(converted.toFixed(4));
    };

    return {
        currencies,
        rates,
        convertedAmount,
        calculateConversion,
    };
};
export default useCurrencyRates;
