import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

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
    headerBar: `headerBarForBC`,
    backToIndexPageButton: `backToIndexPageButtonForBC`,
    switchStylesButton: `switchStylesButtonForBC`,
    backgroundChangerButton: `backgroundChangerButton`,
  });

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare refs for view manipulation
  let mainDisplaySupportRef = React.useRef<any>();

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
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
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainBCDisplaySupportClass`,
          backgroundChangerButton: `backgroundChangerButton`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      let topColor = Math.random() < 0.5 ? 0 : 255;
      let middleColor = Math.random() < 0.5 ? 0 : 255;
      let bottomColor = Math.random() < 0.5 ? 0 : 255;
      mainDisplaySupportRef.current.style.backgroundImage = `linear-gradient(to bottom right, rgba(${topColor}, ${topColor}, ${topColor}, 0.${Math.floor(
        Math.random() * 99
      )}), rgba(${middleColor}, ${middleColor}, ${middleColor}, 0.${Math.floor(
        Math.random() * 99
      )}),rgba(${bottomColor}, ${bottomColor}, ${bottomColor}, 0.${Math.floor(
        Math.random() * 99
      )}))`;
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainBCDisplaySupportClassv2`,
          backgroundChangerButton: `backgroundChangerButtonv3`,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle component return view
  return (
    <div
      ref={mainDisplaySupportRef}
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
        <div
          className={styles.backgroundChangerButton}
          onClick={() => {
            if (kindOfStyle === `colorful`) {
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
            } else if (kindOfStyle === `plain`) {
              let topColor = Math.random() < 0.5 ? 0 : 255;
              let middleColor = Math.random() < 0.5 ? 0 : 255;
              let bottomColor = Math.random() < 0.5 ? 0 : 255;
              mainDisplaySupportRef.current.style.backgroundImage = `linear-gradient(to bottom right, rgba(${topColor}, ${topColor}, ${topColor}, 0.${Math.floor(
                Math.random() * 99
              )}), rgba(${middleColor}, ${middleColor}, ${middleColor}, 0.${Math.floor(
                Math.random() * 99
              )}),rgba(${bottomColor}, ${bottomColor}, ${bottomColor}, 0.${Math.floor(
                Math.random() * 99
              )}))`;
            }
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
