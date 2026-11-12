import {useLanguage} from "../localization/LanguageContext";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface LogoProps {
  light?: boolean;
  small?: boolean;
}

export default function Logo({
  light = false,
  small = false,
}: LogoProps) {
  const {t} = useLanguage();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          small && styles.smallCircle,
          light && styles.lightCircle,
        ]}
      >
        <Text
          style={[
            styles.star,
            small && styles.smallStar,
            light && styles.lightStar,
          ]}
        >
          ✺
        </Text>
      </View>

      <Text
        style={[
          styles.title,
          light && styles.lightText,
          small && styles.smallTitle,
        ]}
      >
        Universityy
      </Text>

      {!small && (
        <Text
          style={[
            styles.subtitle,
            light && styles.lightText,
          ]}
        >
          {t("a learning for future")}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  lightCircle: {
    borderColor: COLORS.white,
  },

  smallCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  star: {
    fontSize: 26,
    color: COLORS.primary,
  },

  lightStar: {
    color: COLORS.white,
  },

  smallStar: {
    fontSize: 16,
  },

  title: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  smallTitle: {
    fontSize: 9,
  },

  subtitle: {
    fontSize: 7,
    color: COLORS.textLight,
    marginTop: 1,
  },

  lightText: {
    color: COLORS.white,
  },
});