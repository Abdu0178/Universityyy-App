import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({
  title,
  subtitle,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.notification}>
        <Ionicons
          name="notifications-outline"
          size={21}
          color={COLORS.text}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 78,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 3,
  },

  notification: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});