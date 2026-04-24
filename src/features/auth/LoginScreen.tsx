/**
 * LoginScreen — fake login form for Day 5.
 *
 * Validates email locally (not empty), then calls useAuth().login().
 * Mock login always succeeds — any email/password works.
 *
 * Uses shared Button and AppText for UI consistency.
 */

import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText, Button, useAuth, theme } from "@/shared";

export function LoginScreen() {
  const { login, status } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLoading = status === "loading";

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      await login(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <AppText variant="title">Welcome back</AppText>
          <AppText variant="body" style={styles.subtitle}>
            Sign in to continue
          </AppText>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            editable={!isLoading}
          />

          {error ? (
            <AppText variant="caption" style={styles.error}>
              {error}
            </AppText>
          ) : null}

          <Button
            label={isLoading ? "Signing in..." : "Sign in"}
            onPress={handleLogin}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  form: {
    gap: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background,
    minHeight: 44,
  },
  error: {
    color: "#D32F2F",
  },
});
