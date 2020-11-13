import React, { useRef } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TweenMax, Power3 } from "gsap";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./IndexPageStyles.scss";

const IndexPage: React.FC = () => {
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
    mainDisplaySupportClass: `indexPageDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    indexDisplay: styles2.indexDisplay,
    indexDisplayTitleText: styles2.indexDisplayTitleText,
    artPageButton: `artPageButton`,
    cookbookButton: `cookbookButton`,
    countdownTimerButton: `countdownTimerButton`,
    githubProfilesButton: `githubProfilesButton`,
    moviesLibraryButton: `moviesLibraryButton`,
    notepadButton: `notepadButton`,
    passwordGeneratorButton: `passwordGeneratorButton`,
    randomQuizButton: `randomQuizButton`,
    todoListButton: `todoListButton`,
    weatherDetectorButton: `weatherDetectorButton`,
    autoTextWriterButton: `autoTextWriterButton`,
    backgroundChangerButton: `backgroundChangerButtonv2`,
    carouselButton: `carouselButton`,
    darkModeTogglerButton: `darkModeToggler`,
    hamburgerExpansionButton: `hamburgerExpansionButton`,
    magnifyButton: `magnifyButton`,
    popupButton: `popupButtonv2`,
    rainingHeartsButton: `rainingHeartsButton`,
    soundBoardButton: `soundBoardButton`,
    toastNotificationButton: `toastNotificationButton`,
  });

  // Declare ref for main display
  const mainDisplayRef = useRef(null);

  // Declare refs for buttons
  let artPageButtonRef = useRef<HTMLButtonElement>(null);
  let cookbookButtonRef = React.useRef(null);
  let countdownTimerButtonRef = React.useRef(null);
  let githubProfilesButtonRef = React.useRef(null);
  let moviesLibraryButtonRef = React.useRef(null);
  let notepadButtonRef = React.useRef(null);
  let passwordGeneratorButtonRef = React.useRef(null);
  let randomQuizButtonRef = React.useRef(null);
  let todoListButtonRef = React.useRef(null);
  let weatherDetectorButtonRef = React.useRef(null);

  let autoTextWriterButtonRef = React.useRef(null);
  let backgroundChangerButtonRef = React.useRef(null);
  let carouselButtonRef = React.useRef(null);
  let darkModeTogglerButtonRef = React.useRef(null);
  let hamburgerExpansionButtonRef = React.useRef(null);
  let magnifyButtonRef = React.useRef(null);
  let popupButtonRef = React.useRef(null);
  let rainingHeartsButtonRef = React.useRef(null);
  let soundBoardButtonRef = React.useRef(null);
  let toastNotificationButtonRef = React.useRef(null);

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

  // Handle gsap tween effects
  React.useEffect(() => {
    TweenMax.to(mainDisplayRef.current, 0, { css: { visibility: "visible" } });

    TweenMax.from(
      [
        artPageButtonRef.current,
        countdownTimerButtonRef.current,
        moviesLibraryButtonRef.current,
        passwordGeneratorButtonRef.current,
        todoListButtonRef.current,
        autoTextWriterButtonRef.current,
        carouselButtonRef.current,
        hamburgerExpansionButtonRef.current,
        popupButtonRef.current,
        soundBoardButtonRef.current,
      ],
      0.8,
      {
        stagger: 0.25,
        x: -1500,
        ease: Power3.easeOut,
      }
    );
    TweenMax.from(
      [
        cookbookButtonRef.current,
        githubProfilesButtonRef.current,
        notepadButtonRef.current,
        randomQuizButtonRef.current,
        weatherDetectorButtonRef.current,
        backgroundChangerButtonRef.current,
        darkModeTogglerButtonRef.current,
        magnifyButtonRef.current,
        rainingHeartsButtonRef.current,
        toastNotificationButtonRef.current,
      ],
      0.8,
      {
        stagger: 0.25,
        x: 1500,
        ease: Power3.easeOut,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div
      ref={mainDisplayRef}
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <View style={styles.indexDisplay}>
          <Text style={styles.indexDisplayTitleText}>{`MINI APPS INDEX`}</Text>
          <button
            ref={artPageButtonRef}
            className={styles.artPageButton}
            onClick={() => {
              window.open(`${localUrl}art-board/`, "_self");
            }}
          >
            {"ART BOARD"}
          </button>
          <button
            ref={cookbookButtonRef}
            className={styles.cookbookButton}
            onClick={() => {
              window.open(`${localUrl}cookbook/`, "_self");
            }}
          >
            {"COOKBOOK"}
          </button>
          <button
            ref={countdownTimerButtonRef}
            className={styles.countdownTimerButton}
            onClick={() => {
              window.open(`${localUrl}countdown-timer/`, "_self");
            }}
          >
            {"COUNTDOWN TIMER"}
          </button>
          <button
            ref={githubProfilesButtonRef}
            className={styles.githubProfilesButton}
            onClick={() => {
              window.open(`${localUrl}github-profiles/`, "_self");
            }}
          >
            {"GITHUB PROFILES"}
          </button>
          <button
            ref={moviesLibraryButtonRef}
            className={styles.moviesLibraryButton}
            onClick={() => {
              window.open(`${localUrl}movies-library/`, "_self");
            }}
          >
            {"MOVIES LIBRARY"}
          </button>
          <button
            ref={notepadButtonRef}
            className={styles.notepadButton}
            onClick={() => {
              window.open(`${localUrl}notepad/`, "_self");
            }}
          >
            {"NOTEPAD"}
          </button>
          <button
            ref={passwordGeneratorButtonRef}
            className={styles.passwordGeneratorButton}
            onClick={() => {
              window.open(`${localUrl}password-generator/`, "_self");
            }}
          >
            {"PASSWORD GENERATOR"}
          </button>
          <button
            ref={randomQuizButtonRef}
            className={styles.randomQuizButton}
            onClick={() => {
              window.open(`${localUrl}random-quiz/`, "_self");
            }}
          >
            {"RANDOM QUIZ"}
          </button>
          <button
            ref={todoListButtonRef}
            className={styles.todoListButton}
            onClick={() => {
              window.open(`${localUrl}todo-list/`, "_self");
            }}
          >
            {"TODO LIST"}
          </button>
          <button
            ref={weatherDetectorButtonRef}
            className={styles.weatherDetectorButton}
            onClick={() => {
              window.open(`${localUrl}weather-detector/`, "_self");
            }}
          >
            {"WEATHER DETECTOR"}
          </button>
          <button
            ref={autoTextWriterButtonRef}
            className={styles.autoTextWriterButton}
            onClick={() => {
              window.open(`${localUrl}auto-text-writer/`, "_self");
            }}
          >
            {"AUTO TEXT WRITER"}
          </button>
          <button
            ref={backgroundChangerButtonRef}
            className={styles.backgroundChangerButton}
            onClick={() => {
              window.open(`${localUrl}background-changer/`, "_self");
            }}
          >
            {"BACKGROUND CHANGER"}
          </button>
          <button
            ref={carouselButtonRef}
            className={styles.carouselButton}
            onClick={() => {
              window.open(`${localUrl}carousel/`, "_self");
            }}
          >
            {"CAROUSEL"}
          </button>
          <button
            ref={darkModeTogglerButtonRef}
            className={styles.darkModeTogglerButton}
            onClick={() => {
              window.open(`${localUrl}dark-mode-toggler/`, "_self");
            }}
          >
            {"DARK MODE TOGGLER"}
          </button>
          <button
            ref={hamburgerExpansionButtonRef}
            className={styles.hamburgerExpansionButton}
            onClick={() => {
              window.open(`${localUrl}hamburger-expansion/`, "_self");
            }}
          >
            {"HAMBURGER EXPANSION"}
          </button>
          <button
            ref={magnifyButtonRef}
            className={styles.magnifyButton}
            onClick={() => {
              window.open(`${localUrl}magnify/`, "_self");
            }}
          >
            {"MAGNIFY"}
          </button>
          <button
            ref={popupButtonRef}
            className={styles.popupButton}
            onClick={() => {
              window.open(`${localUrl}popup/`, "_self");
            }}
          >
            {"POPUP"}
          </button>
          <button
            ref={rainingHeartsButtonRef}
            className={styles.rainingHeartsButton}
            onClick={() => {
              window.open(`${localUrl}raining-hearts/`, "_self");
            }}
          >
            {"RAINING HEARTS"}
          </button>
          <button
            ref={soundBoardButtonRef}
            className={styles.soundBoardButton}
            onClick={() => {
              window.open(`${localUrl}sound-board/`, "_self");
            }}
          >
            {"SOUND BOARD"}
          </button>
          <button
            ref={toastNotificationButtonRef}
            className={styles.toastNotificationButton}
            onClick={() => {
              window.open(`${localUrl}toast-notification/`, "_self");
            }}
          >
            {"TOAST NOTIFICATION"}
          </button>
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    paddingTop: "25px",
    paddingBottom: "25px",
    margin: "auto",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  indexDisplay: {
    width: "500px",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "1px solid rgba(112, 128, 144, 1.0)",
    backgroundColor: "rgba(112, 128, 144, 0.5)",
  },
  indexDisplayTitleText: {
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "12px",
    backgroundColor: "rgba(66, 13, 9, 0.85)",
    color: "rgba(244, 255, 255, 0.55)",
    textAlign: "center",
    textShadowColor: "rgba(255, 165, 0, 0.95)",
    textShadowRadius: 10,
    fontFamily: "Marker felt, fantasy",
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: 8,
  },
});

export default IndexPage;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
