import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PieChart from "../../components/PieChart";
import SpendCard from "../../components/SpendCard";
import { COLORS, RADIUS, SHADOW, SPACING } from "../../constants/theme";

export default function DashboardScreen() {
  // Mock data for now (later you’ll connect to backend)
  const breakdown = useMemo(
    () => [
      { label: "Food", value: 320, color: "#FF4FA3" },
      { label: "Rent", value: 550, color: "#FF7BBE" },
      { label: "Transport", value: 95, color: "#FFA7D7" },
      { label: "Shopping", value: 140, color: "#FFD1EA" },
    ],
    []
  );

  const totalSpent = breakdown.reduce((s, x) => s + x.value, 0);
  const remaining = 1200 - totalSpent;

  return (
    <LinearGradient colors={[COLORS.bgTop, COLORS.bgBottom]} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.hello}>Hi Elaichi 💗</Text>
          <Text style={styles.subtitle}>Here’s your month at a glance</Text>
        </View>

        <SpendCard
          title="Monthly Spend"
          value={`$${totalSpent.toFixed(0)}`}
          subtitle={`Remaining budget: $${Math.max(0, remaining).toFixed(0)}`}
          rightPill="Feb 2026"
        />

        <View style={{ height: 16 }} />

        <View style={styles.rowCards}>
          <View style={[styles.smallCard, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.smallTitle}>Total Budget</Text>
            <Text style={styles.smallValue}>$1200</Text>
            <Text style={styles.smallHint}>Monthly</Text>
          </View>

          <View style={[styles.smallCard, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.smallTitle}>Transactions</Text>
            <Text style={styles.smallValue}>18</Text>
            <Text style={styles.smallHint}>This month</Text>
          </View>
        </View>

        <View style={{ height: 18 }} />

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spending Breakdown</Text>
            <Text style={styles.sectionTag}>Monthly</Text>
          </View>

          <View style={styles.breakdownRow}>
            <PieChart
              size={180}
              strokeWidth={24}
              data={breakdown}
              centerTitle="Spent"
              centerValue={`$${totalSpent.toFixed(0)}`}
              subtitle="This month"
            />

            <View style={styles.legend}>
              {breakdown.map((item) => (
                <View key={item.label} style={styles.legendRow}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.legendLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.legendValue}>${item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 18 }} />

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Cute Tip 💡</Text>
          <Text style={styles.tipText}>
            If you want to save faster, set a weekly mini-limit for “Food” and “Shopping”.
            BuddyBudget will keep you on track ✨
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: SPACING.l,
    paddingTop: 26,
  },
  header: { marginBottom: 16 },
  hello: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.muted,
  },

  rowCards: {
    flexDirection: "row",
  },
  smallCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.card,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: "#F6CDE2",
    ...SHADOW.card,
  },
  smallTitle: { fontSize: 12, color: COLORS.muted, fontWeight: "700" },
  smallValue: { marginTop: 6, fontSize: 20, fontWeight: "900", color: COLORS.text },
  smallHint: { marginTop: 2, fontSize: 12, color: COLORS.primaryDark, fontWeight: "700" },

  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.card,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: "#F6CDE2",
    ...SHADOW.card,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
  },
  sectionTag: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.primaryDark,
    backgroundColor: "#FFE0F0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F6CDE2",
  },

  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legend: {
    flex: 1,
    marginLeft: 14,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#F8E6F1",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
  legendValue: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.text,
  },

  tipText: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 18,
  },
});
