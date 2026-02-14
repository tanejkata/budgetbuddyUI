import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>So happy to see you again ♡</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#d98cb3"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#d98cb3"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity>
        <LinearGradient
          colors={["#ff4da6", "#ff66b3"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6f0",
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff3399",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#cc6699",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    marginTop: 25,
    textAlign: "center",
    color: "#888",
  },
  signupLink: {
    color: "#ff3399",
    fontWeight: "bold",
  },
});
