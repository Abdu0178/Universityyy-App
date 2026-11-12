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

interface ScheduleItem {
  time: string;
  subject: string;
  room: string;
  color: string;
}

const schedule: ScheduleItem[] = [
  {
    time: "09:00",
    subject: "Computer Science",
    room: "Room 204",
    color: COLORS.green,
  },

  {
    time: "11:15",
    subject: "Digital Marketing",
    room: "Room 101",
    color: COLORS.yellow,
  },

  {
    time: "13:15",
    subject: "Digital Marketing",
    room: "Room 304",
    color: COLORS.blue,
  },

  {
    time: "15:40",
    subject: "Artificial Intelligence",
    room: "Lab 2",
    color: COLORS.purple,
  },
];

export default function ScheduleScreen() {
  const {t} = useLanguage();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Header
          title={t("Schedule")}
          subtitle={t("06 November 2025")}
        />

        {/* DAYS */}

        <View style={styles.days}>

          <Text style={styles.day}>
            04
          </Text>

          <Text style={styles.day}>
            05
          </Text>

          <View style={styles.activeDay}>
            <Text style={styles.activeDayText}>
              06
            </Text>
          </View>

          <Text style={styles.day}>
            07
          </Text>

          <Text style={styles.day}>
            08
          </Text>

          <Text style={styles.day}>
            09
          </Text>

          <Text style={styles.day}>
            10
          </Text>

        </View>

        {/* SCHEDULE */}

        {schedule.map((item) => (
          <View
            key={item.time}
            style={styles.row}
          >

            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {item.time}
              </Text>
            </View>

            <View
              style={[
                styles.lessonCard,
                {
                  backgroundColor:
                    item.color,
                },
              ]}
            >

              <Text style={styles.subject}>
                {t(item.subject)}
              </Text>

              <Text style={styles.room}>
                {t(item.room)} • {t("1h 30m")}
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

  days: {
    marginHorizontal: 18,

    backgroundColor: COLORS.white,

    borderRadius: 12,

    padding: 12,

    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },

  day: {
    fontSize: 10,
    color: COLORS.textLight,
  },

  activeDay: {
    width: 31,
    height: 31,

    borderRadius: 16,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  activeDayText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
  },

  row: {
    marginHorizontal: 18,
    marginTop: 12,

    flexDirection: "row",
    alignItems: "center",
  },

  timeContainer: {
    width: 55,
  },

  time: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.text,
  },

  lessonCard: {
    flex: 1,

    borderRadius: 10,

    padding: 13,
  },

  subject: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  room: {
    fontSize: 9,
    color: "#666",
    marginTop: 5,
  },
});