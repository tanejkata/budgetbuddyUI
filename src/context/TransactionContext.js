import React, { createContext, useContext, useMemo, useState } from "react";

const TransactionContext = createContext(null);

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used inside TransactionProvider");
  return ctx;
};

// Helpers
const monthKey = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`; // ex: 2026-01
};

const formatMonthTitle = (key) => {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};

export function TransactionProvider({ children }) {
  // Start with a *few* seed items so UI isn’t empty, but it’s not “hardcoded monthly totals”
  // These are just sample transactions — delete anytime.
  const [transactions, setTransactions] = useState([
    {
      id: "t1",
      type: "Expense",
      category: "Food",
      amount: 12.5,
      note: "Snack",
      date: new Date().toISOString(),
    },
    {
      id: "t2",
      type: "Expense",
      category: "Shopping",
      amount: 35,
      note: "Skincare",
      date: new Date().toISOString(),
    },
  ]);

  const addTransaction = ({ type, category, amount, note, date }) => {
    const newTx = {
      id: String(Date.now()),
      type,
      category,
      amount: Number(amount) || 0,
      note: note || "",
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const getMonths = useMemo(() => {
    const keys = new Set(transactions.map((t) => monthKey(t.date)));
    return Array.from(keys).sort().reverse(); // newest first
  }, [transactions]);

  const getMonthlySummary = (targetMonthKey) => {
    const monthTx = transactions.filter((t) => monthKey(t.date) === targetMonthKey);

    let income = 0;
    let expense = 0;

    const byCategory = {}; // { Food: { expense: 0, income:0, count:0 } }

    for (const t of monthTx) {
      const cat = t.category || "Other";
      if (!byCategory[cat]) byCategory[cat] = { income: 0, expense: 0, count: 0 };

      byCategory[cat].count += 1;

      if (t.type === "Income") {
        income += t.amount;
        byCategory[cat].income += t.amount;
      } else {
        expense += t.amount;
        byCategory[cat].expense += t.amount;
      }
    }

    const net = income - expense;

    // Turn categories into a sorted list by expense desc
    const categories = Object.entries(byCategory)
      .map(([name, v]) => ({
        name,
        expense: v.expense,
        income: v.income,
        count: v.count,
      }))
      .sort((a, b) => b.expense - a.expense);

    return {
      monthKey: targetMonthKey,
      monthTitle: formatMonthTitle(targetMonthKey),
      income,
      expense,
      net,
      categories,
      transactions: monthTx,
    };
  };

  const value = {
    transactions,
    addTransaction,
    getMonths,
    getMonthlySummary,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}
