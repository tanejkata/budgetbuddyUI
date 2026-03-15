import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Weak Password",
        "New password must be at least 6 characters long."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "New password and confirm password do not match."
      );
      return;
    }

    Alert.alert("Success", "Password set successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const PasswordInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    toggleSecure,
  }) => (
    <View style={styles.inputBlock}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B8A8B0"
          secureTextEntry={secureTextEntry}
        />

        <TouchableOpacity onPress={toggleSecure} style={styles.eyeButton}>
          <Feather
            name={secureTextEntry ? "eye-off" : "eye"}
            size={18}
            color="#9C8C94"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerIconButton}
          >
            <Ionicons name="chevron-back" size={22} color="#5B4B55" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Change Password</Text>

          <View style={styles.headerIconPlaceholder} />
        </View>

        {/* Main Card */}
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.lockCircle}>
              <Ionicons name="lock-closed" size={28} color="#FFFFFF" />
            </View>

            <Text style={styles.title}>Update Your Password</Text>
            <Text style={styles.subtitle}>
              Keep your Buddy Budget account secure with a strong password.
            </Text>

            <PasswordInput
              label="Old Password"
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Enter old password"
              secureTextEntry={!showOldPassword}
              toggleSecure={() => setShowOldPassword(!showOldPassword)}
            />

            <PasswordInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry={!showNewPassword}
              toggleSecure={() => setShowNewPassword(!showNewPassword)}
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry={!showConfirmPassword}
              toggleSecure={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.85}
              onPress={handleChangePassword}
            >
              <Text style={styles.saveButtonText}>Save Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDEFF5",
  },
  container: {
    flex: 1,
    backgroundColor: "#FDEFF5",
  },
  header: {
    height: 64,
    backgroundColor: "#FFF8FB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5DDE8",
  },
  headerIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F9E7EE",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIconPlaceholder: {
    width: 34,
    height: 34,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3F2F39",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 24,
    shadowColor: "#E8B7CA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  lockCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F7BFD3",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2F2730",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#9D8C95",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  inputBlock: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5E4D57",
    marginBottom: 8,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7FA",
    borderWidth: 1,
    borderColor: "#F4D5E2",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#3F2F39",
  },
  eyeButton: {
    paddingLeft: 8,
  },
  saveButton: {
    backgroundColor: "#F8C9DA",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#253046",
  },
  cancelButton: {
    backgroundColor: "#FCECF3",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5C8D8",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#D94C8A",
  },
});
