import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import colors from "../constants/colors";

export const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  number: {
    color: colors.accent,
    fontSize: 22,
  },
});
