
import { useLanguage } from "../localization/LanguageContext";
import React, { useState, useEffect, useCallback } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import { getCourses } from "../services/api";

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  icon: string;
  instructor: string;
  description: string;
  lessons: string[];
}

interface ApiCourse {
  id: number;
  title: string;
  teacher: string;
  credits: number;
  code?: string;
  icon?: string;
  description?: string;
  lessons?: string[];
}

export default function CoursesScreen() {
  const { t } = useLanguage();

  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Серверден курстарды алу
  const loadCourses = useCallback(async () => {
    try {
      setError("");

      const data: ApiCourse[] = await getCourses();

      // API деректерін экран форматына келтіру
      const formattedCourses: Course[] = data.map(
        (course) => ({
          id: course.id,
          name: course.title,
          code: course.code || `CS-${course.id}`,
          credits: course.credits,
          icon: course.icon || "📚",
          instructor: course.teacher,
          description:
            course.description || "Курс туралы ақпарат",
          lessons: course.lessons || [],
        })
      );

      setCourses(formattedCourses);
    } catch (err) {
      console.log("API қатесі:", err);
      setError("Курстарды жүктеу мүмкін болмады");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Тізімді төмен тартып жаңарту
  const onRefresh = () => {
    setRefreshing(true);
    loadCourses();
  };

  // Курстарды іздеу
  const filteredCourses = courses.filter((course) => {
    const q = searchQuery.toLowerCase().trim();

    if (!q) return true;

    return (
      course.name.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q)
    );
  });

  // Таңдалған курстың толық ақпараты
  if (selectedCourse) {
    const currentCourse =
      courses.find((c) => c.id === selectedCourse.id) ||
      selectedCourse;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCourse(null)}
            activeOpacity={0.75}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={COLORS.text}
            />
            <Text style={styles.backText}>
              Курстарға қайту
            </Text>
          </TouchableOpacity>

          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View style={styles.courseIcon}>
                <Text style={styles.iconText}>
                  {currentCourse.icon}
                </Text>
              </View>

              <View style={styles.courseInfo}>
                <Text style={styles.detailTitle}>
                  {currentCourse.name}
                </Text>

                <Text style={styles.courseDetails}>
                  {currentCourse.code} •{" "}
                  {currentCourse.credits} {t("credits")}
                </Text>
              </View>
            </View>

            <Text style={styles.metaText}>
              Оқытушы: {currentCourse.instructor}
            </Text>

            <Text style={styles.descriptionText}>
              {currentCourse.description}
            </Text>

            <Text style={styles.sectionTitle}>
              Сабақтар тізімі
            </Text>

            {currentCourse.lessons.length > 0 ? (
              currentCourse.lessons.map((lesson, idx) => (
                <View key={idx} style={styles.lessonItem}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#8E24AA"
                  />
                  <Text style={styles.lessonText}>
                    {lesson}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.descriptionText}>
                Әзірге сабақтар қосылмаған
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#8E24AA"
          />
        }
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
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#8E24AA"
            style={{ marginTop: 40 }}
          />
        ) : error ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{error}</Text>

            <TouchableOpacity onPress={loadCourses}>
              <Text style={styles.retryText}>
                Қайта жүктеу
              </Text>
            </TouchableOpacity>
          </View>
        ) : filteredCourses.length === 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Курстар табылмады
            </Text>
          </View>
        ) : (
          filteredCourses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              activeOpacity={0.75}
              onPress={() => setSelectedCourse(course)}
            >
              <View style={styles.courseIcon}>
                <Text style={styles.iconText}>
                  {course.icon}
                </Text>
              </View>

              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>
                  {course.name}
                </Text>

                <Text style={styles.courseDetails}>
                  {course.code} • {course.credits}{" "}
                  {t("credits")}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          ))
        )}
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
    color: COLORS.text,
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

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 12,
  },

  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  detailCard: {
    marginHorizontal: 18,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
  },

  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  detailTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  metaText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  descriptionText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  lessonText: {
    fontSize: 12,
    color: COLORS.text,
  },

  messageContainer: {
    padding: 25,
    alignItems: "center",
  },

  messageText: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: "center",
  },

  retryText: {
    color: "#8E24AA",
    fontWeight: "700",
    marginTop: 15,
  },
});
