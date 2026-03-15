import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function DonutChart({ data, total }) {

  const pieData = data.map(item => ({
    value: item.value,
    color: item.color,
  }));

  return (
    <View style={styles.wrapper}>
      <PieChart
        donut
        radius={100}
        innerRadius={70}
        data={pieData}
        centerLabelComponent={() => {
          return (
            <View style={styles.centerLabel}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  centerLabel: {
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 16,
    color: "#6B7280",
  },

  totalValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
  },
});