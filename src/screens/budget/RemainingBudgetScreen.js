import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

const RemainingBudgetScreen = ({ navigation }) => {
  const months = [
    "January 2026",
    "February 2026",
    "March 2026",
    "April 2026",
    "May 2026",
    "June 2026",
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const totalBudget = 5000;
  const spentAmount = 3457;
  const remainingAmount = 1543;
  const remainingPercent = 31;

  const breakdownData = useMemo(
    () => [
      {
        id: 1,
        title: "Food & Dining",
        transactions: 24,
        amount: 856.42,
        percentage: 24.8,
        iconBg: "#FFE9BF",
        icon: (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={18}
            color="#D89B0C"
          />
        ),
      },
      {
        id: 2,
        title: "Shopping",
        transactions: 18,
        amount: 652.9,
        percentage: 18.9,
        iconBg: "#F3DFFF",
        icon: <Ionicons name="bag-handle-outline" size={18} color="#B456F3" />,
      },
      {
        id: 3,
        title: "Transport",
        transactions: 31,
        amount: 487.35,
        percentage: 14.1,
        iconBg: "#DDF7E8",
        icon: <Ionicons name="car-sport-outline" size={18} color="#20B15A" />,
      },
      {
        id: 4,
        title: "Housing / Rent",
        transactions: 1,
        amount: 950.0,
        percentage: 27.5,
        iconBg: "#FFE1EA",
        icon: <Feather name="home" size={18} color="#FF5C8A" />,
      },
      {
        id: 5,
        title: "Entertainment",
        transactions: 12,
        amount: 234.6,
        percentage: 6.8,
        iconBg: "#FFDCEC",
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
        iconBg: "#FFE7E7",
        icon: <AntDesign name="hearto" size={17} color="#FF5B5B" />,
      },
      {
        id: 7,
        title: "Subscriptions",
        transactions: 7,
        amount: 89.99,
        percentage: 2.6,
        iconBg: "#DCEAFF",
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
        iconBg: "#E8E0FF",
        icon: <Ionicons name="school-outline" size={18} color="#7A5AF8" />,
      },
    ],
    []
  );

  const currentMonth = months[currentMonthIndex];

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const radius = 58;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const spentProgress = spentAmount / totalBudget;
  const spentStroke = circumference * spentProgress;
  const remainingStroke = circumference - spentStroke;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color="#68707D" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Remaining Budget</Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Month Selector */}
          <View style={styles.monthCard}>
            <TouchableOpacity
              style={styles.monthArrow}
              onPress={handlePrevMonth}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={15} color="#EC4899" />
            </TouchableOpacity>

            <Text style={styles.monthText}>{currentMonth}</Text>

            <TouchableOpacity
              style={styles.monthArrow}
              onPress={handleNextMonth}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-forward" size={15} color="#EC4899" />
            </TouchableOpacity>
          </View>

          {/* Remaining Card */}
          <View style={styles.remainingCard}>
            <Text style={styles.remainingLabel}>Remaining This Month</Text>
            <Text style={styles.remainingAmount}>${remainingAmount}</Text>
            <Text style={styles.remainingSubtext}>
              Based on your current spending
            </Text>

            <View style={styles.divider} />

            <Text style={styles.remainingPercentText}>
              {remainingPercent}% of your budget left
            </Text>
          </View>

          {/* Budget Overview */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Budget Overview</Text>

            <View style={styles.chartWrap}>
              <View style={styles.chartContainer}>
                <Svg width={160} height={160} viewBox="0 0 160 160">
                  <Circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#E8F6EE"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  <Circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#9BE5C2"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${remainingStroke} ${circumference}`}
                    strokeLinecap="butt"
                    rotation="-90"
                    origin="80, 80"
                  />
                  <Circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#F7A3B7"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${spentStroke} ${circumference}`}
                    strokeDashoffset={-remainingStroke}
                    strokeLinecap="butt"
                    rotation="-90"
                    origin="80, 80"
                  />
                </Svg>

                <View style={styles.chartCenterText}>
                  <Text style={styles.chartCenterLabel}>Budget</Text>
                  <Text style={styles.chartCenterAmount}>${totalBudget}</Text>
                </View>
              </View>
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#F7A3B7" }]} />
                <View>
                  <Text style={styles.legendLabel}>Spent</Text>
                  <Text style={styles.legendValue}>${spentAmount}</Text>
                </View>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#9BE5C2" }]} />
                <View>
                  <Text style={styles.legendLabel}>Left</Text>
                  <Text style={styles.legendValue}>${remainingAmount}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Monthly Breakdown Section */}
          <View style={styles.breakdownSection}>
            <Text style={styles.breakdownHeading}>Monthly Breakdown</Text>

            {breakdownData.map((item) => (
              <View key={item.id} style={styles.breakdownCard}>
                <View style={styles.breakdownTopRow}>
                  <View style={styles.breakdownLeft}>
                    <View
                      style={[
                        styles.breakdownIconCircle,
                        { backgroundColor: item.iconBg },
                      ]}
                    >
                      {item.icon}
                    </View>

                    <View style={styles.breakdownTextWrap}>
                      <Text style={styles.breakdownTitle}>{item.title}</Text>
                      <Text style={styles.breakdownTransactions}>
                        {item.transactions}{" "}
                        {item.transactions === 1 ? "transaction" : "transactions"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.breakdownRight}>
                    <Text style={styles.breakdownAmount}>
                      ${item.amount.toFixed(2)}
                    </Text>
                    <Text style={styles.breakdownPercent}>{item.percentage}%</Text>
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
          </View>

          {/* Bottom Info */}
          <View style={styles.tipCard}>
            <View style={styles.tipIconWrap}>
              <Ionicons name="sparkles-outline" size={16} color="#1FA855" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>You're doing great!</Text>
              <Text style={styles.tipText}>
                You're still under your budget this month.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RemainingBudgetScreen;

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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9F7F8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEE2E8",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1F2C3B",
  },
  headerSpacer: {
    width: 36,
    height: 36,
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 24,
  },

  monthCard: {
    backgroundColor: "#FFF7FA",
    borderRadius: 18,
    minHeight: 50,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3DEE7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FCE7F3",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E3440",
  },

  remainingCard: {
    backgroundColor: "#F9F8F9",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1E4EA",
  },
  remainingLabel: {
    fontSize: 14,
    color: "#8E95A3",
    fontWeight: "500",
    marginBottom: 4,
  },
  remainingAmount: {
    fontSize: 40,
    fontWeight: "800",
    color: "#17A34A",
    marginBottom: 4,
  },
  remainingSubtext: {
    fontSize: 12,
    color: "#8D95A2",
    marginBottom: 14,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#EFE3E8",
    marginBottom: 12,
  },
  remainingPercentText: {
    fontSize: 15,
    color: "#4B5563",
    fontWeight: "600",
  },

  chartCard: {
    backgroundColor: "#F9F8F9",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1E4EA",
  },
  chartTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },
  chartWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  chartCenterText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  chartCenterLabel: {
    fontSize: 12,
    color: "#8B95A7",
    marginBottom: 2,
  },
  chartCenterAmount: {
    fontSize: 24,
    fontWeight: "800",
    color: "#273142",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 2,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: "#7B8494",
    fontWeight: "600",
  },
  legendValue: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "700",
  },

  breakdownSection: {
    marginTop: 4,
  },
  breakdownHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#344054",
    marginBottom: 10,
    marginLeft: 2,
  },
  breakdownCard: {
    backgroundColor: "#FFF7FA",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F3DEE7",
  },
  breakdownTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  breakdownIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  breakdownTextWrap: {
    flex: 1,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#344054",
    marginBottom: 2,
  },
  breakdownTransactions: {
    fontSize: 11,
    color: "#98A2B3",
    fontWeight: "500",
  },
  breakdownRight: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF4F87",
    marginBottom: 2,
  },
  breakdownPercent: {
    fontSize: 11,
    fontWeight: "700",
    color: "#98A2B3",
  },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#F9D9E6",
    borderRadius: 999,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6B9A",
    borderRadius: 999,
  },

  tipCard: {
    backgroundColor: "#DFF7E9",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CBEFD9",
  },
  tipIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F2FFF7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#188A46",
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12,
    color: "#4F6B5B",
    lineHeight: 16,
  },
});
