import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import './ExchangeRates.css';

const ExchangeRates = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load available currencies
    axios.get('https://localhost:44372/ExchangeRates/currencies')
      .then(response => setCurrencies(response.data))
      .catch(() => setError('Failed to load currencies'));
  }, []);

  useEffect(() => {
    if (selectedCurrency) {
      console.log(`Selected Currency: ${selectedCurrency}`); // הדפסת המטבע הנבחר
      setLoading(true); // Start loading
      setError(''); // Clear previous errors
      console.log("After Set");
      axios.get(`https://localhost:44372/ExchangeRates/exchange_rates/${selectedCurrency}`)
        .then(response => {
          console.log("Response Data: ", response.data); // הדפסת הנתונים המתקבלים
          setExchangeRates(Object.entries(response.data));
          setLoading(false); // End loading
        })
        .catch((err) => {
          console.error("Error: ", err);
          setError('Failed to load exchange rates');
          setLoading(false); // End loading
        });
      console.log("After Axios");
    }
  }, [selectedCurrency]); // Dependency array with selectedCurrency

  const data = exchangeRates.map(([currency, rate]) => ({
    baseCurrency: selectedCurrency,
    currency,
    exchangeRate: rate,
  }));

  const columns = [
    { accessorKey: 'baseCurrency', header: 'Base Currency' },
    { accessorKey: 'currency', header: 'Currency' },
    { accessorKey: 'exchangeRate', header: 'Exchange Rate' },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="exchange-rates-container">
      <h1>Exchange Rates</h1>
      {error && <p className="error">{error}</p>}
      <select
        value={selectedCurrency}
        onChange={e => setSelectedCurrency(e.target.value)}
      >
        <option value="">Select a currency</option>
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      {selectedCurrency && (
        <div className="selected-currency-box">
          <label htmlFor="selected-currency-input">Selected Currency:</label>
          <input
            type="text"
            id="selected-currency-input"
            value={selectedCurrency}
            readOnly
          />
        </div>
      )}

      {selectedCurrency && (
        <div className="currency-display">
          <p>{selectedCurrency}</p>
        </div>
      )}

      {loading ? (
        <p>Loading exchange rates...</p>
      ) : (
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExchangeRates;
