import {useLanguage} from "../localization/LanguageContext";
import React from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import Header from "../components/Header";

import { COLORS } from "../constants/colors";

interface Grade {
  name: string;
  grade: string;
  score: number;
}

const grades: Grade[] = [
  {
    name: "Digital Marketing",
    grade: "A",
    score: 92,
  },

  {
    name: "Design Learning",
    grade: "B+",
    score: 88,
  },

  {
    name: "Software Management",
    grade: "A-",
    score: 90,
  },

  {
    name: "Digital Logistics",
    grade: "B+",
    score: 86,
  },

  {
    name: "Artificial Intelligence",
    grade: "A",
    score: 94,
  },

  {
    name: "Physics",
    grade: "B",
    score: 82,
  },

  {
    name: "Mathematics",
    grade: "A-",
    score: 91,
  },
];

export default function GradesScreen() {
  const {t} = useLanguage();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Header
          title={t("Grades")}
          subtitle={t("Final Grades")}
        />

        {/* GPA */}

        <View style={styles.gpaCard}>

          <View>
            <Text style={styles.gpa}>
              3.72
            </Text>

            <Text style={styles.gpaLabel}>
              {t("Current GPA")}
            </Text>
          </View>

          <View>
            <Text style={styles.gpa}>
              18
            </Text>

            <Text style={styles.gpaLabel}>
              {t("Credits")}
            </Text>
          </View>

        </View>

        {/* GRADES */}

        {grades.map((item) => (
          <View
            key={item.name}
            style={styles.gradeCard}
          >

            <View style={styles.info}>
              <Text style={styles.name}>
                {t(item.name)}
              </Text>

              <Text style={styles.description}>
                {t("Final examination")}
              </Text>
            </View>

            <View style={styles.gradeContainer}>

              <Text style={styles.grade}>
                {item.grade}
              </Text>

              <Text style={styles.score}>
                {item.score}%
              </Text>

            </View>

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

  gpaCard: {
    marginHorizontal: 18,
    marginBottom: 12,

    padding: 18,

    borderRadius: 15,

    backgroundColor: COLORS.primary,

    flexDirection: "row",

    justifyContent: "space-around",
  },

  gpa: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },

  gpaLabel: {
    color: "#F3D9EE",
    fontSize: 9,
    textAlign: "center",
    marginTop: 3,
  },

  gradeCard: {
    marginHorizontal: 18,
    marginBottom: 8,

    padding: 13,

    borderRadius: 11,

    backgroundColor: COLORS.white,

    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  description: {
    fontSize: 8,
    color: COLORS.textLight,
    marginTop: 4,
  },

  gradeContainer: {
    alignItems: "center",
    minWidth: 50,
  },

  grade: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.primary,
  },

  score: {
    fontSize: 8,
    color: COLORS.textLight,
    marginTop: 2,
  },
});