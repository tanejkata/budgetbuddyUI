import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AddTransactionScreen from "../screens/transactions/AddTransactionScreen";
import TransactionsScreen from "../screens/transactions/TransactionsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AboutUsScreen from "../screens/profile/AboutUsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="About" component={AboutUsScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        unmountOnBlur: false,

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

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "AddTransaction") {
            iconName = "add-circle-outline";
          } else if (route.name === "Transactions") {
            iconName = "list-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
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

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}