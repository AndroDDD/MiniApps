import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button } from "@material-ui/core";

import $ from "jquery";

import "./RandomQuizStyles.scss";

const quizData = [
  {
    question: `How many triangle faces does a tetrahedron have?`,
    answerA: `9`,
    answerB: `3`,
    answerC: `4`,
    answerD: `16`,
    correctAnswer: `16`,
  },
  {
    question: `How fast does sound travel through the air?`,
    answerA: `2.9 seconds per kilometre`,
    answerB: `6.7 seconds per mile`,
    answerC: `4.1 seconds per kilometre`,
    answerD: `1.8 seconds per mile`,
    correctAnswer: `2.9 seconds per kilometre`,
  },
  {
    question: `What date does Veterans Day occupy?`,
    answerA: `June 12`,
    answerB: `November 11`,
    answerC: `August 9`,
    answerD: `September 21`,
    correctAnswer: `November 11`,
  },
  {
    question: `What is rgb notation for slategray?`,
    answerA: `200 121 113`,
    answerB: `112 128 144`,
    answerC: `0 1 1`,
    answerD: `52 232 52`,
    correctAnswer: `112 128 144`,
  },
  {
    question: `Who was Vice President of United States between  year 2016 and 2020?`,
    answerA: `Nancy Pelosi`,
    answerB: `Joe Biden`,
    answerC: `Mike Pence`,
    answerD: `Ted Cruz`,
    correctAnswer: `Mike Pence`,
  },
  {
    question: `Which U.S. state is prone to forest fires?`,
    answerA: `Texas`,
    answerB: `New York`,
    answerC: `Utah`,
    answerD: `California`,
    correctAnswer: `California`,
  },
  {
    question: `When did the dodo go extinct?`,
    answerA: `End of seventeenth century`,
    answerB: `During Jurassic Era`,
    answerC: `Beginning of twentieth century`,
    answerD: `During Proterozoic Era `,
    correctAnswer: `End of seventeenth century`,
  },
  {
    question: `How many cities are in Texas?`,
    answerA: `376`,
    answerB: `1109`,
    answerC: `962`,
    answerD: `783 `,
    correctAnswer: `962`,
  },
  {
    question: `What did France gift America after World War II?`,
    answerA: `A middle finger`,
    answerB: `Statute of Liberty`,
    answerC: `Treaty of Versailles`,
    answerD: `Two battleships`,
    correctAnswer: `Statute of Liberty`,
  },
  {
    question: `How many brains do humans possess?`,
    answerA: `1 times 1 times 1`,
    answerB: `2`,
    answerC: `None`,
    answerD: `All the above!`,
    correctAnswer: `How many brains do humans possess?`,
  },
];

