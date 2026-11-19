import { useLanguage } from "../localization/LanguageContext";
import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";

import { COLORS } from "../constants/colors";

interface Course {
  name: string;
  code: string;
  credits: number;
  icon: string;
  instructor: string;
  description: string;
  lessons: string[];
}

const courses: Course[] = [
  {
    name: "Цифрлық маркетинг",
    code: "CS-201",
    credits: 3,
    icon: "📣",
    instructor: "А. Сәтбаев",
    description: "SMM, таргет жарнама, аналитика және цифрлық маркетинг негіздері.",
    lessons: ["1-сабақ: Маркетингке кіріспе", "2-сабақ: Таргет және SMM", "3-сабақ: Аналитика"],
  },
  {
    name: "Дизайнды үйрену",
    code: "CS-202",
    credits: 3,
    icon: "🎨",
    instructor: "Д. Нұрланова",
    description: "UI/UX дизайн, типографика, түстер теориясы және прототиптеу.",
    lessons: ["1-сабақ: Композиция және түстер", "2-сабақ: Типографика", "3-сабақ: Figma прототип"],
  },
  {
    name: "Жасанды интеллект",
    code: "CS-203",
    credits: 3,
    icon: "🤖",
    instructor: "М. Төлеуов",
    description: "Машиналық оқыту, нейрондық желілер және заманауи AI модельдері.",
    lessons: ["1-сабақ: AI негіздері", "2-сабақ: Машиналық оқыту", "3-сабақ: Нейрондық желілер"],
  },
  {
    name: "Бағдарламалық қамтуды басқару",
    code: "CS-204",
    credits: 3,
    icon: "💻",
    instructor: "Е. Қасымов",
    description: "Agile/Scrum әдіснамалары, командалық жұмыс және жобаны басқару.",
    lessons: ["1-сабақ: SDLC және Agile", "2-сабақ: Scrum спринттері", "3-сабақ: Сапаны бақылау"],
  },
  {
    name: "Цифрлық логистика",
    code: "CS-205",
    credits: 3,
    icon: "📦",
    instructor: "С. Әлімова",
    description: "Жеткізу тізбегін автоматтандыру, қойма есебі және логистикалық жүйелер.",
    lessons: ["1-сабақ: Цифрлық логистика", "2-сабақ: Қойманы басқару", "3-сабақ: Маршрутты оңтайландыру"],
  },
  {
    name: "Физика",
    code: "PHY-101",
    credits: 3,
    icon: "⚛️",
    instructor: "Б. Оспанов",
    description: "Механика, электромагнетизм және кванттық физиканың негізгі заңдары.",
    lessons: ["1-сабақ: Кинематика және динамика", "2-сабақ: Электр және магнетизм", "3-сабақ: Толқындар"],
  },
  {
    name: "Математика",
    code: "MAT-101",
    credits: 3,
    icon: "∑",
    instructor: "Г. Жұмабаева",
    description: "Математикалық анализ, сызықтық алгебра және ықтималдық теориясы.",
    lessons: ["1-сабақ: Шектер және туындылар", "2-сабақ: Матрицалар", "3-сабақ: Ықтималдық"],
  },
];

export default function CoursesScreen() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((course) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      course.name.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q)
    );
  });

  if (selectedCourse) {
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
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
            <Text style={styles.backText}>Курстарға қайту</Text>
          </TouchableOpacity>

          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View style={styles.courseIcon}>
                <Text style={styles.iconText}>{selectedCourse.icon}</Text>
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.detailTitle}>{selectedCourse.name}</Text>
                <Text style={styles.courseDetails}>
                  {selectedCourse.code} • {selectedCourse.credits} {t("credits")}
                </Text>
              </View>
            </View>

            <Text style={styles.metaText}>Оқытушы: {selectedCourse.instructor}</Text>
            <Text style={styles.descriptionText}>{selectedCourse.description}</Text>

            <Text style={styles.sectionTitle}>Сабақтар тізімі</Text>
            {selectedCourse.lessons.map((lesson, idx) => (
              <View key={idx} style={styles.lessonItem}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#8E24AA" />
                <Text style={styles.lessonText}>{lesson}</Text>
              </View>
            ))}
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
      >
        <Header title={t("Courses")} />

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#999" />

          <TextInput
            placeholder={t("Search")}
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredCourses.map((course) => (
          <TouchableOpacity
            key={course.code}
            style={styles.courseCard}
            activeOpacity={0.75}
            onPress={() => setSelectedCourse(course)}
          >
            <View style={styles.courseIcon}>
              <Text style={styles.iconText}>{course.icon}</Text>
            </View>

            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>{course.name}</Text>

              <Text style={styles.courseDetails}>
                {course.code} • {course.credits} {t("credits")}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
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
});