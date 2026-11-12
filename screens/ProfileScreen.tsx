import {useLanguage} from "../localization/LanguageContext";
import React from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import Header from "../components/Header";
import Button from "../components/Button";

import { COLORS } from "../constants/colors";

export default function ProfileScreen() {
  const {t, language, setLanguage} = useLanguage();
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
            <Text style={styles.avatarText}>
              AA
            </Text>
          </View>

          <Text style={styles.name}>
            Ammer Ali
          </Text>

          <Text style={styles.course}>
            {t("Computer Science \u2022 3rd Year")}
          </Text>

        </View>

        {/* STATS */}

        <View style={styles.stats}>

          <Stat
            value="3.72"
            label={t("GPA")}
          />

          <Stat
            value="84"
            label={t("Credits")}
          />

          <Stat
            value="A"
            label={t("Status")}
          />

        </View>

        {/* MENU */}

        <ProfileItem
          icon="person-outline"
          title={t("Personal Information")}
        />

        <ProfileItem
          icon="settings-outline"
          title={t("Settings")}
        />

        <View style={{marginHorizontal: 18, marginTop: 14, marginBottom: 8, backgroundColor: COLORS.white, padding: 15, borderRadius: 12}}>
          <Text style={{fontWeight: "800", color: COLORS.text, marginBottom: 10}}>{t("Language")}</Text>
          <View style={{flexDirection: "row", gap: 10}}>
            <TouchableOpacity onPress={() => setLanguage("kk")} style={{flex: 1, padding: 12, borderRadius: 9, backgroundColor: language === "kk" ? "#F3E3F1" : "#F5F5F5"}}>
              <Text style={{textAlign: "center", fontWeight: "700", color: COLORS.text}}>🇰🇿 Қазақша</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage("ru")} style={{flex: 1, padding: 12, borderRadius: 9, backgroundColor: language === "ru" ? "#F3E3F1" : "#F5F5F5"}}>
              <Text style={{textAlign: "center", fontWeight: "700", color: COLORS.text}}>🇷🇺 Русский</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ProfileItem
          icon="help-circle-outline"
          title={t("Help & Support")}
        />

        <ProfileItem
          icon="school-outline"
          title={t("About University")}
        />

        <Button
          title={t("Log out")}
          outline
        />

      </ScrollView>
    </SafeAreaView>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({
  value,
  label,
}: StatProps) {
  return (
    <View>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}

function ProfileItem({
  icon,
  title,
}: ProfileItemProps) {
  return (
    <TouchableOpacity
      style={styles.item}
    >

      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.itemText}>
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#999"
      />

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