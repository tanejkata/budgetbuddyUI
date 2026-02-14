import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW, SPACING } from "../constants/theme";

export default function SpendCard({
  title = "Monthly Spend",
  value = "$0",
  subtitle = "Total spent this month",
  rightPill = "Feb 2026",
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{rightPill}</Text>
        </View>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.sub}>{subtitle}</Text>

      {/* cute mini progress */}
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.hintRow}>
        <Text style={styles.hintLeft}>Keep going 💗</Text>
        <Text style={styles.hintRight}>On track</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.card,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: "#F6CDE2",
    ...SHADOW.card,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFE0F0",
    borderWidth: 1,
    borderColor: "#F6CDE2",
  },
  pillText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  value: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.text,
  },
  sub: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
  progressTrack: {
    marginTop: 14,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#F7D6E8",
    overflow: "hidden",
  },
  progressFill: {
    width: "62%",
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
  hintRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hintLeft: { fontSize: 12, color: COLORS.muted },
  hintRight: { fontSize: 12, color: COLORS.primaryDark, fontWeight: "700" },
});
