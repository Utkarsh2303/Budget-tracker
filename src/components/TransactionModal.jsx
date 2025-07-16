import React, { useState, useEffect } from 'react';
import { useBudget } from '../components/BudgetContext';

const categoryReminders = [
  "📂 Oops! Pick a category so we know where this rupee went.",
  "📦 Expense without a category? That’s a mystery we can’t afford!",
  "📊 Help us track better — choose where this money went.",
  "📁 Organize your expense by picking a category.",
  "🧾 Every rupee needs a label. Select a category.",
  "💡 Tag it right to make insights bright.",
  "🪙 Budget without labels is like chai without sugar!",
  "🎯 Missed the category? Let’s fix that before saving!"
];

export default function TransactionModal({ type: initialType = null }) {
  const { setShowModal, addTransaction } = useBudget();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const isLockedType = !!initialType;

  useEffect(() => {
    if (initialType) setType(initialType);
  }, [initialType]);

  const save = () => {
    setError('');

    if (!amount) {
      setError("Please enter an amount.");
      return;
    }

    if (type === 'expense' && !category) {
      const index = Math.floor(Math.random() * categoryReminders.length);
      setError(categoryReminders[index]);
      return;
    }

    addTransaction({ amount, type, category, note });
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[90%] max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            New {type === 'income' ? 'Income' : 'Expense'} Entry
          </h2>
          <button onClick={() => setShowModal(false)}>✕</button>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Type Toggle (Only If Not Locked) */}
        {!isLockedType && (
          <div className="flex mb-3">
            <button
              className={`flex-1 py-2 ${type === 'expense' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
            <button
              className={`flex-1 py-2 ${type === 'income' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
          </div>
        )}

        {/* Locked Type Display */}
        {isLockedType && (
          <div className="mb-3 px-3 py-2 bg-gray-100 text-sm rounded text-center text-gray-600">
            Type: <strong>{type.toUpperCase()}</strong>
          </div>
        )}

        {/* Category Dropdown with Red Error Style */}
        {type === 'expense' && (
          <select
            className={`w-full px-3 py-2 mb-3 rounded ${
              error && !category ? 'border-red-500 bg-red-50' : 'border border-gray-300'
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Purchases">Purchases</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
          </select>
        )}

        {/* Note Input */}
        <input
          type="text"
          placeholder="Note"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            onClick={save}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
