import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardScreen() {
  const { setUser } = useAuth();

  return (
    <LinearGradient
      colors={[COLORS.bgTop, COLORS.bgBottom]}
      style={styles.container}
    >
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.subtitle}>🎉 Login Successful!</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => setUser(null)}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },
});
