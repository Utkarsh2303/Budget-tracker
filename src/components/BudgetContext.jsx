import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();
export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTransaction = (tx) => {
    setTransactions([
      ...transactions,
      { ...tx, date: new Date().toLocaleDateString() }
    ]);
  };

  const deleteTransaction = (indexToDelete) => {
    setTransactions(transactions.filter((_, index) => index !== indexToDelete));
  };

  const clearAllTransactions = () => {
    setTransactions([]);
  };

  const income = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const expenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const categories = {};
  transactions
    .filter(tx => tx.type === 'expense')
    .forEach(tx => {
      categories[tx.category] = (categories[tx.category] || 0) + parseFloat(tx.amount);
    });

  return (
    <BudgetContext.Provider value={{
      transactions,
      income,
      expenses,
      remaining: income - expenses,
      addTransaction,
      deleteTransaction,
      clearAllTransactions,
      categories,
      showModal,
      setShowModal
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

