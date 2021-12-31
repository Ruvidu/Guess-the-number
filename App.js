import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import { GameOver } from "./screens/GameOver";
import { GameScreen } from "./screens/GameScreen";
import { StartGame } from "./screens/StartGame";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNum, setUserNum] = useState();
  const [guessRounds, setGuessrounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessrounds(0);
    setUserNum(null);
  };

  const startGameHandler = (selectedNum) => {
    setUserNum(selectedNum);
    setGuessrounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessrounds(numOfRounds);
  };
  let content = <StartGame onStartGame={startGameHandler} />;

  if (userNum && guessRounds <= 0) {
    content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        userNum={userNum}
        roundsNum={guessRounds}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
