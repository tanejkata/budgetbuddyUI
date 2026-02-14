import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { colors } from "../../constants/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email is required";
    if (!password.trim()) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // TODO: connect to backend later (authService.login)
      // await authService.login({ email, password });

      // For now: fake success
      setTimeout(() => {
        setLoading(false);
        // Example: navigate to main tabs
        navigation.replace("MainTabs");
      }, 700);
    } catch (e) {
      setLoading(false);
      setErrors({ general: "Login failed. Please try again." });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>BuddyBudget</Text>
          <Text style={styles.tagline}>Track spending. Stay cute. Stay on budget 💗</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to continue</Text>

          {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity activeOpacity={0.8} style={styles.forgotWrap}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <CustomButton title="Log In" onPress={onLogin} loading={loading} />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <CustomButton
            title="Create an account"
            variant="secondary"
            onPress={() => navigation.navigate("Register")}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to BuddyBudget’s Terms & Privacy.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  header: { alignItems: "center", marginBottom: 22 },
  logo: { fontSize: 34, fontWeight: "900", color: colors.text },
  tagline: { marginTop: 8, fontSize: 13, color: colors.subtext, textAlign: "center" },

  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  title: { fontSize: 22, fontWeight: "900", color: colors.text },
  subtitle: { marginTop: 4, marginBottom: 14, color: colors.subtext, fontSize: 13 },

  generalError: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 13,
  },

  forgotWrap: { alignSelf: "flex-end", marginTop: -6, marginBottom: 14 },
  forgotText: { color: colors.primary, fontWeight: "800", fontSize: 13 },

  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 14 },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: 10, color: colors.subtext, fontWeight: "700", fontSize: 12 },

  footer: { marginTop: 18, textAlign: "center", color: colors.subtext, fontSize: 12 },
});

