import React, { useState } from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import HomeScreen from "./HomeScreen";
import CoursesScreen from "./CoursesScreen";
import ScheduleScreen from "./ScheduleScreen";
import GradesScreen from "./GradesScreen";
import ProfileScreen from "./ProfileScreen";

import BottomNav, {
  TabName,
} from "../components/BottomNav";

import { COLORS } from "../constants/colors";

export default function MainScreen() {
  const [activeTab, setActiveTab] =
    useState<TabName>("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "courses":
        return <CoursesScreen />;

      case "schedule":
        return <ScheduleScreen />;

      case "grades":
        return <GradesScreen />;

      case "profile":
        return <ProfileScreen />;

      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {renderScreen()}
      </View>

      <BottomNav
        active={activeTab}
        onChange={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screen: {
    flex: 1,
  },
});