import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { BodyText } from "../components/BodyText";
import { MainButton } from "../components/MainButton";
import colors from "../constants/colors";

export const GameOver = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <BodyText style={styles.tt}>Game is Over!</BodyText>
        <View style={styles.imageCon}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.resCon}>
          <BodyText style={styles.textt}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNum}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNum}</Text>.
          </BodyText>
        </View>

        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  tt: {
    fontSize: 23,
  },

  imageCon: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },

  textt: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 60 : 20,
  },

  resCon: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },

  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
});
