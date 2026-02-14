import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../constants/colors";

export default function CustomButton({ title, onPress, loading = false, variant = "primary" }) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={loading}
      style={[styles.button, isPrimary ? styles.primary : styles.secondary, loading ? styles.disabled : null]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: colors.text,
  },
});
