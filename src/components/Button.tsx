import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

import { COLORS } from "../constants/colors";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  outline?: boolean;
}

export default function Button({
  title,
  onPress,
  outline = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        outline && styles.outlineButton,
      ]}
    >
      <Text
        style={[
          styles.text,
          outline && styles.outlineText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 46,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },

  outlineButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  text: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  outlineText: {
    color: COLORS.primary,
  },
});