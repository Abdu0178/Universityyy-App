import {useLanguage} from "../localization/LanguageContext";
import React from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import Header from "../components/Header";

import { COLORS } from "../constants/colors";

interface Course {
  name: string;
  code: string;
  credits: number;
  icon: string;
}

const courses: Course[] = [
  {
    name: "Digital Marketing",
    code: "CS-201",
    credits: 3,
    icon: "📣",
  },

  {
    name: "Design Learning",
    code: "CS-202",
    credits: 3,
    icon: "🎨",
  },

  {
    name: "Artificial Intelligence",
    code: "CS-203",
    credits: 3,
    icon: "🤖",
  },

  {
    name: "Software Management",
    code: "CS-204",
    credits: 3,
    icon: "💻",
  },

  {
    name: "Digital Logistics",
    code: "CS-205",
    credits: 3,
    icon: "📦",
  },

  {
    name: "Physics",
    code: "PHY-101",
    credits: 3,
    icon: "⚛️",
  },

  {
    name: "Mathematics",
    code: "MAT-101",
    credits: 3,
    icon: "∑",
  },
];

export default function CoursesScreen() {
  const {t} = useLanguage();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Header title={t("Courses")} />

        <View style={styles.searchContainer}>

          <Ionicons
            name="search-outline"
            size={18}
            color="#999"
          />

          <TextInput
            placeholder={t("Search")}
            placeholderTextColor="#999"
            style={styles.searchInput}
          />

        </View>

        {courses.map((course) => (
          <View
            key={course.code}
            style={styles.courseCard}
          >

            <View style={styles.courseIcon}>
              <Text style={styles.iconText}>
                {course.icon}
              </Text>
            </View>

            <View style={styles.courseInfo}>

              <Text style={styles.courseName}>
                {t(course.name)}
              </Text>

              <Text style={styles.courseDetails}>
                {course.code} • {course.credits} {t("credits")}
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#999"
            />

          </View>
        ))}

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

  searchContainer: {
    height: 42,

    marginHorizontal: 18,
    marginBottom: 12,

    backgroundColor: COLORS.white,

    borderRadius: 10,

    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    height: 42,
    paddingHorizontal: 8,
    fontSize: 11,
  },

  courseCard: {
    marginHorizontal: 18,
    marginBottom: 8,

    backgroundColor: COLORS.white,

    borderRadius: 11,

    padding: 13,

    flexDirection: "row",
    alignItems: "center",
  },

  courseIcon: {
    width: 40,
    height: 40,

    borderRadius: 10,

    backgroundColor: "#F3E3F1",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 11,
  },

  iconText: {
    fontSize: 20,
  },

  courseInfo: {
    flex: 1,
  },

  courseName: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  courseDetails: {
    fontSize: 8,
    color: COLORS.textLight,
    marginTop: 4,
  },
});