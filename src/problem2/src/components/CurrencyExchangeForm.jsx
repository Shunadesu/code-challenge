import { useForm } from "react-hook-form";
import TokenIcon from "./TokenIcon";
import useCurrencyRates from "../hook/useCurrencyRates";
import { useEffect } from "react";

const CurrencyExchangeForm = () => {
    const { currencies, convertedAmount, calculateConversion } = useCurrencyRates();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            amount: "1",
            fromCurrency: "",
            toCurrency: "",
        },
    });


    const onSubmit = (data) => {
        const { amount, fromCurrency, toCurrency } = data;
        calculateConversion(amount, fromCurrency, toCurrency);
    };

     // Handle currency swap and recalculating conversion
     // Watch the form fields for changes
    const amount = watch("amount");
    const selectedFromCurrency = watch("fromCurrency");
    const selectedToCurrency = watch("toCurrency");

    // Trigger conversion on change of amount, fromCurrency, or toCurrency
    useEffect(() => {
        if (amount && selectedFromCurrency && selectedToCurrency) {
            calculateConversion(amount, selectedFromCurrency, selectedToCurrency);
        }
    }, [amount, selectedFromCurrency, selectedToCurrency, calculateConversion]); // Dependency on form values

    // Swap currencies
    const handleSwap = () => {
        setValue("fromCurrency", selectedToCurrency);
        setValue("toCurrency", selectedFromCurrency);
    };

    return (        
            <div className="z-20 transition-all duration-500 max-w-[800px] w-full mx-auto p-6 border border-black bg-white rounded-lg shadow-lg hover:border hover:border-blue-300">
                <h2 className="text-2xl font-bold text-center mb-4">Currency Exchange</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-xl font-medium  mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            {...register("amount", {
                                required: "Amount is required",
                                min: { value: 0, message: "Amount cannot be negative" },
                            })}
                            className={`w-full px-3 py-2 border text-xl ${
                                errors.amount ? "border-red-500" : "border-gray-300"
                            } rounded-lg`}
                            placeholder="Enter amount"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-xl font-medium  mb-1">
                            From
                        </label>
                        <div className="flex items-center space-x-2">
                            {selectedFromCurrency && (
                                <TokenIcon currency={selectedFromCurrency} />
                            )}
                            <select
                                {...register("fromCurrency", { required: "Select a currency" })}
                                className={`w-full px-3 py-2 border text-xl ${
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
                        </div>
                        {errors.fromCurrency && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fromCurrency.message}
                            </p>
                        )}
                    </div>
        
                    <div className="mb-4">
                        <label className="block text-xl font-medium  mb-1">
                            To
                        </label>
                        <div className="flex items-center space-x-2">
                            {selectedToCurrency && (
                                <TokenIcon currency={selectedToCurrency} />
                            )}
                            <select
                                {...register("toCurrency", { required: "Select a currency" })}
                                className={`w-full px-3 py-2 border text-xl ${
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
                        </div>
                        {errors.toCurrency && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.toCurrency.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 text-xl bg-black text-white py-2 px-4 rounded-lg hover:bg-[#2a2929]"
                    >
                        Convert
                    </button>
                </form>

                {convertedAmount !== null && (
                    <div className=" mt-4 p-4 gap-4 bg-gray-50 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold">Converted Amount:</h3>
                        <div className="flex justify-center items-center gap-4">
                            <p className="text-xl flex items-center justify-center space-x-2">
                                <span>{`${watch("amount")} ${watch("fromCurrency")}`}</span>
                                <TokenIcon currency={watch("fromCurrency")} />
                                <span className="text-lg">=</span>
                                <span>{`${convertedAmount} ${watch("toCurrency")}`}</span>
                                <TokenIcon currency={watch("toCurrency")} />
                            </p>

                            {/* Swap Button */}
                            <div>
                                <button
                                    type="button"
                                    onClick={handleSwap}
                                    className=" py-2 px-4 rounded-full transition"
                                >
                                    <span className="w-full text-xl bg-black text-white py-2 px-4 rounded-lg hover:bg-[#2a2929]">
                                        Swap
                                    </span> {/* Swap icon */}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
};

export default CurrencyExchangeForm;
