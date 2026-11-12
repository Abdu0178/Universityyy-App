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

import Logo from "../components/Logo";
import Button from "../components/Button";

import { COLORS } from "../constants/colors";

import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: Props) {
  const {t} = useLanguage();
  const login = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        <Logo />

        <Text style={styles.title}>
          {t("Welcome Back!")}
        </Text>

        <Text style={styles.subtitle}>
          {t("Sign in to continue!")}
        </Text>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.google}>
            G
          </Text>

          <Text style={styles.socialText}>
            {t("Log in with Google")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.facebook}>
            f
          </Text>

          <Text style={styles.socialText}>
            {t("Log in with Facebook")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.or}>
          {t("or")}
        </Text>

        <TextInput
          placeholder={t("Username")}
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TextInput
          placeholder={t("Password")}
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>
            {t("Forgot password?")}
          </Text>
        </TouchableOpacity>

        <Button
          title={t("Log in")}
          onPress={login}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Register")
          }
        >
          <Text style={styles.register}>
            {t("Don't have an account? Sign up")}
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
    paddingTop: 40,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 22,
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
    marginBottom: 25,
  },

  socialButton: {
    width: "100%",
    height: 44,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    marginBottom: 9,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },

  socialText: {
    fontSize: 11,
    color: COLORS.text,
  },

  google: {
    color: "#4285F4",
    fontSize: 17,
    fontWeight: "900",
  },

  facebook: {
    color: "#1877F2",
    fontSize: 18,
    fontWeight: "900",
  },

  or: {
    color: "#AAA",
    fontSize: 12,
    marginVertical: 16,
  },

  input: {
    width: "100%",
    height: 46,

    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",

    marginBottom: 13,

    fontSize: 12,
    color: COLORS.text,
  },

  forgot: {
    alignSelf: "flex-end",
    color: COLORS.primary,
    fontSize: 10,
  },

  register: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 18,
  },
});