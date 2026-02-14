import React, { createContext, useState } from "react";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
} from "../services/transactionService";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (params) => {
    const data = await getTransactions(params);
    setTransactions(data.transactions || data);
  };

  const addTransaction = async (payload) => {
    const data = await createTransaction(payload);
    setTransactions((prev) => [data.transaction, ...prev]);
  };

  const editTransaction = async (id, payload) => {
    const data = await updateTransaction(id, payload);
    setTransactions((prev) =>
      prev.map((item) => (item._id === id ? data.transaction : item))
    );
  };

  const removeTransaction = async (id) => {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        addTransaction,
        editTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
