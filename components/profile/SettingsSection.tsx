import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

interface SettingsSectionProps {
  onBack: () => void;
}

export default function SettingsSection({ onBack }: SettingsSectionProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [gradeAlerts, setGradeAlerts] = useState(true);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backRow} onPress={onBack} activeOpacity={0.75}>
        <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        <Text style={styles.backText}>Профильге қайту</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Баптаулар</Text>

        <View style={styles.switchRow}>
          <View style={styles.textBox}>
            <Text style={styles.label}>Push-хабарламалар</Text>
            <Text style={styles.sub}>Сабақ және жаңалық ескертпелері</Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: "#D1D5DB", true: "#D8B4E2" }}
            thumbColor={pushNotifications ? "#8E24AA" : "#F9FAFB"}
          />
        </View>

        <View style={[styles.switchRow, styles.lastRow]}>
          <View style={styles.textBox}>
            <Text style={styles.label}>Баға туралы хабарлама</Text>
            <Text style={styles.sub}>Жаңа баға қойылғанда хабарлау</Text>
          </View>
          <Switch
            value={gradeAlerts}
            onValueChange={setGradeAlerts}
            trackColor={{ false: "#D1D5DB", true: "#D8B4E2" }}
            thumbColor={gradeAlerts ? "#8E24AA" : "#F9FAFB"}
          />
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
    marginBottom: 14,
  },
  switchRow: {
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
  textBox: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  sub: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
});