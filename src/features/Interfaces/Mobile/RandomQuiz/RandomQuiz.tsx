import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./RandomQuizStyles.scss";

// Declare variable holding quiz api url
const QuizAPIURL = `https://opentdb.com/api.php`;

// Declare function shuffling array
const shuffleArray = (array: Array<string>) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;

  return array;
};
// Declare component handling return view and processes
const MobileRandomQuiz: React.FC = () => {
  // Handle screen size detection and changes
  // Declare variable tracking screen height
  const [screenHeight, setScreenHeight] = React.useState(
    Dimensions.get("window").height
  );
  // Declare variable tracking screen width
  const [screenWidth, setScreenWidth] = React.useState(
    Dimensions.get("window").width
  );
  // Handle screen size change
  $(window).on("resize", () => {
    setScreenHeight(() => {
      return Dimensions.get("window").height;
    });
    setScreenWidth(() => {
      return Dimensions.get("window").width;
    });
  });

  React.useEffect(() => {
    setStyles(() => {
      let updatedSizes = {
        ...styles,
        mainDisplaySupport: {
          ...styles.mainDisplaySupport,
          height: screenHeight,
        },
        backgroundImage: {
          ...styles.backgroundImage,
          height: screenHeight,
        },
      };
      return updatedSizes;
    });
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupport: { width: "100%", height: screenHeight },
    backgroundImage: { width: "100%", height: screenHeight },
    headerBar: `headerBarForRQ`,
    backToIndexPageButton: `backToIndexPageButtonForRQ`,
    switchStylesButton: `switchStylesButtonForRQ`,
    mainHeader: styles2.mainHeader,
    mainHeaderTitleView: styles2.mainHeaderTitleView,
    mainHeaderTitle: styles2.mainHeaderTitle,
    quizQuestionView: styles2.quizQuestionView,
    quizQuestionTitleView: styles2.quizQuestionTitleView,
    quizQuestionTitleText: styles2.quizQuestionTitleText,
    quizAnswersView: styles2.quizAnswersView,
    quizAnswerContainer: styles2.quizAnswerContainer,
    quizAnswerText: styles2.quizAnswerText,
    quizAnswerInput: `quizAnswerInput`,
    quizAnswerSubmitButtonView: styles2.quizAnswerSubmitButtonView,
    quizAnswerSubmitButton: `quizAnswerSubmitButton`,
    finishedQuizSummaryView: styles2.finishedQuizSummaryView,
    quizSummaryHeader: styles2.quizSummaryHeader,
    quizSummaryDifficultyText: styles2.quizSummaryDifficultyText,
    quizSummaryNumOfQuestionsText: styles2.quizSummaryNumOfQuestionsText,
    quizSummaryScoreView: styles2.quizSummaryScoreView,
    quizSummaryScore: styles2.quizSummaryScore,
    quizSummaryCategoriesView: styles2.quizSummaryCategoriesView,
    quizSummaryCategoryText: styles2.quizSummaryCategoryText,
    newQuizButtonView: styles2.newQuizButtonView,
    newQuizButton: `newQuizButton`,
    wisdomView: styles2.wisdomView,
    wisdomQuoteText: styles2.wisdomQuoteText,
    wisdomAuthorText: styles2.wisdomAuthorText,
    returnToQuizButtonView: styles2.returnToQuizButtonView,
    returnToQuizButton: `returnToQuizButton`,
    genericText: styles2.genericText,
  });

  // Declare variable holding wisdom data
  const [wisdomData, setWisdomData] = React.useState({ author: ``, quote: `` });
  // Declare variable toggling wisdom data retrieval
  const [needWisdom, setNeedWisdom] = React.useState(false);
  // Declare variable holding question difficulties options
  const [difficultyLevel, setDifficultyLevel] = React.useState([
    `easy`,
    `medium`,
    `hard`,
  ]);
  // Declare variable holding current quiz view
  const [quizPage, setQuizPage] = React.useState(`quizzing`);
  // Declare variable tracking new quiz
  const [quizzesTaken, setQuizzesTaken] = React.useState(0);
  // Declare variable holding quizQuestions
  const [quiz, setQuiz] = React.useState<
    Array<{
      question: string;
      answers: Array<string>;
      correctAnswer: number;
      category: string;
      type: string;
      difficulty: string;
    }>
  >();
  // Declare variable holding finished quiz summary
  const [quizSummary, setQuizSummary] = React.useState({
    numberOfQuestions: 0,
    score: 0,
    categories: [``],
    difficulty: ``,
  });

  // Declare variable holding current question index
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  // Declare variable holding quiz question view
  const [quizView, setQuizView] = React.useState(<></>);
  // Declare variable holding answer for submission
  const [answerHold, setAnswerHold] = React.useState(-1);
  // Declare variable holding submit button view
  const [answerSubmitButtonView, setAnswerSubmitButtonView] = React.useState(
    <View style={styles.quizAnswerSubmitButtonView}>
      <button
        className={styles.quizAnswerSubmitButton}
        onClick={(event) => {
          console.log({ answerHold });
          if (answerHold !== -1) {
            console.log(`answer selected`);
          }
        }}
      >{`SUBMIT ANSWER`}</button>
    </View>
  );
  // Declare variable tracking quiz score
  const [quizScore, setQuizScore] = React.useState(0);

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle wisdom quote retrieval
  React.useEffect(() => {
    if (needWisdom) {
      const retrieveWisdomQuote = async () => {
        const wisdomQuotesFetched = await (
          await fetch(`https://type.fit/api/quotes`)
        ).json();
        console.log({ wisdomQuotesFetched });
        const randomQuizIndex = Math.floor(Math.random() * 1500);
        console.log({ wiseQuote: wisdomQuotesFetched[randomQuizIndex] });
        setWisdomData({
          author: wisdomQuotesFetched[randomQuizIndex].author,
          quote: wisdomQuotesFetched[randomQuizIndex].text,
        });
        setNeedWisdom(false);
      };
      retrieveWisdomQuote();
    }
  }, [needWisdom]);

  // Handle quiz data retrieval
  React.useEffect(() => {
    // Declare variable generating number of questions
    const numberOfQuestions = Math.floor(Math.random() * 10 + 5);
    // Declare function generating random category
    const getRandomCategory = () => {
      let category = Math.floor(Math.random() * 24 + 9);
      return category;
    };
    // Declare array holding fetched quiz questions
    let storedQuestions = [
      {
        question: `Are you ready?`,
        answers: ["YES:-)", "NO:-("],
        correctAnswer: 0,
        category: "Initial Question",
        type: "Boolean",
        difficulty: "easy",
      },
    ];

    // Declare function handling retrieval of quiz data
    const retrieveQuizData = async () => {
      // Declare variable holding fetched categories
      let tempCategoriesHold: Array<string> = [];
      // Declare variable holding average difficulty
      let difficultyFetched = 0;
      // Fetch, loop thru and prepare all quiz question data
      for (let i = 0; i < numberOfQuestions; i++) {
        // Get random category
        let chosenCategory = getRandomCategory();
        // Get random difficulty
        let chosenDifficulty = difficultyLevel[Math.floor(Math.random() * 3)];
        // Fetch quiz data
        const quizDataFetched = await (
          await fetch(
            `${QuizAPIURL}?amount=1&category=${chosenCategory}&difficulty=${chosenDifficulty}`
          )
        ).json();
        // Declare variable holding correct answer index

        let fetchedAnswers = [
          ...quizDataFetched.results[0].incorrect_answers,
          quizDataFetched.results[0].correct_answer,
        ];
        let configgedAnswers = shuffleArray(fetchedAnswers);
        let correctAnswerIndex = -1;
        configgedAnswers.forEach((confAnswer, index) => {
          if (confAnswer === quizDataFetched.results[0].correct_answer) {
            correctAnswerIndex = index;
          }
        });
        let configgedQuestion = {
          question: quizDataFetched.results[0].question,
          answers: configgedAnswers,
          correctAnswer: correctAnswerIndex,
          category: quizDataFetched.results[0].category,
          type: quizDataFetched.results[0].type,
          difficulty: quizDataFetched.results[0].difficulty,
        };

        storedQuestions.push(configgedQuestion);
        // Handle initial quiz summary config
        let categoryAdded = false;
        tempCategoriesHold.forEach((category) => {
          if (configgedQuestion.category === category) {
            categoryAdded = true;
          }
        });
        if (!categoryAdded) {
          tempCategoriesHold.push(configgedQuestion.category);
        }
        if (configgedQuestion.difficulty === "easy") {
          difficultyFetched = difficultyFetched + 1;
        } else if (configgedQuestion.difficulty === "medium") {
          difficultyFetched = difficultyFetched + 2;
        }
        if (configgedQuestion.difficulty === "hard") {
          difficultyFetched = difficultyFetched + 3;
        }

        console.log({ configgedQuestion });
      }

      console.log({
        difficultyFetched,
        storeQLength: storedQuestions.length,
        difficultyRaw: difficultyFetched / storedQuestions.length,
      });
      difficultyFetched = Math.round(
        difficultyFetched / storedQuestions.length
      );
      let clarifiedDifficulty = ``;
      if (difficultyFetched === 1) {
        clarifiedDifficulty = `easy`;
      } else if (difficultyFetched === 2) {
        clarifiedDifficulty = `medium`;
      } else if (difficultyFetched === 3) {
        clarifiedDifficulty = `hard`;
      }

      let configgedInitialQuizSummary = {
        numberOfQuestions: storedQuestions.length,
        score: 0,
        categories: tempCategoriesHold,
        difficulty: clarifiedDifficulty,
      };
      console.log(configgedInitialQuizSummary);

      setCurrentQuestion(0);
      setQuiz(storedQuestions);
      setQuizSummary(configgedInitialQuizSummary);
    };
    retrieveQuizData();
    console.log({ storedQuestions });
  }, [quizzesTaken]);

  // Handle neccary updates following quiz data retrieval
  React.useEffect(() => {
    if (quiz) {
      if (quizPage === `quizzing`) {
        let tempQuizQuestionViewHold = (
          <>
            <View style={styles.quizQuestionTitleView}>
              <Text style={styles.quizQuestionTitleText}>
                {quiz[currentQuestion].question}
              </Text>
            </View>
            <View style={styles.quizAnswersView}>
              {quiz[currentQuestion].answers.map((answer, index) => {
                return (
                  <View key={`${index}`} style={styles.quizAnswerContainer}>
                    <Text style={styles.quizAnswerText}>{answer}</Text>
                    <input
                      className={styles.quizAnswerInput}
                      type={`checkbox`}
                      checked={index === answerHold ? true : false}
                      name={`answerInput`}
                      onChange={(event) => {
                        console.log({ event: event.currentTarget.checked });
                        let isChecked = event.currentTarget.checked;
                        if (isChecked) {
                          console.log(`setting temp answer`);
                          console.log(index);
                          setAnswerHold(() => {
                            return index;
                          });
                        } else if (index === answerHold) {
                          setAnswerHold(() => {
                            return -1;
                          });
                        }
                      }}
                    />
                  </View>
                );
              })}
            </View>
            {answerSubmitButtonView}
          </>
        );
        setQuizView(tempQuizQuestionViewHold);
      } else if (quizPage === "finished") {
        console.log({ quizSummary });
        let tempFinishedQuizViewHold = (
          <>
            <View style={styles.finishedQuizSummaryView}>
              <View style={styles.quizSummaryHeader}>
                <Text style={styles.quizSummaryDifficultyText}>
                  {`Difficulty: ${quizSummary.difficulty}`}
                </Text>
                <Text style={styles.quizSummaryNumOfQuestionsText}>
                  {`Questions answered: ${quizSummary.numberOfQuestions}`}
                </Text>
              </View>
              <View style={styles.quizSummaryScoreView}>
                <Text
                  style={styles.quizSummaryScore}
                >{`${quizSummary.score}%`}</Text>
              </View>
              <View style={styles.quizSummaryCategoriesView}>
                <Text
                  style={[
                    styles.quizSummaryCategoryText,
                    { width: "100%", textAlign: "center" },
                  ]}
                >
                  {`CATEGORIES INCLUDED:`}
                </Text>
                {quizSummary.categories.map((category, index) => {
                  return (
                    <Text
                      key={`${category}:${index}`}
                      style={styles.quizSummaryCategoryText}
                    >
                      {category}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={styles.newQuizButtonView}>
              <button
                className={styles.newQuizButton}
                onClick={() => {
                  setQuiz(undefined);
                  setQuizScore(0);
                  setCurrentQuestion(0);
                  setQuizzesTaken(() => {
                    return quizzesTaken + 1;
                  });
                  setQuizPage(`quizzing`);
                }}
              >{`NEW QUIZ`}</button>
            </View>
          </>
        );
        setQuizView(tempFinishedQuizViewHold);
      } else if (quizPage === `wisdom`) {
        let tempWisdomViewHold = (
          <>
            <View style={styles.wisdomView}>
              <Text style={styles.wisdomQuoteText}>{wisdomData.quote}</Text>
              <Text style={styles.wisdomAuthorText}>{wisdomData.author}</Text>
            </View>
            <View style={styles.returnToQuizButtonView}>
              <button
                className={styles.returnToQuizButton}
                onClick={() => {
                  setQuizPage(`quizzing`);
                }}
              >{`TRY QUIZ`}</button>
            </View>
          </>
        );
        setQuizView(tempWisdomViewHold);
      }
    }
  }, [
    quiz,
    wisdomData,
    currentQuestion,
    answerSubmitButtonView,
    quizPage,
    styles,
  ]);

  // Handle submit button data refresh
  React.useEffect(() => {
    console.log({ answerHold });
    console.log(`Refreshing answer submit button`);
    setAnswerSubmitButtonView(
      <View style={styles.quizAnswerSubmitButtonView}>
        <button
          className={styles.quizAnswerSubmitButton}
          onClick={(event) => {
            console.log({ answerHold });
            if (answerHold !== -1) {
              let holdingAnswer = answerHold;
              console.log(`answer selected`);
              if (quiz) {
                if (answerHold === quiz[currentQuestion].correctAnswer) {
                  setQuizScore(() => {
                    return quizScore + 1;
                  });
                }
                setAnswerHold(() => {
                  return -1;
                });

                if (currentQuestion < quiz.length - 1) {
                  if (currentQuestion === 0) {
                    if (holdingAnswer === quiz[currentQuestion].correctAnswer) {
                      setCurrentQuestion(() => {
                        return currentQuestion + 1;
                      });
                    } else {
                      setNeedWisdom(true);
                      setQuizPage(`wisdom`);
                    }
                  } else {
                    setCurrentQuestion(() => {
                      return currentQuestion + 1;
                    });
                  }
                } else {
                  console.log(`finished quiz`);
                  let configgedScore = Math.round(
                    (quizScore / quiz.length) * 100
                  );
                  console.log({
                    configgedScore,
                    quizScore,
                    quizLength: quiz.length,
                  });
                  setQuizSummary({ ...quizSummary, score: configgedScore });
                  setQuizPage(`finished`);
                }
              }
            }
          }}
        >
          {quiz && currentQuestion === quiz.length - 1
            ? `FINISH`
            : `SUBMIT ANSWER`}
        </button>
      </View>
    );
  }, [quiz, answerHold, styles]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainHeaderTitle: styles2.mainHeaderTitle,
          quizQuestionTitleText: styles2.quizQuestionTitleText,
          quizAnswersView: styles2.quizAnswersView,
          quizAnswerText: styles2.quizAnswerText,
          quizAnswerSubmitButtonView: styles2.quizAnswerSubmitButtonView,
          quizAnswerSubmitButton: `quizAnswerSubmitButton`,
          quizSummaryHeader: styles2.quizSummaryHeader,
          quizSummaryDifficultyText: styles2.quizSummaryDifficultyText,
          quizSummaryNumOfQuestionsText: styles2.quizSummaryNumOfQuestionsText,
          quizSummaryScore: styles2.quizSummaryScore,
          quizSummaryCategoriesView: styles2.quizSummaryCategoriesView,
          quizSummaryCategoryText: styles2.quizSummaryCategoryText,
          newQuizButton: `newQuizButton`,
          wisdomView: styles2.wisdomView,
          wisdomQuoteText: styles2.wisdomQuoteText,
          wisdomAuthorText: styles2.wisdomAuthorText,
          returnToQuizButton: `returnToQuizButton`,
          genericText: styles2.genericText,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainHeaderTitle: styles2.mainHeaderTitlev2,
          quizQuestionTitleText: styles2.quizQuestionTitleTextv2,
          quizAnswersView: styles2.quizAnswersViewv2,
          quizAnswerText: styles2.quizAnswerTextv2,
          quizAnswerSubmitButtonView: styles2.quizAnswerSubmitButtonViewv2,
          quizAnswerSubmitButton: `quizAnswerSubmitButtonv2`,
          quizSummaryHeader: styles2.quizSummaryHeaderv2,
          quizSummaryDifficultyText: styles2.quizSummaryDifficultyTextv2,
          quizSummaryNumOfQuestionsText:
            styles2.quizSummaryNumOfQuestionsTextv2,
          quizSummaryScore: styles2.quizSummaryScorev2,
          quizSummaryCategoriesView: styles2.quizSummaryCategoriesViewv2,
          quizSummaryCategoryText: styles2.quizSummaryCategoryTextv2,
          newQuizButton: `newQuizButtonv2`,
          wisdomView: styles2.wisdomViewv2,
          wisdomQuoteText: styles2.wisdomQuoteTextv2,
          wisdomAuthorText: styles2.wisdomAuthorTextv2,
          returnToQuizButton: `returnToQuizButtonv2`,
          genericText: styles2.genericTextv2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          kindOfStyle === `colorful`
            ? "https://i.pinimg.com/originals/5c/5f/0f/5c5f0fecc214f310b1b4e0a83ebd3d2a.jpg"
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4c+fOfwAIwAOUHj6BoQAAAABJRU5ErkJggg==",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
        <div className={styles.headerBar}>
          <div
            className={styles.backToIndexPageButton}
            onClick={() => {
              window.location.href = `${localUrl}`;
            }}
          >{`Back To Index Page`}</div>
          <div
            ref={switchStylesButtonRef}
            className={styles.switchStylesButton}
            onClick={(event) => {
              const innerHtml = event.currentTarget.innerHTML;
              if (innerHtml === `Switch To Plain View`) {
                setKindOfStyle(() => {
                  return `plain`;
                });
              } else if (innerHtml === `Switch To Colorful View`) {
                setKindOfStyle(() => {
                  return `colorful`;
                });
              }
            }}
          >{`Switch To Plain View`}</div>
        </div>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderTitleView}>
            <Text style={styles.mainHeaderTitle}>{`{-:|BRAIN JERKER|:-}`}</Text>
          </View>
        </View>
        <View style={styles.quizQuestionView}>{quizView}</View>
      </View>
    </ImageBackground>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
  mainHeader: {
    position: "relative",
    top: "0%",
    flexDirection: "row",
    width: "100%",
    height: "7%",
  },
  mainHeaderTitleView: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  mainHeaderTitle: {
    color: "rgba(0, 15, 85, 1)",
    textAlign: "center",
    textShadowColor: "rgba(128, 0, 0, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  mainHeaderTitlev2: {
    color: "black",
    textAlign: "center",
    textShadowColor: "silver",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  quizQuestionView: { width: "100%", height: "90%" },
  quizQuestionTitleView: {
    width: "100%",
    height: "15%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 15, 85, 0.5)",
    overflow: "scroll",
  },
  quizQuestionTitleText: {
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "5px",
    color: "rgba(231, 201, 169, 1)",
    textShadowColor: "rgba(0, 15, 85, 1)",
    textShadowRadius: 5,
    fontFamily: "monospace",
    fontSize: 25,
    fontWeight: "700",
  },
  quizQuestionTitleTextv2: {
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "5px",
    color: "black",
    textShadowColor: "silver",
    textShadowRadius: 5,
    fontFamily: "monospace",
    fontSize: 25,
    fontWeight: "700",
  },
  quizAnswersView: {
    width: "100%",
    height: "75%",
    borderTopColor: "cyan",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderBottomColor: "cyan",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    backgroundColor: "rgba(231, 201, 169, 0.75)",
    justifyContent: "space-evenly",
    alignItems: "center",
    overflowX: "scroll,",
  },
  quizAnswersViewv2: {
    width: "100%",
    height: "75%",
    borderTopColor: "black",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    backgroundColor: "gainsboro",
    justifyContent: "space-evenly",
    alignItems: "center",
    overflowX: "scroll,",
  },
  quizAnswerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  quizAnswerText: {
    paddingBottom: "5px",
    color: "rgba(0, 15, 85, 1)",
    textShadowColor: "rgba(231, 201, 169, 1)",
    textShadowRadius: 5,
    fontFamily: "monospace",
    fontSize: 25,
    fontWeight: "700",
  },
  quizAnswerTextv2: {
    paddingBottom: "5px",
    color: "black",
    textShadowColor: "silver",
    textShadowRadius: 5,
    fontFamily: "monospace",
    fontSize: 25,
    fontWeight: "700",
  },
  quizAnswerSubmitButtonView: {
    width: "100%",
    height: "10%",
    borderTopColor: "cyan",
    borderTopWidth: 1,
    borderTopStyle: "solid",
  },
  quizAnswerSubmitButtonViewv2: {
    width: "100%",
    height: "10%",
    borderTopColor: "black",
    borderTopWidth: 1,
    borderTopStyle: "solid",
  },
  finishedQuizSummaryView: { width: "100%", height: "90%" },
  quizSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "5%",
    paddingLeft: "2%",
    paddingRight: "2%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderTopColor: "cyan",
    borderTopWidth: 1,
    borderTopStyle: "solid",
  },
  quizSummaryHeaderv2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "5%",
    paddingLeft: "2%",
    paddingRight: "2%",
    backgroundColor: "gainsboro",
    borderTopColor: "black",
    borderTopWidth: 1,
    borderTopStyle: "solid",
  },
  quizSummaryDifficultyText: {
    color: "rgba(112, 128, 144, 1)",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Consolas",
  },
  quizSummaryDifficultyTextv2: {
    color: "black",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Consolas",
  },
  quizSummaryNumOfQuestionsText: {
    color: "rgba(112, 128, 144, 1)",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Consolas",
  },
  quizSummaryNumOfQuestionsTextv2: {
    color: "black",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Consolas",
  },
  quizSummaryScoreView: {
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  quizSummaryScore: {
    color: "rgba(0, 255, 255, 1)",
    textShadowColor: "rgba(0, 15, 85, 1)",
    textShadowRadius: 3,
    fontSize: 100,
    fontWeight: "800",
    fontFamily: "Consolas",
  },
  quizSummaryScorev2: {
    color: "black",
    textShadowColor: "silver",
    textShadowRadius: 3,
    fontSize: 100,
    fontWeight: "800",
    fontFamily: "Consolas",
  },
  quizSummaryCategoriesView: {
    paddingLeft: "2%",
    paddingRight: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderBottomColor: "cyan",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    width: "100%",
    height: "20%",
    overflow: "scroll",
  },
  quizSummaryCategoriesViewv2: {
    paddingLeft: "2%",
    paddingRight: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    backgroundColor: "gainsboro",
    width: "100%",
    height: "20%",
    overflow: "scroll",
  },
  quizSummaryCategoryText: {
    marginTop: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    color: "rgba(112, 128, 144, 1)",
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "Consolas",
  },
  quizSummaryCategoryTextv2: {
    marginTop: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    color: "black",
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "Consolas",
  },
  newQuizButtonView: {
    position: "relative",
    bottom: "0px",
    width: "100%",
    height: "10%",
  },
  wisdomView: {
    width: "100%",
    height: "90%",
    paddingLeft: "10px",
    paddingRight: "10px",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(220, 220, 220, 0.5)",
  },
  wisdomViewv2: {
    width: "100%",
    height: "90%",
    paddingLeft: "10px",
    paddingRight: "10px",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "gainsboro",
  },
  wisdomQuoteText: {
    color: "rgba(47, 79, 79, 1)",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 2,
    fontFamily: "monospace",
    fontSize: 35,
    fontWeight: "700",
    lineHeight: 45,
    letterSpacing: 5,
  },
  wisdomQuoteTextv2: {
    color: "black",
    textShadowColor: "silver",
    textShadowRadius: 2,
    fontFamily: "monospace",
    fontSize: 35,
    fontWeight: "700",
    lineHeight: 45,
    letterSpacing: 5,
  },
  wisdomAuthorText: {
    color: "blue",
    fontFamily: "monospace",
    fontSize: 25,
    fontWeight: "600",
  },
  wisdomAuthorTextv2: {
    color: "black",
    fontFamily: "monospace",
    fontSize: 25,
    fontWeight: "600",
  },
  returnToQuizButtonView: {
    width: "100%",
    height: "10%",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
  genericTextv2: {
    color: "black",
    textAlign: "center",
  },
});

export default MobileRandomQuiz;
