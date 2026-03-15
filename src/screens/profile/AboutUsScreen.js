import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AboutUsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#374151" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>About</Text>

          <View style={{ width: 22 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          
          {/* App Info */}
          <Text style={styles.appName}>BuddyBudget</Text>

          <Text style={styles.version}>Version 1.0</Text>

          <Text style={styles.description}>
            BuddyBudget helps you track spending, manage monthly budgets,
            and understand your financial habits. Our goal is to make
            budgeting simple, friendly, and stress-free.
          </Text>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>

          <Text style={styles.listItem}>• Track income and expenses</Text>
          <Text style={styles.listItem}>• Monthly budget planning</Text>
          <Text style={styles.listItem}>• Spending insights</Text>
          <Text style={styles.listItem}>• Clean and simple interface</Text>

          {/* Creator Section */}
          <Text style={styles.sectionTitle}>Creator</Text>

          <Text style={styles.creatorName}>Alisha Humagain</Text>

          <Text style={styles.creatorRole}>Software Engineer</Text>

          <Text style={styles.creatorBio}>
            Background in hospitality with front-of-house experience.
            Passionate about building simple and user-friendly technology
            that helps people manage their finances more effectively.
          </Text>

          {/* Footer */}
          <Text style={styles.footer}>
            © 2026 BuddyBudget
          </Text>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },

  content: {
    padding: 24,
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#DB2777",
    marginBottom: 4,
  },

  version: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 20,
  },

  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
    color: "#374151",
  },

  listItem: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },

  creatorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginTop: 6,
  },

  creatorRole: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },

  creatorBio: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },

  footer: {
    marginTop: 30,
    fontSize: 13,
    color: "#9CA3AF",
  },
});