import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { updateUserProfile } from "../../services/userService";

const EditProfileScreen = ({ navigation }) => {
  const { user, login } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
        setImageError(false);
      }
    } catch (error) {
    }
  };

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      Alert.alert("Missing Fields", "Name and email are required.");
      return;
    }

    try {
      setLoading(true);

      const updatedUser = await updateUserProfile(user._id, {
        name,
        email,
        profilePicture,
      });

      login(updatedUser);

      setLoading(false);

      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

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

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <View style={{ width: 34 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            {/* Avatar */}

            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={pickImage}
            >
              {profilePicture && !imageError ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.avatar}
                  onError={() => setImageError(true)}
                />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarFace}>◕‿◕</Text>
                </View>
              )}

              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </TouchableOpacity>

            <Text style={styles.subtitle}>
              Tap the image to change your profile picture
            </Text>

            {/* Name */}

            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Name</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                />
              </View>
            </View>

            {/* Email */}

            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Email</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Save Button */}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#253046" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>

            {/* Cancel */}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDEFF5",
  },

  container: {
    flex: 1,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3F2F39",
  },

  content: {
    padding: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#E8B7CA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },

  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F9C8DA",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarFace: {
    fontSize: 26,
    color: "#FFFFFF",
  },

  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#DB2777",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#9D8C95",
    marginBottom: 20,
  },

  inputBlock: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5E4D57",
    marginBottom: 6,
  },

  inputWrapper: {
    backgroundColor: "#FFF7FA",
    borderWidth: 1,
    borderColor: "#F4D5E2",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: "center",
  },

  input: {
    fontSize: 14,
    color: "#3F2F39",
  },

  saveButton: {
    backgroundColor: "#F8C9DA",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    fontWeight: "700",
    color: "#253046",
    fontSize: 15,
  },

  cancelButton: {
    backgroundColor: "#FCECF3",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5C8D8",
    marginTop: 10,
  },

  cancelButtonText: {
    fontWeight: "700",
    color: "#D94C8A",
    fontSize: 15,
  },
});