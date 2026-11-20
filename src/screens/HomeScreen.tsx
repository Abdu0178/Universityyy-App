
import { useLanguage } from "../localization/LanguageContext";
import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import QuickAccessSection from "../components/QuickAccessSection";
import type { QuickTarget } from "../components/QuickAccessSection";
import NewsSection from "../components/NewsSection";

import { COLORS } from "../constants/colors";

import CoursesScreen from "./CoursesScreen";
import ScheduleScreen from "./ScheduleScreen";
import GradesScreen from "./GradesScreen";
import ProfileScreen from "./ProfileScreen";

interface HomeScreenProps {
  onNavigate?: (target: QuickTarget) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { t } = useLanguage();
  const [activeSubScreen, setActiveSubScreen] = useState<QuickTarget | null>(null);

  const handleQuickSelect = (target: QuickTarget) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      setActiveSubScreen(target);
    }
  };

  if (!onNavigate && activeSubScreen) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveSubScreen(null)}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          <Text style={styles.backText}>{t("Home")}</Text>
        </TouchableOpacity>

        <View style={styles.subScreenContainer}>
          {activeSubScreen === "Courses" && <CoursesScreen />}
          {activeSubScreen === "Schedule" && <ScheduleScreen />}
          {activeSubScreen === "Grades" && <GradesScreen />}
          {activeSubScreen === "Profile" && <ProfileScreen />}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header title={t("Home")} />

        {/* PROFILE CARD */}

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>
              {t("Good morning \ud83d\udc4b")}
            </Text>

            <Text style={styles.name}>Ammer Ali</Text>

            <Text style={styles.course}>
              {t("Computer Science \u2022 3rd Year")}
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AA</Text>
          </View>
        </View>

        {/* TODAY */}

        <Text style={styles.sectionTitle}>{t("Today's Classes")}</Text>

        <View style={styles.classCard}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>09:00</Text>
            <Text style={styles.endTime}>10:30</Text>
          </View>

          <View style={styles.classInfo}>
            <Text style={styles.classTitle}>
              {t("Digital Thinking")}
            </Text>

            <Text style={styles.classSubtitle}>
              {t("Room 204 \u2022 Dr. Ahmed")}
            </Text>
          </View>

          <View style={styles.nowBadge}>
            <Text style={styles.nowText}>{t("Now")}</Text>
          </View>
        </View>

        {/* NEWS */}

        <NewsSection />

        {/* QUICK ACCESS */}

        <QuickAccessSection onSelect={handleQuickSelect} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingBottom: 90,
  },

  profileCard: {
    marginHorizontal: 18,
    padding: 18,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
  },

  profileInfo: {
    flex: 1,
  },

  greeting: {
    color: "#E9CFE5",
    fontSize: 11,
  },

  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 3,
  },

  course: {
    color: "#F7EAF5",
    fontSize: 10,
    marginTop: 5,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontWeight: "900",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },

  classCard: {
    marginHorizontal: 18,
    backgroundColor: COLORS.white,
    borderRadius: 13,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  timeContainer: {
    width: 55,
  },

  time: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  endTime: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 3,
  },

  classInfo: {
    flex: 1,
  },

  classTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },

  classSubtitle: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 4,
  },

  nowBadge: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
  },

  nowText: {
    fontSize: 8,
    color: COLORS.success,
    fontWeight: "800",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  subScreenContainer: {
    flex: 1,
  },
});
