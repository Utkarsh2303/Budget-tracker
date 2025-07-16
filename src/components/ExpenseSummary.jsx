import { useMemo, useState } from 'react';
import { useBudget } from './BudgetContext';

export default function ExpenseSummary() {
  const { transactions } = useBudget();
  const [refreshKey, setRefreshKey] = useState(0); // To trigger recomputation

  const summaryText = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');

    if (expenses.length < 3) return null; // Show only if 3+ expenses

    // Sum per category
    const categoryTotals = {};
    expenses.forEach(tx => {
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + parseFloat(tx.amount);
    });

    // Sort categories
    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    // Find highest individual expense
    const highestExpense = expenses.reduce((max, tx) =>
      parseFloat(tx.amount) > parseFloat(max.amount) ? tx : max,
    { amount: 0 });

    // Build sentence
    let summary = `You spent the most on ${sortedCategories[0][0]} (₹${sortedCategories[0][1].toFixed(2)})`;
    if (sortedCategories[1]) {
      summary += `, followed by ${sortedCategories[1][0]} (₹${sortedCategories[1][1].toFixed(2)}).`;
    } else {
      summary += `.`;
    }

    if (highestExpense.amount > 0) {
      summary += ` Your highest expense was ₹${parseFloat(highestExpense.amount).toFixed(2)} on "${highestExpense.note}".`;
    }

    return summary;
  }, [transactions, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1); // Triggers re-generation
  };

  if (!summaryText) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-2 text-yellow-700">Where Did My Money Go?</h2>
      <p className="text-gray-800">{summaryText}</p>
      <button
        onClick={handleRefresh}
        className="mt-3 text-sm text-yellow-700 hover:underline"
      >
        🔄 Refresh Summary
      </button>
    </div>
  );
}
