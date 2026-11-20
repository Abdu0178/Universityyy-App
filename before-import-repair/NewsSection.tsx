import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./";
import { useLanguage } from "./";

export interface NewsItem {
  id: string;
  icon: string;
  titleKey: string;
  dateKey: string;
  summaryKey: string;
  locationKey?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    icon: "📢",
    titleKey: "FIBO University event is coming soon",
    dateKey: "Today • Universityy",
    summaryKey:
      "Студенттерге арналған ашық кездесу, жобалар таныстырылымы және студенттік клубтардың жәрмеңкесі өтеді. Барлық курс студенттерін қатысуға шақырамыз.",
    locationKey: "Акт залы • 15:00",
  },
  {
    id: "2",
    icon: "🎓",
    titleKey: "Psychology & Development Conference",
    dateKey: "Today • Universityy",
    summaryKey:
      "Оқу барысындағы стрессті басқару, уақытты тиімді жоспарлау және тұлғалық даму тақырыптарында спикерлер баяндама жасайды.",
    locationKey: "108-дәрісхана • 12:30",
  },
  {
    id: "3",
    icon: "🌙",
    titleKey: "Eid Holidays Announcement",
    dateKey: "Today • Universityy",
    summaryKey:
      "Мереке күндеріне байланысты оқу сабақтарының уақытша тоқтатылатыны және келесі сабақтың басталу күні туралы ресми хабарландыру.",
    locationKey: "Университет әкімшілігі",
  },
];

export default function NewsSection() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (selectedNews) {
    return (
      <View style={styles.detailCard}>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => setSelectedNews(null)}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
          <Text style={styles.backText}>Жаңалықтарға қайту</Text>
        </TouchableOpacity>

        <View style={styles.detailHeader}>
          <View style={styles.newsImage}>
            <Text style={styles.newsEmoji}>{selectedNews.icon}</Text>
          </View>
          <View style={styles.detailTitleBox}>
            <Text style={styles.detailTitle}>{t(selectedNews.titleKey)}</Text>
            <Text style={styles.newsDate}>{t(selectedNews.dateKey)}</Text>
          </View>
        </View>

        {selectedNews.locationKey ? (
          <Text style={styles.locationText}>{selectedNews.locationKey}</Text>
        ) : null}

        <Text style={styles.summaryText}>{selectedNews.summaryKey}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>{t("News")}</Text>

      {NEWS_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.newsCard}
          activeOpacity={0.75}
          onPress={() => setSelectedNews(item)}
        >
          <View style={styles.newsImage}>
            <Text style={styles.newsEmoji}>{item.icon}</Text>
          </View>

          <View style={styles.newsInfo}>
            <Text style={styles.newsTitle}>{t(item.titleKey)}</Text>
            <Text style={styles.newsDate}>{t(item.dateKey)}</Text>
          </View>

          <Ionicons name="chevron-forward" size={17} color="#AAA" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
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

  detailCard: {
    marginHorizontal: 18,
    marginTop: 22,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },

  backText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },

  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  detailTitleBox: {
    flex: 1,
  },

  detailTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  locationText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },

  summaryText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.text,
  },
});