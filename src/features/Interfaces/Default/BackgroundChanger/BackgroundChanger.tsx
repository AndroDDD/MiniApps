import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import "./BackgroundChangerStyles.scss";

const BackgroundChanger: React.FC = () => {
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
    mainDisplaySupportClass: `mainBCDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    backgroundChangerButton: `backgroundChangerButton`,
  });

  // Declare refs for view manipulation
  let mainDisplaySupportRef = React.useRef<any>();

  // Handle component return view
  return (
    <div
      ref={mainDisplaySupportRef}
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div
          className={styles.backgroundChangerButton}
          onClick={() => {
            mainDisplaySupportRef.current.style.backgroundImage = `linear-gradient(to bottom right, rgb(${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}), rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}),rgb(${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}))`;
          }}
        >{`Change Background Color`}</div>
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
});

export default BackgroundChanger;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
