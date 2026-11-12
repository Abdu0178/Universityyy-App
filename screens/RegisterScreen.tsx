import {useLanguage} from "../localization/LanguageContext";
import React from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  Ionicons,
} from "@expo/vector-icons";

import Logo from "../components/Logo";
import Button from "../components/Button";

import { COLORS } from "../constants/colors";

import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

export default function RegisterScreen({
  navigation,
}: Props) {
  const {t} = useLanguage();
  const createAccount = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="chevron-back"
              size={25}
              color={COLORS.text}
            />
          </TouchableOpacity>
        </View>

        <Logo small />

        <Text style={styles.title}>
          {t("Create Account")}
        </Text>

        <TextInput
          placeholder={t("Username")}
          style={styles.input}
        />

        <TextInput
          placeholder={t("Email")}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder={t("Password")}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder={t("Confirm password")}
          secureTextEntry
          style={styles.input}
        />

        <Button
          title={t("Continue")}
          onPress={createAccount}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Login")
          }
        >
          <Text style={styles.login}>
            {t("Already have an account? Sign in")}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    padding: 26,
    paddingTop: 25,
    alignItems: "center",
  },

  backContainer: {
    width: "100%",
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginVertical: 22,
  },

  input: {
    width: "100%",
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    marginBottom: 13,
    fontSize: 12,
  },

  login: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 18,
  },
});