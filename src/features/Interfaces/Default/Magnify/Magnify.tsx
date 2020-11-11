import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import "./MagnifyStyles.scss";

const Magnify: React.FC = () => {
  // Handle screen size detection and changes
  const [screenHeight, setScreenHeight] = React.useState(() => {
    let fetchedScreenHeight = Dimensions.get("window").height;
    return fetchedScreenHeight;
  });
  const [screenWidth, setScreenWidth] = React.useState(() => {
    let fetchedScreenWidth = Dimensions.get("window").width;
    return fetchedScreenWidth;
  });
  $(window).on("resize", () => {
    setScreenHeight(() => {
      let fetchedScreenHeight = Dimensions.get("window").height;
      return fetchedScreenHeight;
    });
    setScreenWidth(() => {
      let fetchedScreenWidth = Dimensions.get("window").height;
      return fetchedScreenWidth;
    });
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

    let timestamp = new Date().getTime();
    let queryString = "?t=" + timestamp;
    imageToMagnifyRef.current.src =
      "https://img1.etsystatic.com/018/3/5646254/il_fullxfull.490619731_qzzl.jpg" +
      queryString;
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `mainMagnifyDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    magnifyDisplay: `magnifyDisplay`,
    imageToMagnify: `imageToMagnify`,
  });

  // Declare refs for data extraction and view manipulation
  let magnifyDisplayRef = React.useRef<any>();
  let imageToMagnifyRef = React.useRef<any>();

  // Handle component return view
  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div
          ref={magnifyDisplayRef}
          className={styles.magnifyDisplay}
          onMouseMove={(e) => {
            const x = e.clientX - e.currentTarget.offsetLeft;
            const y = e.clientY - e.currentTarget.offsetTop;

            console.log(x, y);

            console.log({
              imageTransformOriginp1:
                imageToMagnifyRef.current.style.transformOrigin,
            });
            imageToMagnifyRef.current.style.transformOrigin = `${x}px ${y}px`;
            imageToMagnifyRef.current.style.transform = "scale(4)";
            console.log({
              imageTransformOriginp2:
                imageToMagnifyRef.current.style.transformOrigin,
              imageScale: imageToMagnifyRef.current.style.transform,
            });
          }}
          onMouseLeave={() => {
            imageToMagnifyRef.current.style.transformOrigin = "center center";
            imageToMagnifyRef.current.style.transform = "scale(1)";
          }}
          onTouchMove={(e) => {
            const x = e.changedTouches[0].clientX - e.currentTarget.offsetLeft;
            const y = e.changedTouches[0].clientY - e.currentTarget.offsetTop;

            console.log(x, y);

            console.log({
              imageTransformOriginp1:
                imageToMagnifyRef.current.style.transformOrigin,
            });
            imageToMagnifyRef.current.style.transformOrigin = `${x}px ${y}px`;
            imageToMagnifyRef.current.style.transform = "scale(4)";
            console.log({
              imageTransformOriginp2:
                imageToMagnifyRef.current.style.transformOrigin,
              imageScale: imageToMagnifyRef.current.style.transform,
            });
          }}
          onTouchEnd={() => {
            imageToMagnifyRef.current.style.transformOrigin = "center center";
            imageToMagnifyRef.current.style.transform = "scale(1)";
          }}
        >
          <img
            ref={imageToMagnifyRef}
            src={
              "https://img1.etsystatic.com/018/3/5646254/il_fullxfull.490619731_qzzl.jpg"
            }
            alt={`Jeweled Christmas Socks`}
            className={styles.imageToMagnify}
          />
        </div>
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

export default Magnify;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
