import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsData = [
    {
      id: 1,
      title: "Currency",
      subtitle: "USD ($)",
      icon: (
        <View style={[styles.iconCircle, { backgroundColor: "#DDF5E5" }]}>
          <Text style={[styles.iconText, { color: "#22A45D" }]}>$</Text>
        </View>
      ),
      right: <Feather name="chevron-right" size={20} color="#A6A6A6" />,
    },
    {
      id: 2,
      title: "Notifications",
      subtitle: "Get spending alerts",
      icon: (
        <View style={[styles.iconCircle, { backgroundColor: "#F2E8FF" }]}>
          <Ionicons name="notifications-outline" size={20} color="#A855F7" />
        </View>
      ),
      right: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#E5E5E5", true: "#F49AC2" }}
          thumbColor={notificationsEnabled ? "#FFFFFF" : "#FFFFFF"}
          ios_backgroundColor="#E5E5E5"
          style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
        />
      ),
    },
    {
      id: 3,
      title: "Theme",
      subtitle: "Soft Pink",
      icon: (
        <View style={[styles.iconCircle, { backgroundColor: "#FFE3F0" }]}>
          <MaterialCommunityIcons
            name="palette-outline"
            size={20}
            color="#EC4899"
          />
        </View>
      ),
      right: <Feather name="chevron-right" size={20} color="#A6A6A6" />,
    },
    {
      id: 4,
      title: "Help & Support",
      subtitle: "Get help with your account",
      icon: (
        <View style={[styles.iconCircle, { backgroundColor: "#E5F0FF" }]}>
          <AntDesign name="questioncircleo" size={18} color="#3B82F6" />
        </View>
      ),
      right: <Feather name="chevron-right" size={20} color="#A6A6A6" />,
    },
    {
      id: 5,
      title: "About",
      subtitle: "Buddy Budget v1.0",
      icon: (
        <View style={[styles.iconCircle, { backgroundColor: "#FFF6CC" }]}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#D4A017"
          />
        </View>
      ),
      right: <Feather name="chevron-right" size={20} color="#A6A6A6" />,
    },
  ];

  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingCard}
        activeOpacity={0.8}
      >
        <View style={styles.settingLeft}>
          {item.icon}
          <View>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <View>{item.right}</View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ width: 28 }} />
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsHeaderBtn}>
            <Ionicons name="settings-outline" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarFace}>◕‿◕</Text>
              </View>
              <View style={styles.onlineDot} />
            </View>

            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userEmail}>sarah.j@email.com</Text>

            <TouchableOpacity style={styles.editButton} activeOpacity={0.85}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.changePasswordButton}
              activeOpacity={0.85}
            >
              <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
          </View>

          {/* Settings */}
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsData.map(renderSettingItem)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  settingsHeaderBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
    shadowColor: "#E5B7C9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#F9C8DA",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E9AFC5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarFace: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  onlineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    position: "absolute",
    right: 1,
    bottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: "#8B95A7",
    marginBottom: 16,
  },
  editButton: {
    width: "100%",
    backgroundColor: "#F8C9DA",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#253046",
  },
  changePasswordButton: {
    width: "100%",
    backgroundColor: "#FCE7F3",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5BDD2",
  },
  changePasswordText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DB2777",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4B5563",
    marginBottom: 10,
    marginLeft: 4,
  },
  settingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#E5B7C9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "700",
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
