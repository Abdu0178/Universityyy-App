import {useLanguage} from "../localization/LanguageContext";
import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import Logo from "../components/Logo";

import { COLORS } from "../constants/colors";

import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

export default function SplashScreen({
  navigation,
}: Props) {
  const {t} = useLanguage();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.center}>
        <Logo light />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.text}>
          {t("Copyright © 2025 Universityy")}
        </Text>

        <Text style={styles.text}>
          {t("Powered by Universityy")}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    alignItems: "center",
    paddingBottom: 15,
  },

  text: {
    color: COLORS.white,
    fontSize: 9,
    opacity: 0.8,
    marginBottom: 2,
  },
});