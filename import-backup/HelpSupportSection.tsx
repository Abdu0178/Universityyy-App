import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface HelpSupportSectionProps {
  onBack: () => void;
}

export default function HelpSupportSection({ onBack }: HelpSupportSectionProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backRow} onPress={onBack} activeOpacity={0.75}>
        <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        <Text style={styles.backText}>Профильге қайту</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Көмек және қолдау</Text>
        <Text style={styles.body}>
          Сабақ кестесі, курстар немесе бағалар бойынша сұрақтарыңыз туындаса,
          деканатқа немесе техникалық қолдау қызметіне хабарласыңыз.
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Қолдау поштасы</Text>
          <Text style={styles.value}>support@universityy.edu</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Жұмыс уақыты</Text>
          <Text style={styles.value}>Дс–Жм, 09:00–18:00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 18,
    marginBottom: 14,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  card: {
    marginHorizontal: 18,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.text,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  value: {
    fontSize: 13,
    color: COLORS.textLight,
  },
});