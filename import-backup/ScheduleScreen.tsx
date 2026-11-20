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

interface LessonItem {
  id: string;
  time: string;
  subject: string;
  room: string;
  duration: string;
  bgColor: string;
}

interface DaySchedule {
  day: string;
  fullDate: string;
  lessons: LessonItem[];
}

const SCHEDULE_DAYS: DaySchedule[] = [
  {
    day: "04",
    fullDate: "2025 жылғы 4 қараша",
    lessons: [
      {
        id: "4-1",
        time: "09:00",
        subject: "Математика",
        room: "102-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#E3F2FD",
      },
      {
        id: "4-2",
        time: "11:15",
        subject: "Физика",
        room: "210-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#F3E5F5",
      },
    ],
  },
  {
    day: "05",
    fullDate: "2025 жылғы 5 қараша",
    lessons: [
      {
        id: "5-1",
        time: "10:00",
        subject: "Дизайнды үйрену",
        room: "401-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#FFF9DB",
      },
      {
        id: "5-2",
        time: "13:15",
        subject: "Цифрлық логистика",
        room: "115-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#E6F7E9",
      },
    ],
  },
  {
    day: "06",
    fullDate: "2025 жылғы 6 қараша",
    lessons: [
      {
        id: "6-1",
        time: "09:00",
        subject: "Информатика",
        room: "204-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#DCF5DC",
      },
      {
        id: "6-2",
        time: "11:15",
        subject: "Цифрлық маркетинг",
        room: "101-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#FFF3BD",
      },
      {
        id: "6-3",
        time: "13:15",
        subject: "Цифрлық маркетинг",
        room: "304-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#E1F1FC",
      },
      {
        id: "6-4",
        time: "15:40",
        subject: "Жасанды интеллект",
        room: "2-зертхана",
        duration: "1 сағ 30 мин",
        bgColor: "#EFE3FA",
      },
    ],
  },
  {
    day: "07",
    fullDate: "2025 жылғы 7 қараша",
    lessons: [
      {
        id: "7-1",
        time: "09:00",
        subject: "Бағдарламалық қамтуды басқару",
        room: "308-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#E1F1FC",
      },
      {
        id: "7-2",
        time: "14:00",
        subject: "Жасанды интеллект",
        room: "2-зертхана",
        duration: "1 сағ 30 мин",
        bgColor: "#EFE3FA",
      },
    ],
  },
  {
    day: "08",
    fullDate: "2025 жылғы 8 қараша",
    lessons: [
      {
        id: "8-1",
        time: "10:30",
        subject: "Дизайнды үйрену",
        room: "401-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#FFF3BD",
      },
    ],
  },
  {
    day: "09",
    fullDate: "2025 жылғы 9 қараша",
    lessons: [],
  },
  {
    day: "10",
    fullDate: "2025 жылғы 10 қараша",
    lessons: [
      {
        id: "10-1",
        time: "09:00",
        subject: "Математика",
        room: "102-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#DCF5DC",
      },
      {
        id: "10-2",
        time: "11:15",
        subject: "Физика",
        room: "210-аудитория",
        duration: "1 сағ 30 мин",
        bgColor: "#E1F1FC",
      },
    ],
  },
];

export default function ScheduleScreen() {
  const { t } = useLanguage();
  const [selectedDay, setSelectedDay] = useState<string>("06");

  const currentSchedule =
    SCHEDULE_DAYS.find((item) => item.day === selectedDay) || SCHEDULE_DAYS[2];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header title={t("Schedule")} />

        <Text style={styles.dateSubtitle}>{currentSchedule.fullDate}</Text>

        {/* Күндер жолағы */}
        <View style={styles.daysBar}>
          {SCHEDULE_DAYS.map((item) => {
            const isSelected = item.day === selectedDay;
            return (
              <TouchableOpacity
                key={item.day}
                style={[styles.dayCircle, isSelected && styles.dayCircleActive]}
                activeOpacity={0.75}
                onPress={() => setSelectedDay(item.day)}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
                  {item.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Сабақтар тізімі */}
        {currentSchedule.lessons.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-clear-outline" size={32} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Бұл күні сабақ жоқ</Text>
            <Text style={styles.emptySub}>Демалыс немесе бос күн</Text>
          </View>
        ) : (
          currentSchedule.lessons.map((lesson) => (
            <View key={lesson.id} style={styles.lessonRow}>
              <Text style={styles.timeLabel}>{lesson.time}</Text>

              <View style={[styles.lessonCard, { backgroundColor: lesson.bgColor }]}>
                <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                <Text style={styles.lessonMeta}>
                  {lesson.room} • {lesson.duration}
                </Text>
              </View>
            </View>
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
    paddingBottom: 95,
  },
  dateSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginHorizontal: 20,
    marginTop: -6,
    marginBottom: 14,
  },
  daysBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  dayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleActive: {
    backgroundColor: "#8E24AA",
  },
  dayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
  dayTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    marginBottom: 12,
  },
  timeLabel: {
    width: 56,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
  lessonCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  lessonSubject: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  lessonMeta: {
    fontSize: 11,
    color: "#4B5563",
  },
  emptyCard: {
    marginHorizontal: 18,
    marginTop: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    gap: 6,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});