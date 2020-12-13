import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TweenMax, Power3 } from "gsap";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./MobileIndexPageStyles.scss";

const MobileIndexPage: React.FC = () => {
  // Handle screen size detection and changes
  // Declare variable tracking screen height
  const [screenHeight, setScreenHeight] = React.useState(() => {
    return Dimensions.get("window").height;
  });
  // Declare variable tracking screen width
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  // Handle screen size change
  $(window).on("resize", () => {
    setScreenHeight(() => {
      return Dimensions.get("window").height;
    });
    setScreenWidth(() => {
      return window.innerWidth;
    });
  });

  React.useEffect(() => {
    setStyles(() => {
      let updatedSizes = {
        ...styles,
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
    backgroundImage: { width: "100%", height: screenHeight },
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupport: `mainDisplaySupport`,
    mainHeader: styles2.mainHeader,
    mainHeaderTitleView: styles2.mainHeaderTitleView,
    mainHeaderTitle: styles2.mainHeaderTitle,
    switchKindOfStyleButton: `switchKindOfStyleButton`,
    indexDisplay: styles2.indexDisplay,
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
    darkModeTogglerButton: `darkModeTogglerButtonv2`,
    hamburgerExpansionButton: `hamburgerExpansionButton`,
    magnifyButton: `magnifyButton`,
    popupButton: `popupButtonv2`,
    rainingHeartsButton: `rainingHeartsButton`,
    soundBoardButton: `soundBoardButton`,
    toastNotificationButton: `toastNotificationButtonv2`,
    basicButtonStyle: {},
    genericText: styles2.genericText,
  });

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for main display
  const mainDisplayRef = React.useRef(null);

  // Declare refs for buttons
  let artPageButtonRef = React.useRef<HTMLButtonElement>(null);
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

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      setStyles((styles) => {
        return {
          ...styles,
          basicButtonStyle: {},
        };
      });
    } else if (kindOfStyle === `plain`) {
      setStyles((styles) => {
        return {
          ...styles,
          basicButtonStyle: {
            color: "gainsboro",
            background: "black",
            border: "1px solid silver",
          },
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
            ? "https://th.bing.com/th/id/OIP.gzdKJMIRYYKJeQWClV9OcgHaNK?pid=Api&rs=1"
            : "https://th.bing.com/th/id/OIP.vL-1Tn1mERcG-lUMK5iOoQHaEo?pid=Api&rs=1",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, { width: "100%", height: "100%" }]}>
        <div ref={mainDisplayRef} className={styles.mainDisplaySupport}>
          <View style={styles.mainHeader}>
            <View style={styles.mainHeaderTitleView}>
              <Text style={styles.mainHeaderTitle}>{`MINI APPS INDEX`}</Text>
              <div
                className={styles.switchKindOfStyleButton}
                onClick={(event) => {
                  const innerHtml = event.currentTarget.innerHTML;
                  if (
                    styles[`switchKindOfStyleButton`] ===
                    `switchKindOfStyleButton`
                  ) {
                    setKindOfStyle(() => {
                      return `plain`;
                    });
                    setStyles((prevStyles) => {
                      return {
                        ...prevStyles,
                        switchKindOfStyleButton: `switchKindOfStyleButtonv2`,
                      };
                    });
                  } else if (
                    styles[`switchKindOfStyleButton`] ===
                    `switchKindOfStyleButtonv2`
                  ) {
                    setKindOfStyle(() => {
                      return `colorful`;
                    });
                    setStyles((prevStyles) => {
                      return {
                        ...prevStyles,
                        switchKindOfStyleButton: `switchKindOfStyleButton`,
                      };
                    });
                  }
                }}
              ></div>
            </View>
          </View>
          <View style={styles.indexDisplay}>
            <button
              ref={artPageButtonRef}
              className={styles.artPageButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}art-board/`, "_self");
              }}
            >
              {"ART BOARD"}
            </button>
            <button
              ref={cookbookButtonRef}
              className={styles.cookbookButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}cookbook/`, "_self");
              }}
            >
              {"COOKBOOK"}
            </button>
            <button
              ref={countdownTimerButtonRef}
              className={styles.countdownTimerButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}countdown-timer/`, "_self");
              }}
            >
              {"COUNTDOWN TIMER"}
            </button>
            <button
              ref={githubProfilesButtonRef}
              className={styles.githubProfilesButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}github-profiles/`, "_self");
              }}
            >
              {"GITHUB PROFILES"}
            </button>
            <button
              ref={moviesLibraryButtonRef}
              className={styles.moviesLibraryButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}movies-library/`, "_self");
              }}
            >
              {"MOVIES LIBRARY"}
            </button>
            <button
              ref={notepadButtonRef}
              className={styles.notepadButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}notepad/`, "_self");
              }}
            >
              {"NOTEPAD"}
            </button>
            <button
              ref={passwordGeneratorButtonRef}
              className={styles.passwordGeneratorButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}password-generator/`, "_self");
              }}
            >
              {"PASSWORD GENERATOR"}
            </button>
            <button
              ref={randomQuizButtonRef}
              className={styles.randomQuizButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}random-quiz/`, "_self");
              }}
            >
              {"RANDOM QUIZ"}
            </button>
            <button
              ref={todoListButtonRef}
              className={styles.todoListButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}todo-list/`, "_self");
              }}
            >
              {"TODO LIST"}
            </button>
            <button
              ref={weatherDetectorButtonRef}
              className={styles.weatherDetectorButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}weather-detector/`, "_self");
              }}
            >
              {"WEATHER DETECTOR"}
            </button>
            <button
              ref={autoTextWriterButtonRef}
              className={styles.autoTextWriterButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}auto-text-writer/`, "_self");
              }}
            >
              {"AUTO TEXT WRITER"}
            </button>
            <button
              ref={backgroundChangerButtonRef}
              className={styles.backgroundChangerButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}background-changer/`, "_self");
              }}
            >
              {"BACKGROUND CHANGER"}
            </button>
            <button
              ref={carouselButtonRef}
              className={styles.carouselButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}carousel/`, "_self");
              }}
            >
              {"CAROUSEL"}
            </button>
            <button
              ref={darkModeTogglerButtonRef}
              className={styles.darkModeTogglerButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}dark-mode-toggler/`, "_self");
              }}
            >
              {"DARK MODE TOGGLER"}
            </button>
            <button
              ref={hamburgerExpansionButtonRef}
              className={styles.hamburgerExpansionButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}hamburger-expansion/`, "_self");
              }}
            >
              {"HAMBURGER EXPANSION"}
            </button>
            <button
              ref={magnifyButtonRef}
              className={styles.magnifyButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}magnify/`, "_self");
              }}
            >
              {"MAGNIFY"}
            </button>
            <button
              ref={popupButtonRef}
              className={styles.popupButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}popup/`, "_self");
              }}
            >
              {"POPUP"}
            </button>
            <button
              ref={rainingHeartsButtonRef}
              className={styles.rainingHeartsButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}raining-hearts/`, "_self");
              }}
            >
              {"RAINING HEARTS"}
            </button>
            <button
              ref={soundBoardButtonRef}
              className={styles.soundBoardButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}sound-board/`, "_self");
              }}
            >
              {"SOUND BOARD"}
            </button>
            <button
              ref={toastNotificationButtonRef}
              className={styles.toastNotificationButton}
              style={styles.basicButtonStyle}
              onClick={() => {
                window.open(`${localUrl}toast-notification/`, "_self");
              }}
            >
              {"TOAST NOTIFICATION"}
            </button>
          </View>
        </div>
      </View>
    </ImageBackground>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    overflow: "scroll",
  },
  mainHeader: {
    position: "relative",
    top: "0%",
    flexDirection: "row",
    width: "100%",
    height: "10%",
  },
  mainHeaderTitleView: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderBottomColor: "rgba(245, 245, 245, 0.5)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  mainHeaderTitle: {
    color: "rgba(245, 245, 245, 0.9)",
    textAlign: "center",
    textShadowColor: "rgba(0, 255, 255, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  indexDisplay: {
    width: "100%",
    height: "90%",
    overflowY: "scroll",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
});

export default MobileIndexPage;
