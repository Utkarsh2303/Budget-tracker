import { useBudget } from './BudgetContext';
import TransactionCard from './TransactionCard';
import ExpenseSummary from './ExpenseSummary';

export default function History() {
  const { transactions, deleteTransaction, clearAllTransactions } = useBudget();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Transaction History</h1>

      {transactions.map((tx, idx) => (
        <TransactionCard key={idx} tx={tx} onDelete={() => deleteTransaction(idx)} />
      ))}

      {transactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions yet.</p>
      )}

      {transactions.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={clearAllTransactions}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Clear All Transactions
          </button>
        </div>
      )}

      
      <ExpenseSummary />
    </div>
  );
}
