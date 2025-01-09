import  { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const CurrencyExchangeForm = () => {
    const [currencies, setCurrencies] = useState([]);
    const [rates, setRates] = useState({});
    const [convertedAmount, setConvertedAmount] = useState(null);

	const tokenIconBaseUrl = "https://github.com/Switcheo/token-icons/blob/main/tokens";


    // Fetch and process currency rates
    useEffect(() => {
        axios
            .get("https://interview.switcheo.com/prices.json")
            .then((response) => {
                const data = response.data;

                // Group by currency and get the latest price
                const latestRates = {};
                data.forEach((item) => {
                    if (
                        !latestRates[item.currency] ||
                        new Date(item.date) > new Date(latestRates[item.currency].date)
                    ) {
                        latestRates[item.currency] = item;
                    }
                });

                // Extract just the price for easier use
                const prices = {};
                Object.keys(latestRates).forEach((currency) => {
                    prices[currency] = latestRates[currency].price;
                });

                setRates(prices);
                setCurrencies(Object.keys(prices));
            })
            .catch((error) => console.error("Error fetching rates:", error));
    }, []);



    // react-hook-form setup
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            amount: "1",
            fromCurrency: "",
            toCurrency: "",
        },
    });

    const onSubmit = (data) => {
        const { amount, fromCurrency, toCurrency } = data;

        if (!rates[fromCurrency] || !rates[toCurrency]) return;

        const rateFromBase = rates[fromCurrency];
        const rateToBase = rates[toCurrency];
        const converted = (amount / rateFromBase) * rateToBase;

        setConvertedAmount(converted.toFixed(4));
    };

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="max-w-[800px] w-full mx-auto p-6 border border-black bg-white rounded-lg shadow-lg hover:border hover:border-blue-300">
                <h2 className="text-2xl font-bold text-center mb-4">Currency Exchange</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            {...register("amount", {
                                required: "Amount is required",
                                min: { value: 0, message: "Amount cannot be negative" },
                            })}
                            className={`w-full px-3 py-2 border ${
                                errors.amount ? "border-red-500" : "border-gray-300"
                            } rounded-lg`}
                            placeholder="Enter amount"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From
                        </label>
                        <select
                            {...register("fromCurrency", { required: "Select a currency" })}
                            className={`w-full px-3 py-2 border ${
                                errors.fromCurrency ? "border-red-500" : "border-gray-300"
                            } rounded-lg`}
                        >
                            <option value="">Select currency</option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                    
                                </option>
                            ))}
                        </select>
                        {errors.fromCurrency && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fromCurrency.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To
                        </label>
                        <select
                            {...register("toCurrency", { required: "Select a currency" })}
                            className={`w-full px-3 py-2 border ${
                                errors.toCurrency ? "border-red-500" : "border-gray-300"
                            } rounded-lg`}
                        >
                            <option value="">Select currency</option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                        <div className="absolute top-2 right-2">
                            {currencies.includes(watch("toCurrency")) && (
                                <img
                                    src={`${tokenIconBaseUrl}/${watch("toCurrency")}.svg`}
                                    alt={watch("toCurrency")}
                                    className="w-6 h-6"
                                />
                            )}
                        </div>
                        {errors.toCurrency && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.toCurrency.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Convert
                    </button>
                </form>

                {convertedAmount !== null && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Converted Amount</h3>
                        <p className="text-xl font-bold">{convertedAmount}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyExchangeForm;
