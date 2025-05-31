import { useEffect, useState } from "react";
import { Card, TextInput, Button, Select, Title, Text } from "@mantine/core";
import { FaExchangeAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../Store/Store";
import {
  getExchangeRates,
  fetchExchangeRates,
  convertCurrency,
} from "../Slice/AccountSlice";

const currencyOptions = [
  { code: "USD", label: "United States Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "INR", label: "Indian Rupee" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "NGN", label: "Nigerian Naira" },
];

const Convert = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [convertedResult, setConvertedResult] = useState<any>(null);
  const exchangeRates = useSelector(fetchExchangeRates);

  useEffect(() => {
    dispatch(getExchangeRates());
  }, [dispatch]);

  const handleConvert = async () => {
    if (!amount || isNaN(parseFloat(amount)) || fromCurrency === toCurrency) {
      setConvertedResult(null);
      return;
    }

    try {
      const result = await dispatch(
        convertCurrency({
          fromCurrency,
          toCurrency,
          amount: parseFloat(amount),
        })
      ).unwrap();
      setConvertedResult(result);
    } catch (err) {
      console.error("Conversion failed:", err);
    }
  };

  // Filter out same currency in "To"
  const toCurrencyOptions = currencyOptions.filter(
    (c) => c.code !== fromCurrency
  );

  return (
    <div className="flex justify-center items-center min-h-[530px] lg:mt-20 bg-gray-100 px-4">
      <Card shadow="md" padding="lg" radius="md" className="w-full max-w-md bg-white">
        <Title order={3} className="text-center mb-4">
          Currency Converter
        </Title>

        <TextInput
          label="Amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
        />

        <div className="flex justify-between gap-4 mt-4">
          <Select
            label="From"
            data={currencyOptions.map(c => ({ value: c.code, label: `${c.code} - ${c.label}` }))}
            value={fromCurrency}
            onChange={(val) => setFromCurrency(val!)}
            className="w-1/2"
          />
          <Select
            label="To"
            data={toCurrencyOptions.map(c => ({ value: c.code, label: `${c.code} - ${c.label}` }))}
            value={toCurrency === fromCurrency ? "" : toCurrency}
            onChange={(val) => setToCurrency(val!)}
            className="w-1/2"
          />
        </div>

        <Button
          fullWidth
          mt="md"
          leftSection={<FaExchangeAlt />}
          onClick={handleConvert}
          className="mt-6 bg-blue-500 hover:bg-blue-600 transition-all"
        >
          Convert
        </Button>

        {convertedResult && (
          <Text className="text-center mt-6 text-lg font-medium text-green-600">
            {amount} {fromCurrency} = {convertedResult.amount.toFixed(2)} {toCurrency}
          </Text>
        )}

        {exchangeRates && Object.keys(exchangeRates).length > 0 && (
          <div className="mt-6">
            <Title order={5} className="text-gray-700 mb-2">
              Exchange Rates (Base: USD)
            </Title>
            <ul className="text-sm text-gray-600 space-y-1">
              {Object.entries(exchangeRates).map(([code, rate]) => (
                <li key={code}>
                  1 USD = {String(rate)} {code}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Convert;
