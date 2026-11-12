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

import { COLORS } from "../constants/colors";

export default function HomeScreen() {
  const {t} = useLanguage();
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

            <Text style={styles.name}>
              Ammer Ali
            </Text>

            <Text style={styles.course}>
              {t("Computer Science \u2022 3rd Year")}
            </Text>

          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              AA
            </Text>
          </View>
        </View>

        {/* TODAY */}

        <Text style={styles.sectionTitle}>
          {t("Today's Classes")}
        </Text>

        <View style={styles.classCard}>

          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              09:00
            </Text>

            <Text style={styles.endTime}>
              10:30
            </Text>
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
            <Text style={styles.nowText}>
              {t("Now")}
            </Text>
          </View>

        </View>

        {/* NEWS */}

        <Text style={styles.sectionTitle}>
          {t("News")}
        </Text>

        <NewsCard
          icon="📢"
          title={t("FIBO University event is coming soon")}
        />

        <NewsCard
          icon="🎓"
          title={t("Psychology & Development Conference")}
        />

        <NewsCard
          icon="🌙"
          title={t("Eid Holidays Announcement")}
        />

        {/* QUICK ACCESS */}

        <Text style={styles.sectionTitle}>
          {t("Quick Access")}
        </Text>

        <View style={styles.quickGrid}>

          <QuickItem
            icon="📚"
            title={t("Courses")}
          />

          <QuickItem
            icon="📅"
            title={t("Schedule")}
          />

          <QuickItem
            icon="📊"
            title={t("Grades")}
          />

          <QuickItem
            icon="👤"
            title={t("Profile")}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

interface NewsCardProps {
  icon: string;
  title: string;
}

function NewsCard({
  icon,
  title,
}: NewsCardProps) {
  const {t} = useLanguage();
  return (
    <TouchableOpacity style={styles.newsCard}>
      <View style={styles.newsImage}>
        <Text style={styles.newsEmoji}>
          {icon}
        </Text>
      </View>

      <View style={styles.newsInfo}>
        <Text style={styles.newsTitle}>
          {title}
        </Text>

        <Text style={styles.newsDate}>
          {t("Today • Universityy")}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={17}
        color="#AAA"
      />
    </TouchableOpacity>
  );
}

interface QuickItemProps {
  icon: string;
  title: string;
}

function QuickItem({
  icon,
  title,
}: QuickItemProps) {
  return (
    <TouchableOpacity style={styles.quickItem}>
      <Text style={styles.quickIcon}>
        {icon}
      </Text>

      <Text style={styles.quickTitle}>
        {title}
      </Text>
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

    backgroundColor:
      COLORS.primaryLight,

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

  newsCard: {
    marginHorizontal: 18,
    backgroundColor: COLORS.white,

    borderRadius: 12,

    padding: 10,
    marginBottom: 8,

    flexDirection: "row",
    alignItems: "center",
  },

  newsImage: {
    width: 58,
    height: 58,

    borderRadius: 9,

    backgroundColor: "#F4E5F2",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  newsEmoji: {
    fontSize: 25,
  },

  newsInfo: {
    flex: 1,
  },

  newsTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.text,
  },

  newsDate: {
    fontSize: 8,
    color: COLORS.textLight,
    marginTop: 7,
  },

  quickGrid: {
    marginHorizontal: 18,

    flexDirection: "row",
    flexWrap: "wrap",

    gap: 9,
  },

  quickItem: {
    width: "48%",
    height: 80,

    backgroundColor: COLORS.white,

    borderRadius: 12,

    padding: 13,
  },

  quickIcon: {
    fontSize: 27,
  },

  quickTitle: {
    fontSize: 11,
    fontWeight: "800",
    marginTop: 5,
  },
});