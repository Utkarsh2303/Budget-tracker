import { useBudget } from './BudgetContext';
import TransactionModal from './TransactionModal';
import MotivationalQuote from './MotivationalQuote';
import Goals from './Goals';
import { useState } from 'react';

export default function Home() {
  const { income, expenses, remaining, categories, showModal, setShowModal } = useBudget();
  const [modalType, setModalType] = useState(null); // 'income' or 'expense'

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Budget Planner</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mb-10">
        {/* Income Card */}
        <div className="relative border border-green-500 text-green-600 p-6 rounded">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-2xl">₹{income.toFixed(2)}</p>
          <button
            onClick={() => openModal('income')}
            className="absolute top-2 right-2 bg-green-500 text-white text-lg px-3 py-1 rounded hover:scale-105 transition"
          >
            +
          </button>
        </div>

        {/* Expenses Card */}
        <div className="relative border border-red-500 text-red-500 p-6 rounded">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-2xl">₹{expenses.toFixed(2)}</p>
          <button
            onClick={() => openModal('expense')}
            className="absolute top-2 right-2 bg-red-500 text-white text-lg px-3 py-1 rounded hover:scale-105 transition"
          >
            −
          </button>
        </div>
      </div>

      {/* Categories Breakdown */}
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.keys(categories).map((cat, idx) => (
          <div key={idx} className="border p-4 rounded">
            <h3 className="font-semibold capitalize">{cat}</h3>
            <p>₹{categories[cat].toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Remaining Balance */}
      <div className="mt-6 border border-blue-500 text-blue-600 p-6 rounded text-center bg-blue-50">
        <h2 className="text-lg font-semibold">Remaining Balance</h2>
        <p className="text-2xl font-bold">₹{remaining.toFixed(2)}</p>
      </div>

      

      {/* 🎯 Goals Section with Reminders + Bonus Box */}
      <Goals />

      {/* ➕ Transaction Modal */}
      {showModal && <TransactionModal type={modalType} />}
    </div>
  );
}
