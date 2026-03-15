import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/dashboard/DashboardScreen";
import MonthlyBreakdownScreen from "../screens/budget/MonthlyBreakdownScreen";
import RemainingBudgetScreen from "../screens/budget/RemainingBudgetScreen";

import AddTransactionScreen from "../screens/transactions/AddTransactionScreen";
import TransactionsScreen from "../screens/transactions/TransactionsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CategoryTransactionsScreen from "../screens/transactions/CategoryTransactionsScreen";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Dashboard Stack
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardScreen} />

      <Stack.Screen
        name="MonthlyBreakdown"
        component={MonthlyBreakdownScreen}
      />
      <Stack.Screen name="RemainingBudget" component={RemainingBudgetScreen} />

      <Stack.Screen name="CategoryTransactions" component={CategoryTransactionsScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#999",

        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#F6CDE2",
          height: 70,
          paddingBottom: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "AddTransaction") {
            iconName = "add-circle-outline";
          } else if (route.name === "Transactions") {
            iconName = "list-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{ tabBarLabel: "Home" }}
      />

      <Tab.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ tabBarLabel: "Add" }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ tabBarLabel: "Transactions" }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
