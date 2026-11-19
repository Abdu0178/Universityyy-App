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
import { COLORS } from "../constants/colors";
import { useLanguage } from "../localization/LanguageContext";

interface GradeBreakdown {
  label: string;
  score: string;
}

interface SubjectGrade {
  id: string;
  name: string;
  typeLabel: string;
  gradeLetter: string;
  percentage: string;
  credits: number;
  instructor: string;
  breakdown: GradeBreakdown[];
}

const SUBJECT_GRADES: SubjectGrade[] = [
  {
    id: "1",
    name: "Цифрлық маркетинг",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "A",
    percentage: "92%",
    credits: 3,
    instructor: "А. Сәтбаев",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "90%" },
      { label: "2-аралық бақылау (РК2)", score: "93%" },
      { label: "Қорытынды емтихан", score: "93%" },
    ],
  },
  {
    id: "2",
    name: "Дизайнды үйрену",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "B+",
    percentage: "88%",
    credits: 3,
    instructor: "Д. Нұрланова",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "86%" },
      { label: "2-аралық бақылау (РК2)", score: "89%" },
      { label: "Қорытынды емтихан", score: "89%" },
    ],
  },
  {
    id: "3",
    name: "Бағдарламалық қамтуды басқару",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "A-",
    percentage: "90%",
    credits: 3,
    instructor: "Е. Қасымов",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "88%" },
      { label: "2-аралық бақылау (РК2)", score: "91%" },
      { label: "Қорытынды емтихан", score: "91%" },
    ],
  },
  {
    id: "4",
    name: "Цифрлық логистика",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "B+",
    percentage: "86%",
    credits: 3,
    instructor: "С. Әлімова",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "85%" },
      { label: "2-аралық бақылау (РК2)", score: "87%" },
      { label: "Қорытынды емтихан", score: "86%" },
    ],
  },
  {
    id: "5",
    name: "Жасанды интеллект",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "A",
    percentage: "94%",
    credits: 3,
    instructor: "М. Төлеуов",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "92%" },
      { label: "2-аралық бақылау (РК2)", score: "95%" },
      { label: "Қорытынды емтихан", score: "95%" },
    ],
  },
  {
    id: "6",
    name: "Физика",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "B",
    percentage: "82%",
    credits: 3,
    instructor: "Б. Оспанов",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "80%" },
      { label: "2-аралық бақылау (РК2)", score: "84%" },
      { label: "Қорытынды емтихан", score: "82%" },
    ],
  },
  {
    id: "7",
    name: "Математика",
    typeLabel: "Қорытынды емтихан",
    gradeLetter: "A-",
    percentage: "91%",
    credits: 3,
    instructor: "Г. Жұмабаева",
    breakdown: [
      { label: "1-аралық бақылау (РК1)", score: "90%" },
      { label: "2-аралық бақылау (РК2)", score: "91%" },
      { label: "Қорытынды емтихан", score: "92%" },
    ],
  },
];

export default function GradesScreen() {
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<SubjectGrade | null>(null);

  if (selectedSubject) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedSubject(null)}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
            <Text style={styles.backText}>Бағаларға қайту</Text>
          </TouchableOpacity>

          <View style={styles.detailSummaryCard}>
            <View>
              <Text style={styles.detailTitle}>{selectedSubject.name}</Text>
              <Text style={styles.detailSub}>
                {selectedSubject.instructor} • {selectedSubject.credits} кредит
              </Text>
            </View>
            <View style={styles.detailScoreBox}>
              <Text style={styles.detailGradeLetter}>{selectedSubject.gradeLetter}</Text>
              <Text style={styles.detailPercent}>{selectedSubject.percentage}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeading}>Бағалардың бөлінуі</Text>

          {selectedSubject.breakdown.map((item, idx) => (
            <View key={idx} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <Text style={styles.breakdownScore}>{item.score}</Text>
            </View>
          ))}
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
        <Header title={t("Grades")} />

        <Text style={styles.subtitle}>Қорытынды бағалар</Text>

        {/* GPA & Credits Card */}
        <View style={styles.gpaBanner}>
          <View style={styles.gpaCol}>
            <Text style={styles.gpaValue}>3.72</Text>
            <Text style={styles.gpaLabel}>Ағымдағы GPA</Text>
          </View>
          <View style={styles.gpaDivider} />
          <View style={styles.gpaCol}>
            <Text style={styles.gpaValue}>18</Text>
            <Text style={styles.gpaLabel}>Кредиттер</Text>
          </View>
        </View>

        {/* Subjects List */}
        {SUBJECT_GRADES.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={styles.gradeCard}
            activeOpacity={0.75}
            onPress={() => setSelectedSubject(subject)}
          >
            <View style={styles.gradeLeft}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectType}>{subject.typeLabel}</Text>
            </View>

            <View style={styles.gradeRight}>
              <Text style={styles.gradeLetter}>{subject.gradeLetter}</Text>
              <Text style={styles.gradePercent}>{subject.percentage}</Text>
            </View>
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
    paddingBottom: 95,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginHorizontal: 20,
    marginTop: -6,
    marginBottom: 14,
  },
  gpaBanner: {
    marginHorizontal: 18,
    marginBottom: 18,
    backgroundColor: "#8E24AA",
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  gpaCol: {
    flex: 1,
    alignItems: "center",
  },
  gpaDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  gpaValue: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 4,
  },
  gpaLabel: {
    fontSize: 11,
    color: "#F3E8F5",
  },
  gradeCard: {
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gradeLeft: {
    flex: 1,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 3,
  },
  subjectType: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  gradeRight: {
    alignItems: "flex-end",
  },
  gradeLetter: {
    fontSize: 15,
    fontWeight: "800",
    color: "#8E24AA",
    marginBottom: 2,
  },
  gradePercent: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 14,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  detailSummaryCard: {
    marginHorizontal: 18,
    marginBottom: 18,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },
  detailSub: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  detailScoreBox: {
    alignItems: "flex-end",
  },
  detailGradeLetter: {
    fontSize: 20,
    fontWeight: "800",
    color: "#8E24AA",
  },
  detailPercent: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginHorizontal: 18,
    marginBottom: 10,
  },
  breakdownRow: {
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  breakdownScore: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8E24AA",
  },
});