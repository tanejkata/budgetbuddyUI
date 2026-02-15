import LoginScreen from "./src/screens/auth/LoginScreen";

export default function App() {
  return <LoginScreen />;
}

import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { TransactionProvider } from "./src/context/TransactionContext";

export default function App() {
  return (
    <TransactionProvider>
      <RootNavigator />
    </TransactionProvider>
  );
}

