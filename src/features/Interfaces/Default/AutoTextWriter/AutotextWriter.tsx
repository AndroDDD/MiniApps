import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

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
    genericText: styles2.genericText,
  });

  // Declare variable holding text to display
  const [textToDisplay, setTextToDisplay] = React.useState(
    `We will be quite fine... so I hope you trust me. Love you;-)`
  );
  const [textDisplayed, setTextDisplayed] = React.useState(``);
  const [currentTextStringIndex, setCurrentTextStringIndex] = React.useState(0);

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

  // Handle component return view
  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
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
