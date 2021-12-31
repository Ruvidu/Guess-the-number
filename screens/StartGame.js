import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { NumberContainer } from "../components/NumberContainer";
import colors from "../constants/colors";
import { BodyText } from "../components/BodyText";
import { MainButton } from "../components/MainButton";

export const StartGame = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectednum, setSelectedNum] = useState();
  const [btnWidth, setBtnWidth] = useState(Dimensions.get("window").width / 4);

  const numInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setBtnWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  const confirmInputHandler = () => {
    const chosenNum = parseInt(enteredValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
        {
          test: "Okay",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNum(chosenNum);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryCon}>
        <Text>You Selected</Text>
        <NumberContainer>{selectednum}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectednum)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <BodyText style={styles.text}>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                autoCorrect={false}
                onChangeText={numInputHandler}
                value={enteredValue}
              />
              <View style={styles.btnContainer}>
                <View style={{ width: btnWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={colors.accent}
                  />
                </View>
                <View style={{ width: btnWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },

  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },

  // button: {
  //   // width: 100
  //   width: Dimensions.get("window").width / 4,
  // },

  input: {
    width: 50,
    textAlign: "center",
  },

  summaryCon: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans",
  },
});
