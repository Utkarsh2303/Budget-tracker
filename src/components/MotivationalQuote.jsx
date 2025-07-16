import { useEffect, useState, useRef } from 'react';
import { useBudget } from './BudgetContext';

const quoteData = {
  discipline: [
    "🧠 Don't go broke trying to look rich.",
    "💸 A budget is telling your money where to go instead of wondering where it went.",
    "📉 Budgeting isn't restriction. It's freedom from worry.",
    "🚫 Overspending now steals from your future.",
    "📏 Financial discipline is self-respect in action.",
    "💡 Stop buying things to impress people you don’t like.",
    "🧾 Every rupee counts, especially the invisible ones.",
    "🎭 Flashy lifestyle is not equal to wealth.",
    "🛑 Pause before you swipe.",
    "🚦 Discipline is the bridge between goals and spending."
  ],
  savings: [
    "💰 Save money and money will save you.",
    "🎯 A penny saved is a penny earned.",
    "📈 Wealth is the ability to fully experience life.",
    "💡 Saving is the first step toward investing.",
    "🏦 Your savings are your superpower.",
    "🪙 The goal isn’t more money, it’s more freedom.",
    "📉 Avoid impulse, embrace intent.",
    "🔐 Savings give you options.",
    "⏳ Small savings today become big opportunities tomorrow.",
    "🧱 Brick by brick, savings build your empire."
  ],
  smart: [
    "💡 Budgeting is telling your money where to go.",
    "📊 Know where your money went, before it leaves.",
    "🔍 Spending wisely is earning silently.",
    "🧠 Think before you tap.",
    "🔧 Smart people budget. Smarter people stick to it.",
    "📅 Monthly plans make yearly dreams.",
    "🎯 Strategy beats salary.",
    "📈 Track to grow.",
    "💬 Your money should obey you, not confuse you.",
    "📦 Organize money like you organize life."
  ]
};

export default function MotivationalQuote() {
  const { income, expenses } = useBudget();
  const [quote, setQuote] = useState('');
  const [favorites, setFavorites] = useState([]);
  const audioRef = useRef(null);

  const pickQuote = () => {
    const category =
      income === 0
        ? 'discipline'
        : expenses > income
        ? 'discipline'
        : expenses < income * 0.5
        ? 'savings'
        : 'smart';

    const quotes = quoteData[category];
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };

  const loadQuote = () => {
    const newQuote = pickQuote();
    setQuote(newQuote);
    localStorage.setItem('motivationalQuote', newQuote);
    localStorage.setItem('quoteDate', new Date().toDateString());

    // 🔊 Play audio if loaded
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // Load today's quote or pick a new one
    const stored = localStorage.getItem('motivationalQuote');
    const storedDate = localStorage.getItem('quoteDate');
    const today = new Date().toDateString();

    if (stored && storedDate === today) {
      setQuote(stored);
    } else {
      loadQuote();
    }

    // Load favorites
    const favs = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    setFavorites(favs);
  }, [income, expenses]);

  const handleSaveFavorite = () => {
    if (!favorites.includes(quote)) {
      const updated = [...favorites, quote];
      setFavorites(updated);
      localStorage.setItem('favoriteQuotes', JSON.stringify(updated));
    }
  };

  return (
    <div
      className="relative mt-6 rounded-xl overflow-hidden shadow-md p-6 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563306406-4bbf91d98a2b?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >

     

      <div className="bg-black bg-opacity-60 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">✨ Money Motivation</h2>
        <p className="italic mb-3">"{quote}"</p>

        <div className="flex gap-4">
          
          <button
            onClick={loadQuote}
            className="text-sm bg-white hover:bg-gray-200 text-black font-semibold px-3 py-1 rounded"
          >
            ⏩ Show Another Quote
          </button>
        </div>
      </div>
    </div>
  );
}
