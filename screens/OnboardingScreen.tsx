import {useLanguage} from "../localization/LanguageContext";

import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../components/Button";
import { COLORS } from "../constants/colors";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

interface Page {
  title: string;
  subtitle: string;
  icon: string;
}

const pages: Page[] = [
  {
    title: ("Better way to learning is calling you!"),
    subtitle: "Unlock your future with Universityy education.",
    icon: "📚",
  },
  {
    title: ("Find yourself by doing whatever you do!"),
    subtitle: ("Education that gives you real-world skills."),
    icon: "🎓",
  },
  {
    title: ("It's not just learning, it's a promise!"),
    subtitle: ("Learn today. Lead tomorrow."),
    icon: "🚀",
  },
];

export default function OnboardingScreen({
  navigation,
}: Props) {
  const {t, language, setLanguage} = useLanguage();
  const [page, setPage] = useState<number>(0);
  const currentPage = pages[page];

  const nextPage = () => {
    if (page === pages.length - 1) {
      navigation.replace("Login");
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const skip = () => {
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={{flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14}}>
          <TouchableOpacity onPress={() => setLanguage("kk")} style={{padding: 9, borderRadius: 8, backgroundColor: language === "kk" ? "#F3E3F1" : "#F5F5F5"}}>
            <Text style={{color: COLORS.text, fontWeight: "700"}}>🇰🇿 Қазақша</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage("ru")} style={{padding: 9, borderRadius: 8, backgroundColor: language === "ru" ? "#F3E3F1" : "#F5F5F5"}}>
            <Text style={{color: COLORS.text, fontWeight: "700"}}>🇷🇺 Русский</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>
              {currentPage.icon}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>
          {t(currentPage.title)}
        </Text>

        <Text style={styles.subtitle}>
          {t(currentPage.subtitle)}
        </Text>

        <View style={styles.dots}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === page && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Button
          title={t("Next")}
          onPress={nextPage}
        />

        <TouchableOpacity onPress={skip}>
          <Text style={styles.skip}>
            {t("Skip")}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: "100%",
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },

  iconCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 85,
    textAlign: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 22,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#D7D7D7",
  },

  activeDot: {
    width: 22,
    backgroundColor: COLORS.primary,
  },

  skip: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
    marginTop: 14,
  },
});
