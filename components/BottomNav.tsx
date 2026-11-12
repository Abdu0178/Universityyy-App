import {useLanguage} from "../localization/LanguageContext";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

export type TabName =
  | "home"
  | "courses"
  | "schedule"
  | "grades"
  | "profile";

interface BottomNavProps {
  active: TabName;
  onChange: (screen: TabName) => void;
}

const items: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  screen: TabName;
}[] = [
  {
    icon: "home",
    label: "Home",
    screen: "home",
  },
  {
    icon: "book-outline",
    label: "Courses",
    screen: "courses",
  },
  {
    icon: "calendar-outline",
    label: "Schedule",
    screen: "schedule",
  },
  {
    icon: "stats-chart-outline",
    label: "Grades",
    screen: "grades",
  },
  {
    icon: "person-outline",
    label: "Profile",
    screen: "profile",
  },
];

export default function BottomNav({
  active,
  onChange,
}: BottomNavProps) {
  const {t} = useLanguage();
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive =
          active === item.screen;

        return (
          <TouchableOpacity
            key={item.screen}
            style={styles.item}
            onPress={() =>
              onChange(item.screen)
            }
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={
                isActive
                  ? COLORS.primary
                  : "#777"
              }
            />

            <Text
              style={[
                styles.label,
                isActive &&
                  styles.activeLabel,
              ]}
            >
              {t(item.label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: 67,

    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  item: {
    width: 65,
    alignItems: "center",
  },

  label: {
    fontSize: 8,
    color: "#777",
    marginTop: 3,
  },

  activeLabel: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});