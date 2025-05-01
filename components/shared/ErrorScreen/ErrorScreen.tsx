import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

export const ErrorScreen = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.centered}>
    <Text style={styles.errorText}>Oops!! Something went wrong</Text>
    <Pressable onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>Try again</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginBottom: 8,
    fontSize: 16,
    color: "#B91C1C",
  },

  retryText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "bold",
    padding: 8,
  },
  retryButton: {
    backgroundColor: "#D1D5DB",
    borderRadius: 100,
  },
});
