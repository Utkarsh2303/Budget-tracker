export default function TransactionCard({ tx, onDelete }) {
  return (
    <div className="border p-4 rounded mb-4 flex justify-between items-start">
      <div>
        <h3 className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
        </h3>
        <p>Category: {tx.category}</p>
        <p>Note: {tx.note}</p>
        <p className="text-sm text-gray-600">{tx.date}</p>
        <p className={`text-xl font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
          ₹{parseFloat(tx.amount).toFixed(2)}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="ml-4 text-sm text-red-500 hover:text-red-700 font-semibold"
      >
        Delete
      </button>
    </div>
  );
}
