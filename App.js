import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { BudgetProvider } from "./src/context/BudgetContext";
import { TransactionProvider } from "./src/context/TransactionContext";
import { CategoryProvider } from "./src/context/CategoryContext";
import { InsightProvider } from "./src/context/InsightContext";

export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <BudgetProvider>
          <TransactionProvider>
            <InsightProvider>
              <RootNavigator />
            </InsightProvider>
          </TransactionProvider>
        </BudgetProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