const RandomQuiz: React.FC = () => {
  // Handle screen size detection and changes
  const [screenHeight, setScreenHeight] = React.useState(() => {
    let fetchedScreenHeight = Dimensions.get("window").height;
    return fetchedScreenHeight;
  });
  $(window).on("resize", () => {
    console.log({ prevScreenHeight: screenHeight });
    setScreenHeight(() => {
      let fetchedScreenHeight = Dimensions.get("window").height;
      return fetchedScreenHeight;
    });
    console.log({ updatedScreenHeight: screenHeight });
  });

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `randomQuizDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    quizDisplay: styles2.quizDisplay,
    quizQuestion: styles2.quizQuestion,
    quizChoicesDisplay: styles2.quizChoicesDisplay,
    answerALabel: `answerALabel`,
    answerBLabel: `answerBLabel`,
    answerCLabel: `answerCLabel`,
    answerDLabel: `answerDLabel`,
    answerAText: styles2.answerAText,
    answerBText: styles2.answerBText,
    answerCText: styles2.answerCText,
    answerDText: styles2.answerDText,
    answerSubmitDisplay: styles2.answerSubmitDisplay,
    answerSubmitButton: { color: "cyan" },
    finishQuizButton: { color: "orangered" },
    retakeQuizButton: { color: "purple" },
  });

  // Declare variable tracking current quiz
  const [currentQuiz, setCurrentQuiz] = React.useState(0);

  // Declare variable tracking current quiz score
  const [quizScore, setQuizScore] = React.useState(0);

  // Declare variable tracking selected answer
  const [selectedAnswer, setSelectedAnswer] = React.useState(``);

  // Declare variable to hold index of last quiz
  const lastQuizIndex = quizData.length - 1;

  // Declare varible tracking quiz completion
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  // Declare function to handle answer submission
  const submitAnswer = () => {
    if (selectedAnswer === quizData[currentQuiz].correctAnswer) {
      let updatedScore = quizScore + 1;
      setQuizScore(updatedScore);
    }

    if (currentQuiz < lastQuizIndex) {
      let nextQuiz = currentQuiz + 1;
      setCurrentQuiz(nextQuiz);
    }
  };

  // Declare function for finishing quiz
  const finishQuiz = () => {
    setQuizCompleted(true);
  };

  // Declare function for retaking quiz
  const retakeQuiz = () => {
    setQuizScore(0);
    setCurrentQuiz(0);
    setSelectedAnswer(``);
    setQuizCompleted(false);
  };

  // Handle screen size changes
  React.useEffect(() => {
    console.log({ detectedScreenHeightChange: screenHeight });
    let updatedHeightConfig = {
      ...styles,
      mainDisplaySupportStyle: {
        ...styles.mainDisplaySupportStyle,
        height: `${screenHeight}px`,
      },
    };
    setStyles(updatedHeightConfig);
  }, [screenHeight]);

  switch (quizCompleted) {
    case true:
      return (
        <div
          className={styles.mainDisplaySupportClass}
          style={styles.mainDisplaySupportStyle}
        >
          <View style={styles.mainDisplay}>
            <View style={styles.quizDisplay}>
              <Text>{`Quiz completed.!.`}</Text>
              <Text>{`You've scored ${quizScore} out of ${quizData.length}`}</Text>
              <Button
                style={styles.retakeQuizButton}
                onClick={retakeQuiz}
              >{`RETAKE QUIZ?`}</Button>
            </View>
          </View>
        </div>
      );
    case false:
      return (
        <div
          className={styles.mainDisplaySupportClass}
          style={styles.mainDisplaySupportStyle}
        >
          <View style={styles.mainDisplay}>
            <View style={styles.quizDisplay}>
              <Text style={styles.quizQuestion}>
                {quizData[currentQuiz].question}
              </Text>
              <View style={styles.quizChoicesDisplay}>
                <label className={styles.answerALabel}>
                  <input
                    onClick={(event) => {
                      let chosenAnswer = event.currentTarget.value;
                      setSelectedAnswer(chosenAnswer);
                    }}
                    type={"radio"}
                    checked={
                      selectedAnswer === quizData[currentQuiz].answerA
                        ? true
                        : false
                    }
                    value={quizData[currentQuiz].answerA}
                  />
                  <Text style={styles.answerAText}>
                    {quizData[currentQuiz].answerA}
                  </Text>
                </label>
                <label className={styles.answerBLabel}>
                  <input
                    onClick={(event) => {
                      let chosenAnswer = event.currentTarget.value;
                      setSelectedAnswer(chosenAnswer);
                    }}
                    type={"radio"}
                    checked={
                      selectedAnswer === quizData[currentQuiz].answerB
                        ? true
                        : false
                    }
                    value={quizData[currentQuiz].answerB}
                  />
                  <Text style={styles.answerBText}>
                    {quizData[currentQuiz].answerB}
                  </Text>
                </label>
                <label className={styles.answerCLabel}>
                  <input
                    onClick={(event) => {
                      let chosenAnswer = event.currentTarget.value;
                      setSelectedAnswer(chosenAnswer);
                    }}
                    type={"radio"}
                    checked={
                      selectedAnswer === quizData[currentQuiz].answerC
                        ? true
                        : false
                    }
                    value={quizData[currentQuiz].answerC}
                  />
                  <Text style={styles.answerCText}>
                    {quizData[currentQuiz].answerC}
                  </Text>
                </label>
                <label className={styles.answerDLabel}>
                  <input
                    onClick={(event) => {
                      let chosenAnswer = event.currentTarget.value;
                      setSelectedAnswer(chosenAnswer);
                    }}
                    type={"radio"}
                    checked={
                      selectedAnswer === quizData[currentQuiz].answerD
                        ? true
                        : false
                    }
                    value={quizData[currentQuiz].answerD}
                  />
                  <Text style={styles.answerDText}>
                    {quizData[currentQuiz].answerD}
                  </Text>
                </label>
              </View>
              <View style={styles.answerSubmitDisplay}>
                {currentQuiz === lastQuizIndex ? (
                  <Button style={styles.finishQuizButton} onClick={finishQuiz}>
                    {"FINISH QUIZ!"}
                  </Button>
                ) : (
                    <Button
                      style={styles.answerSubmitButton}
                      onClick={submitAnswer}
                    >
                      {"SUBMIT ANSWER"}
                    </Button>
                  )}
              </View>
            </View>
          </View>
        </div>
      );
  }
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  quizDisplay: {
    margin: "auto",
    paddingTop: "10px",
    paddingBottom: "10px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "500px",
    height: "500px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    borderRadius: 15,
  },
  quizQuestion: {
    color: "rgba(0, 0, 0, 0.75)",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
  },
  quizChoicesDisplay: {
    position: "relative",
    top: "15px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  answerAText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "500",
  },
  answerBText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "500",
  },
  answerCText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "500",
  },
  answerDText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "500",
  },
  answerSubmitDisplay: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RandomQuiz;
