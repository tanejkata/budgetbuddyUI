import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
  Feather,
} from "@expo/vector-icons";

const MonthlyBreakdownScreen = ({ navigation }) => {
  const months = [
    "January 2026",
    "February 2026",
    "March 2026",
    "April 2026",
    "May 2026",
    "June 2026",
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const breakdownData = useMemo(
    () => [
      {
        id: 1,
        title: "Food & Dining",
        transactions: 24,
        amount: 856.42,
        percentage: 24.8,
        iconBg: "#FFE9BF",
        iconColor: "#D99A00",
        icon: (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={18}
            color="#D99A00"
          />
        ),
      },
      {
        id: 2,
        title: "Shopping",
        transactions: 18,
        amount: 652.9,
        percentage: 18.9,
        iconBg: "#F6DDFF",
        iconColor: "#C14BFF",
        icon: <Ionicons name="bag-handle-outline" size={18} color="#C14BFF" />,
      },
      {
        id: 3,
        title: "Transport",
        transactions: 31,
        amount: 487.35,
        percentage: 14.1,
        iconBg: "#DBF6E4",
        iconColor: "#22A45D",
        icon: <Ionicons name="car-sport-outline" size={18} color="#22A45D" />,
      },
      {
        id: 4,
        title: "Housing / Rent",
        transactions: 1,
        amount: 950.0,
        percentage: 27.5,
        iconBg: "#FFE0E7",
        iconColor: "#FF5C8A",
        icon: <Feather name="home" size={18} color="#FF5C8A" />,
      },
      {
        id: 5,
        title: "Entertainment",
        transactions: 12,
        amount: 234.6,
        percentage: 6.8,
        iconBg: "#FFDCEC",
        iconColor: "#F03E93",
        icon: (
          <MaterialCommunityIcons
            name="movie-open-outline"
            size={18}
            color="#F03E93"
          />
        ),
      },
      {
        id: 6,
        title: "Health",
        transactions: 5,
        amount: 125.8,
        percentage: 3.6,
        iconBg: "#FFE5E5",
        iconColor: "#FF5B5B",
        icon: <AntDesign name="hearto" size={17} color="#FF5B5B" />,
      },
      {
        id: 7,
        title: "Subscriptions",
        transactions: 7,
        amount: 89.99,
        percentage: 2.6,
        iconBg: "#DDEBFF",
        iconColor: "#377DFF",
        icon: (
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={18}
            color="#377DFF"
          />
        ),
      },
      {
        id: 8,
        title: "Education",
        transactions: 3,
        amount: 59.72,
        percentage: 1.7,
        iconBg: "#E9E3FF",
        iconColor: "#7A5AF8",
        icon: (
          <Ionicons name="school-outline" size={18} color="#7A5AF8" />
        ),
      },
    ],
    []
  );

  const goPrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const currentMonth = months[currentMonthIndex];
  const totalAmount = breakdownData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={20} color="#6B7280" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Monthly Breakdown</Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Month Selector */}
          <View style={styles.monthCard}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={goPrevMonth}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={16} color="#EC4899" />
            </TouchableOpacity>

            <View style={styles.monthTextWrap}>
              <Text style={styles.monthText}>{currentMonth}</Text>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>
                ${totalAmount.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={goNextMonth}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-forward" size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>

          {/* Breakdown Items */}
          {breakdownData.map((item) => (
            <View key={item.id} style={styles.breakdownCard}>
              <View style={styles.rowTop}>
                <View style={styles.leftSection}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: item.iconBg },
                    ]}
                  >
                    {item.icon}
                  </View>

                  <View style={styles.textWrap}>
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                    <Text style={styles.transactionText}>
                      {item.transactions}{" "}
                      {item.transactions === 1 ? "transaction" : "transactions"}
                    </Text>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  <Text style={styles.amountText}>
                    ${item.amount.toFixed(2)}
                  </Text>
                  <Text style={styles.percentText}>{item.percentage}%</Text>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${item.percentage}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MonthlyBreakdownScreen;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF8FB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3DCE7",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#28313D",
  },
  headerSpacer: {
    width: 30,
    height: 30,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 28,
  },
  monthCard: {
    backgroundColor: "#FFF8FB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F4DFE8",
  },
  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FCE7F3",
    justifyContent: "center",
    alignItems: "center",
  },
  monthTextWrap: {
    flex: 1,
    alignItems: "center",
  },
  monthText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  totalLabel: {
    fontSize: 10,
    color: "#B3A1AA",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 11,
    color: "#EC4899",
    fontWeight: "700",
    marginTop: 1,
  },
  breakdownCard: {
    backgroundColor: "#FFF8FB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F4DFE8",
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textWrap: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  transactionText: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  amountText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF4F87",
    marginBottom: 3,
  },
  percentText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A1A1AA",
  },
  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#F8D9E7",
    borderRadius: 999,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6B9A",
    borderRadius: 999,
  },
});
