import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import "./DarkModeTogglerStyles.scss";

const DarkModeToggler: React.FC = () => {
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
    mainDisplaySupportClass: `mainDMTDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    textArea: `textArea`,
    toggleButton: `toggleButton`,
  });

  // Declare variable tracking toggle start
  const [toggleMode, setToggleMode] = React.useState(() => {
    return `sun`;
  });

  // Declare variable holding toggle button text
  const [toggleButtonText, setToggleButtonText] = React.useState(() => {
    return `SWITCH TO MOON MODE`;
  });

  // Declare refs for data extraction and view manipulation
  let mainDisplaySupportRef = React.useRef<any>();
  let toggleButtonRef = React.useRef<any>();

  // Handle toggle button text manipulation on toggle mode change
  React.useEffect(() => {
    if (toggleMode === `sun`) {
      mainDisplaySupportRef.current.style.backgroundImage = `url("https://wallpapercave.com/wp/wp2268970.jpg")`;
      toggleButtonRef.current.style.color = `cyan`;
      setToggleButtonText(() => {
        return `SWITCH TO MOON MODE`;
      });
    } else if (toggleMode === `moon`) {
      toggleButtonRef.current.style.color = `orangered`;
      mainDisplaySupportRef.current.style.backgroundImage = `url("https://wallpapercave.com/wp/qSKZhow.jpg")`;
      setToggleButtonText(() => {
        return `SWITCH TO SUN MODE`;
      });
    } else {
      toggleButtonRef.current.style.color = `slategrey`;
      setToggleButtonText(() => {
        return `|:ERROR:|`;
      });
    }
  }, [toggleMode]);

  // Handle component return view
  return (
    <div
      ref={mainDisplaySupportRef}
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div className={styles.textArea}></div>
        <div
          ref={toggleButtonRef}
          className={styles.toggleButton}
          onClick={() => {
            setToggleMode((mode) => {
              if (mode === `sun`) {
                return `moon`;
              } else if (mode === `moon`) {
                return `sun`;
              } else {
                return `error`;
              }
            });
          }}
        >
          {toggleButtonText}
        </div>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    justifyContent: "space-between",
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default DarkModeToggler;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
