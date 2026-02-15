import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useTransactions } from "../../context/TransactionContext";

const CATEGORY_PRESETS = [
  { key: "Food", icon: "restaurant-outline", accent: "#FFD36A" },
  { key: "Shopping", icon: "bag-handle-outline", accent: "#CDB7FF" },
  { key: "Transport", icon: "car-outline", accent: "#B6F2D1" },
  { key: "Housing", icon: "home-outline", accent: "#FFB7C9" },
];

const MORE_CATEGORIES = [
  "Bills",
  "Health",
  "Entertainment",
  "Education",
  "Subscriptions",
  "Travel",
  "Gifts",
  "Other",
];

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useTransactions();

  const [amount, setAmount] = useState(""); // string input
  const [type, setType] = useState("Expense"); // "Income" | "Expense"
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [notes, setNotes] = useState("");
  const [showMore, setShowMore] = useState(false);

  const formattedAmount = useMemo(() => {
    const n = Number(amount);
    if (!amount || Number.isNaN(n)) return "$0.00";
    return `$${n.toFixed(2)}`;
  }, [amount]);

  const onSave = () => {
    addTransaction({
      type,
      category: selectedCategory,
      amount: Number(amount) || 0,
      note: notes,
      date: null, // leave it null for now (auto = today)
    });

    navigation?.goBack?.();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Top header */}
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()}>
            <Ionicons name="chevron-back" size={18} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Add Transaction</Text>

          <View style={{ width: 36 }} />
        </View>

        {/* Amount card */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount</Text>

          <Text style={styles.amountBig}>{formattedAmount}</Text>

          <View style={styles.amountInputRow}>
            <Text style={styles.dollar}>$</Text>
            <TextInput
              value={amount}
              onChangeText={(t) => {
                // allow only digits and one dot
                const cleaned = t.replace(/[^0-9.]/g, "");
                const parts = cleaned.split(".");
                const safe =
                  parts.length <= 2 ? cleaned : `${parts[0]}.${parts.slice(1).join("")}`;
                setAmount(safe);
              }}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor={"rgba(0,0,0,0.25)"}
              style={styles.amountInput}
            />
          </View>
        </View>

        {/* Income/Expense toggle */}
        <View style={styles.toggleWrap}>
          <TouchableOpacity
            style={[styles.toggleBtn, type === "Income" && styles.toggleActiveLeft]}
            onPress={() => setType("Income")}
            activeOpacity={0.9}
          >
            <Text style={[styles.toggleText, type === "Income" && styles.toggleTextActive]}>
              Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, type === "Expense" && styles.toggleActiveRight]}
            onPress={() => setType("Expense")}
            activeOpacity={0.9}
          >
            <Text style={[styles.toggleText, type === "Expense" && styles.toggleTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category */}
        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.chipsRow}>
          {CATEGORY_PRESETS.map((c) => {
            const isActive = selectedCategory === c.key;
            return (
              <TouchableOpacity
                key={c.key}
                activeOpacity={0.9}
                onPress={() => {
                  setSelectedCategory(c.key);
                  setShowMore(false);
                }}
                style={[
                  styles.chip,
                  { backgroundColor: "rgba(255,255,255,0.75)" },
                  isActive && { borderColor: COLORS.primary, borderWidth: 2 },
                ]}
              >
                <View style={[styles.chipIcon, { backgroundColor: c.accent }]}>
                  <Ionicons name={c.icon} size={16} color={"#222"} />
                </View>
                <Text style={styles.chipText}>{c.key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category dropdown look */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowMore((p) => !p)}
          style={styles.dropdown}
        >
          <View style={styles.dropdownLeft}>
            <Ionicons name="pricetag-outline" size={16} color={COLORS.primaryDark} />
            <Text style={styles.dropdownText}>{selectedCategory}</Text>
          </View>

          <Ionicons
            name={showMore ? "chevron-up" : "chevron-down"}
            size={18}
            color={COLORS.muted}
          />
        </TouchableOpacity>

        {/* More categories list */}
        {showMore && (
          <View style={styles.moreWrap}>
            {MORE_CATEGORIES.map((name) => {
              const isActive = selectedCategory === name;
              return (
                <TouchableOpacity
                  key={name}
                  style={[styles.moreItem, isActive && styles.moreItemActive]}
                  onPress={() => {
                    setSelectedCategory(name);
                    setShowMore(false);
                  }}
                >
                  <Text style={[styles.moreText, isActive && styles.moreTextActive]}>{name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Date placeholder (no hardcode) */}
        <Text style={styles.sectionTitle}>Date</Text>
        <View style={styles.fakeInput}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.primaryDark} />
          <Text style={styles.fakeInputText}>Select date (later)</Text>
        </View>

        {/* Notes */}
        <Text style={styles.sectionTitle}>Notes (optional)</Text>
        <View style={styles.notesBox}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note..."
            placeholderTextColor={"rgba(0,0,0,0.25)"}
            style={styles.notesInput}
            multiline
          />
        </View>

        {/* Save button */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveBtn}
          onPress={onSave}
        >
          <Text style={styles.saveText}>Save Transaction</Text>
        </TouchableOpacity>

        <View style={{ height: 26 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bgTop },
  container: { padding: 18, paddingTop: 16 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  headerTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text },

  amountCard: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    marginBottom: 14,
  },
  amountLabel: { color: COLORS.primaryDark, fontWeight: "900", fontSize: 12 },
  amountBig: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  amountInputRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dollar: { fontSize: 16, fontWeight: "900", color: COLORS.muted },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.65)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },

  toggleWrap: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.65)",
    borderRadius: 18,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    marginBottom: 14,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  toggleText: { fontWeight: "900", color: COLORS.muted },
  toggleTextActive: { color: "#fff" },
  toggleActiveLeft: { backgroundColor: COLORS.primary },
  toggleActiveRight: { backgroundColor: COLORS.primary },

  sectionTitle: {
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 6,
    marginBottom: 10,
  },

  chipsRow: { flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 10 },
  chip: {
    width: "47%",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  chipIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: { fontWeight: "900", color: COLORS.text },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    marginBottom: 10,
  },
  dropdownLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  dropdownText: { fontWeight: "900", color: COLORS.text },

  moreWrap: {
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    padding: 10,
    marginBottom: 10,
  },
  moreItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.65)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  moreItemActive: { backgroundColor: COLORS.primary },
  moreText: { fontWeight: "900", color: COLORS.text },
  moreTextActive: { color: "#fff" },

  fakeInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    marginBottom: 10,
  },
  fakeInputText: { fontWeight: "800", color: COLORS.muted },

  notesBox: {
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    padding: 12,
    minHeight: 110,
    marginBottom: 14,
  },
  notesInput: { fontWeight: "700", color: COLORS.text, minHeight: 90 },

  saveBtn: {
    paddingVertical: 14,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#fff", fontWeight: "900" },
});
