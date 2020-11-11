import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

const GenericPage: React.FC = () => {
  // Handle screen size detection and changes
  // Declare variable tracking screen height
  const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);
  // Declare variable tracking screen width
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  // Handle screen size change
  $(window).on("resize", () => {
    setScreenHeight(() => {
      return window.innerHeight;
    });
    setScreenWidth(() => {
      return window.innerWidth;
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
    mainHeader: styles2.mainHeader,
    mainHeaderTitleView: styles2.mainHeaderTitleView,
    mainHeaderTitle: styles2.mainHeaderTitle,
    backgroundImage: { width: "100%", height: screenHeight },
    genericText: styles2.genericText,
  });

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "https://th.bing.com/th/id/OIP.gzdKJMIRYYKJeQWClV9OcgHaNK?pid=Api&rs=1",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, { width: "100%", height: "100%" }]}>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderTitleView}>
            <Text style={styles.mainHeaderTitle}>{`GENERIC PAGE`}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    justifyContent: "flex-start",
    alignItems: "center",
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
  },
  mainHeaderTitle: {
    textAlign: "center",
    textShadowColor: "rgba(0, 255, 255, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
});

export default GenericPage;
