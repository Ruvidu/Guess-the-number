import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from "react-native";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import { BodyText } from "../components/BodyText";

const generateRandomBetw = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetw(min, max, exclude);
  } else {
    return randNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

export const GameScreen = (props) => {
  const initialGuess = generateRandomBetw(1, 100, props.userChoice);
  const [curGuess, setCurGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const curLow = useRef(1);
  const curHigh = useRef(100);
  const [dWidth, setDWidth] = useState(Dimensions.get("window").width);
  const [dHeight, setDHeight] = useState(Dimensions.get("window").height);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (curGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [curGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setDWidth(Dimensions.get("window").width);
      setDHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && curGuess < props.userChoice) ||
      (direction === "greater" && curGuess > props.userChoice)
    ) {
      Alert.alert("Dont't lie!", "You know that this is wrong!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      curHigh.current = curGuess;
    } else {
      curLow.current = curGuess + 1;
    }
    const nextNum = generateRandomBetw(
      curLow.current,
      curHigh.current,
      curGuess
    );
    setCurGuess(nextNum);
    setPastGuesses((curPastGuesses) => [nextNum, ...curPastGuesses]);
  };

  if (dHeight < 700) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{curGuess}</NumberContainer>

          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>

        <View style={styles.list}>
          <ScrollView>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 30 : 10,
    width: 300,
    maxWidth: "80%",
  },

  list: {
    width: "80%",
    flex: 1,
    paddingTop: 30,
  },

  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
