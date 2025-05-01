import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { APP_STRINGS, COLORS_APP } from "@constants";

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          {APP_STRINGS.notFound.title}
        </Link>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_APP.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: COLORS_APP.textColor,
  },
});
