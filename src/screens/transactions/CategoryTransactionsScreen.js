import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { useAuth } from "../../hooks/useAuth";
import { getTransactions } from "../../services/transactionService";

export default function CategoryTransactionsScreen({ route }) {
  const { category } = route.params;
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions({
        userId: user._id,
        category,
      });

      setTransactions(data.transactions || []);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.note}>{item.note || "Transaction"}</Text>

        <Text style={styles.date}>
          {new Date(item.transactionDate).toDateString()}
        </Text>
      </View>

      <Text style={styles.amount}>${item.amount}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF4FA3" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER CARD */}

        <View style={styles.headerCard}>
          <Text style={styles.title}>{category}</Text>

          <Text style={styles.subtitle}>
            {transactions.length} transactions
          </Text>
        </View>

        {/* LIST */}

        {transactions.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No transactions in this category
            </Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item._id}
            renderItem={renderTransaction}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
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
    padding: 16,
  },

  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F6CDE2",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 4,
    color: "#9CA3AF",
  },

  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F6CDE2",
  },

  note: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  date: {
    fontSize: 11,
    marginTop: 2,
    color: "#9CA3AF",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF4F87",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#6B7280",
  },
});