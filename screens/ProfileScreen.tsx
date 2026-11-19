import { useLanguage } from "../localization/LanguageContext";
import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import Button from "../components/Button";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";
import SettingsSection from "../components/profile/SettingsSection";
import HelpSupportSection from "../components/profile/HelpSupportSection";
import AboutAppSection from "../components/profile/AboutAppSection";

import { COLORS } from "../constants/colors";

type ProfileSubPage = "personal" | "settings" | "help" | "about" | null;

export default function ProfileScreen() {
  const { t, language, setLanguage } = useLanguage();
  const [activeSubPage, setActiveSubPage] = useState<ProfileSubPage>(null);

  const handleLogout = () => {
    Alert.alert(
      language === "kk" ? "Аккаунттан шығу" : "Выход из аккаунта",
      language === "kk"
        ? "Жүйеден шығуды растайсыз ба?"
        : "Вы действительно хотите выйти из системы?",
      [
        {
          text: language === "kk" ? "Болдырмау" : "Отмена",
          style: "cancel",
        },
        {
          text: language === "kk" ? "Шығу" : "Выйти",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              language === "kk" ? "Хабарлама" : "Уведомление",
              language === "kk"
                ? "Сіз аккаунттан шықтыңыз."
                : "Вы вышли из аккаунта."
            );
          },
        },
      ]
    );
  };

  if (activeSubPage) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {activeSubPage === "personal" && (
            <PersonalInfoSection onBack={() => setActiveSubPage(null)} />
          )}
          {activeSubPage === "settings" && (
            <SettingsSection onBack={() => setActiveSubPage(null)} />
          )}
          {activeSubPage === "help" && (
            <HelpSupportSection onBack={() => setActiveSubPage(null)} />
          )}
          {activeSubPage === "about" && (
            <AboutAppSection onBack={() => setActiveSubPage(null)} />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header title={t("Profile")} />

        {/* PROFILE */}

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AA</Text>
          </View>

          <Text style={styles.name}>Ammer Ali</Text>

          <Text style={styles.course}>
            {t("Computer Science \u2022 3rd Year")}
          </Text>
        </View>

        {/* STATS */}

        <View style={styles.stats}>
          <Stat value="3.72" label={t("GPA")} />

          <Stat value="84" label={t("Credits")} />

          <Stat value="A" label={t("Status")} />
        </View>

        {/* MENU */}

        <ProfileItem
          icon="person-outline"
          title={t("Personal Information")}
          onPress={() => setActiveSubPage("personal")}
        />

        <ProfileItem
          icon="settings-outline"
          title={t("Settings")}
          onPress={() => setActiveSubPage("settings")}
        />

        <View
          style={{
            marginHorizontal: 18,
            marginTop: 14,
            marginBottom: 8,
            backgroundColor: COLORS.white,
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              color: COLORS.text,
              marginBottom: 10,
            }}
          >
            {t("Language")}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setLanguage("kk")}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 9,
                backgroundColor: language === "kk" ? "#F3E3F1" : "#F5F5F5",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: COLORS.text,
                }}
              >
                🇰🇿 Қазақша
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguage("ru")}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 9,
                backgroundColor: language === "ru" ? "#F3E3F1" : "#F5F5F5",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: COLORS.text,
                }}
              >
                🇷🇺 Русский
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ProfileItem
          icon="help-circle-outline"
          title={t("Help & Support")}
          onPress={() => setActiveSubPage("help")}
        />

        <ProfileItem
          icon="school-outline"
          title={t("About University")}
          onPress={() => setActiveSubPage("about")}
        />

        <Button title={t("Log out")} outline onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <View>
      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

function ProfileItem({ icon, title, onPress }: ProfileItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>

      <Text style={styles.itemText}>{title}</Text>

      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
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

  profile: {
    alignItems: "center",
    paddingTop: 18,
  },

  avatar: {
    width: 76,
    height: 76,

    borderRadius: 38,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },

  name: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 9,
  },

  course: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
  },

  stats: {
    margin: 18,

    padding: 15,

    borderRadius: 13,

    backgroundColor: COLORS.white,

    flexDirection: "row",
    justifyContent: "space-around",
  },

  statValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },

  statLabel: {
    color: COLORS.textLight,
    fontSize: 8,
    marginTop: 3,
    textAlign: "center",
  },

  item: {
    marginHorizontal: 18,
    marginBottom: 8,

    padding: 14,

    borderRadius: 11,

    backgroundColor: COLORS.white,

    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,

    borderRadius: 10,

    backgroundColor: "#F7E7F3",

    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    flex: 1,

    marginLeft: 11,

    fontSize: 11,
    fontWeight: "700",
    color: COLORS.text,
  },
});                                                              