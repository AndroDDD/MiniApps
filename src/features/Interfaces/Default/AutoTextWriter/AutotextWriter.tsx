import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./AutoTextWriterStyles.scss";

const AutoTextWriter: React.FC = () => {
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

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `mainATWDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForATW`,
    backToIndexPageButton: `backToIndexPageButtonForATW`,
    switchStylesButton: `switchStylesButtonForATW`,
    genericText: styles2.genericText,
  });

  // Declare variable holding text to display
  const [textToDisplay, setTextToDisplay] = React.useState(
    `We will be quite fine... so I hope you trust me. Love you;-)`
  );
  const [textDisplayed, setTextDisplayed] = React.useState(``);
  const [currentTextStringIndex, setCurrentTextStringIndex] = React.useState(0);

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle updating of text
  React.useEffect(() => {
    let updatedText = textToDisplay.slice(0, currentTextStringIndex + 1);
    setTextDisplayed(() => {
      return updatedText;
    });
    console.log({ updatedText });
    setTimeout(() => {
      setCurrentTextStringIndex((index) => {
        if (index >= textToDisplay.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      });
    }, 500);
  }, [currentTextStringIndex]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainATWDisplaySupportClass`,
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
          mainDisplaySupportClass: `mainATWDisplaySupportClassv2`,
          genericText: styles2.genericTextv2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle component return view
  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
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
        <Text style={styles.genericText}>{textDisplayed}</Text>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  genericText: {
    paddingLeft: "10px",
    paddingRight: "10px",
    borderColor: "rgba(112, 128, 144, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "rgba(231, 201, 169, 1)",
    textAlign: "center",
    textShadowColor: "rgba(0, 255, 255, 0.9)",
    textShadowRadius: 5,
    fontFamily: "cursive",
    fontSize: 40,
    fontWeight: "700",
  },
  genericTextv2: {
    paddingLeft: "10px",
    paddingRight: "10px",
    borderColor: "gainsboro",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "black",
    color: "gainsboro",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 0.9)",
    textShadowRadius: 5,
    fontFamily: "monospace",
    fontSize: 40,
    fontWeight: "700",
  },
});

export default AutoTextWriter;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
