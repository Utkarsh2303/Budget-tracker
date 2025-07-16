// src/pages/Analytics.jsx
import { useBudget } from '../components/BudgetContext';
import MotivationalQuote from './MotivationalQuote';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Analytics() {
  const { transactions } = useBudget();

  // Prepare data for the wave chart (only expenses)
  const data = transactions
    .filter(tx => tx.type === 'expense')
    .map((tx, index) => ({
      name: tx.date + ' #' + (index + 1),
      amount: parseFloat(tx.amount),
    }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Expense Analytics</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No expense data to visualize yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#f87171"
              fillOpacity={1}
              fill="url(#colorExpense)"
              dot={{ stroke: '#f87171', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* 🌟 Add Motivational Quote Section */}
      <MotivationalQuote />
    </div>
  );
}
