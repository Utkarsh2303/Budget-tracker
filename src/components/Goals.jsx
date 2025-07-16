import { useState, useEffect } from 'react';
import { useBudget } from './BudgetContext';

const reminderQuotes = [
  "💸 Small savings today, big rewards tomorrow.",
  "🎯 Set a goal. Make a plan. Save like a champ.",
  "🚀 Your future self is cheering you on.",
  "📊 Every rupee saved is a brick in your empire.",
  "🔒 Savings is your freedom fund.",
  "🧠 Financial goals = smart adulting.",
  "📅 Skip one treat, move one step closer to your dream.",
  "🌱 Grow slow, grow strong.",
  "🔔 Keep your eyes on the prize, not the price tag.",
  "🎁 Budgeting is a gift to future you.",
  "🔥 Debt-free is the new rich.",
  "💡 Delay = Don't Deny. Just Plan!",
  "🛑 Impulse off. Intent on.",
  "🎉 Your wallet deserves a break too.",
  "🧱 You’re building wealth, not just saving change.",
  "🌄 Dreams are expensive — start saving early.",
  "🛠 Budget fixes broken dreams.",
  "📉 Every unnecessary rupee spent is a goal delayed.",
  "📦 Don't collect things, collect progress.",
  "🥅 Budget goal = life goal.",
  "📈 Even ₹500/month adds up.",
  "🧘 Peace > Purchases.",
  "💪 You're stronger than your cravings.",
  "🧾 Write it down. Save it up.",
  "💼 A rupee saved is a rupee earned."
];

export default function Goals() {
  const { remaining } = useBudget();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', target: '' });
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    setGoals(storedGoals);
    setRandomQuote();
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const getProgress = (goal) => (goal.saved / goal.target) * 100;

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    const updated = [
      ...goals,
      {
        ...newGoal,
        target: parseFloat(newGoal.target),
        saved: 0,
      },
    ];
    setGoals(updated);
    setNewGoal({ title: '', target: '' });
  };

  const updateSavedAmount = (index, value) => {
    const updated = [...goals];
    updated[index].saved = parseFloat(value) || 0;
    setGoals(updated);
  };

  const deleteGoal = (index) => {
    const updated = [...goals];
    updated.splice(index, 1);
    setGoals(updated);
  };

  const setRandomQuote = () => {
    const index = Math.floor(Math.random() * reminderQuotes.length);
    setQuote(reminderQuotes[index]);
  };

  const totalGoalTarget = goals.reduce((acc, g) => acc + g.target, 0);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">🎯 Savings Goals</h2>

      {/* Bonus Alert */}
      {remaining >= totalGoalTarget && goals.length > 0 && (
        <div className="bg-green-100 text-green-800 border border-green-400 rounded p-4 mb-6 text-center font-medium">
          🎉 Congratulations! You’ve saved enough to achieve all your current goals!
        </div>
      )}

      {/* Goal Reminder Quote */}
      <div className="bg-yellow-100 text-yellow-900 border-l-4 border-yellow-400 p-4 rounded mb-6 flex items-start justify-between">
        <div>
          <span className="font-semibold">💬 Reminder:</span> {quote}
        </div>
        <button
          onClick={setRandomQuote}
          className="ml-4 text-sm bg-yellow-300 hover:bg-yellow-400 px-2 py-1 rounded"
        >
          🔁 New Quote
        </button>
      </div>

      {/* Add New Goal */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Goal Title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <input
          type="number"
          placeholder="Target Amount (₹)"
          value={newGoal.target}
          onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <button
          onClick={handleAddGoal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add Goal
        </button>
      </div>

      {/* Goals List */}
      <div className="grid md:grid-cols-2 gap-6">
        {goals.length === 0 ? (
          <p className="text-gray-500">No goals yet. Start by adding one! 💡</p>
        ) : (
          goals.map((goal, i) => (
            <div key={i} className="border p-4 rounded bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{goal.title}</h3>
                <button
                  onClick={() => deleteGoal(i)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌ Delete
                </button>
              </div>
              <p>Target: ₹{goal.target.toFixed(2)}</p>
              <p>Saved: ₹{goal.saved.toFixed(2)}</p>

              <div className="w-full bg-gray-200 h-3 rounded mt-2">
                <div
                  className="h-3 bg-green-500 rounded"
                  style={{ width: `${getProgress(goal)}%` }}
                />
              </div>

              <input
                type="number"
                placeholder="Update saved ₹"
                value={goal.saved}
                onChange={(e) => updateSavedAmount(i, e.target.value)}
                className="mt-2 p-2 border rounded w-full"
              />

              <p className="text-sm mt-1 text-gray-600">
                {getProgress(goal).toFixed(1)}% completed
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
