import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import SocialButton from "../../components/SocialButton";
import { COLORS } from "../../constants/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      colors={[COLORS.bgTop, COLORS.bgBottom]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Cute Background Hearts */}
          <View style={styles.heartsLayer}>
            <Ionicons name="heart" size={18} color="#FFD1E6" style={[styles.heart, { top: 24, left: 30 }]} />
            <Ionicons name="heart" size={14} color="#FFDDEE" style={[styles.heart, { top: 80, right: 42 }]} />
            <Ionicons name="heart" size={16} color="#FFD1E6" style={[styles.heart, { top: 210, right: 30 }]} />
            <Ionicons name="heart" size={12} color="#FFE5F2" style={[styles.heart, { top: 180, left: 55 }]} />
          </View>

          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome{"\n"}Back!</Text>
            <Text style={styles.subtitle}>So happy to see you again ♡</Text>
          </View>

          {/* Inputs */}
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={18} color={COLORS.subText} style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#F2A8CD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.subText} style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#F2A8CD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.8}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity activeOpacity={0.85} style={styles.loginBtn}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginBtnInner}
              >
                <Text style={styles.loginText}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <SocialButton onPress={() => {}}>
                <FontAwesome5 name="google" size={20} color="#EA4335" />
              </SocialButton>

              <SocialButton onPress={() => {}}>
                <FontAwesome5 name="apple" size={22} color="#111" />
              </SocialButton>

              {/* Optional: If you want Facebook exactly like mockups */}
              <SocialButton onPress={() => {}}>
                <FontAwesome5 name="facebook-f" size={20} color="#1877F2" />
              </SocialButton>
            </View>

            {/* Bottom link */}
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Don’t have an account? </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation?.navigate?.("Register")}
              >
                <Text style={styles.signUp}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },

  heartsLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 260,
  },
  heart: {
    position: "absolute",
    opacity: 0.8,
  },

  header: {
    alignItems: "center",
    marginBottom: 26,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 44,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.subText,
    textAlign: "center",
  },

  form: {
    marginTop: 14,
  },
  inputWrap: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  forgotWrap: {
    alignSelf: "flex-end",
    marginTop: -6,
    marginBottom: 14,
  },
  forgot: {
    fontSize: 12,
    color: COLORS.subText,
  },

  loginBtn: {
    borderRadius: 18,
    overflow: "hidden",
    marginTop: 4,
  },
  loginBtnInner: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#F7D6E8",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#F2A8CD",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginBottom: 18,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  bottomText: {
    fontSize: 12,
    color: "#9A9A9A",
  },
  signUp: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
