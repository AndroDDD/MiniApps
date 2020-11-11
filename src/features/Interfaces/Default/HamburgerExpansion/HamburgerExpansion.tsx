import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { gsap } from "gsap";

import $ from "jquery";

import "./HamburgerExpansionStyles.scss";

const HamburgerExpansion: React.FC = () => {
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
    mainDisplaySupportClass: `mainHEDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    hamburgerExpansionDisplay: `hamburgerExpansionDisplay`,
    hamburgerIngredientsDisplay: `hamburgerIngredientsDisplay`,
    hamburgerIngredientsListDisplay: `hamburgerIngredientsListDisplay`,
    hamburgerButtonDisplay: `hamburgerButtonDisplay`,
    hamburgerButtonIcon: `hamburgerButtonIcon`,
  });

  // Declare variable tracking if ingredients display is open
  const [
    isIngredientsDisplayOpen,
    setIsIngredientsDisplayOpen,
  ] = React.useState(() => {
    return false;
  });

  // Declare gsap ref
  let gsapRef = React.useRef<any>();

  // Declare refs for manipulation
  let hamburgerIngredientsDisplayRef = React.useRef<any>();
  let hamburgerButtonDisplayRef = React.useRef<any>();

  // Handle opening and closing of ingredients display
  React.useEffect(() => {
    if (isIngredientsDisplayOpen) {
      gsapRef.current = gsap
        .timeline()
        .to(hamburgerIngredientsDisplayRef.current, {
          width: "90%",
          duration: 2,
        })
        .to(hamburgerButtonDisplayRef.current, {
          width: "10%",
          duration: 2,
          delay: -2,
        });
    } else {
      gsapRef.current = gsap
        .timeline()
        .to(hamburgerIngredientsDisplayRef.current, {
          width: "0%",
          duration: 2,
        })
        .to(hamburgerButtonDisplayRef.current, {
          width: "100%",
          duration: 2,
          delay: -2,
        });
    }
  }, [isIngredientsDisplayOpen]);

  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div className={styles.hamburgerExpansionDisplay}>
          <div
            ref={hamburgerIngredientsDisplayRef}
            className={styles.hamburgerIngredientsDisplay}
          >
            <ul className={styles.hamburgerIngredientsListDisplay}>
              <li>{`Top Buttery Toasted Bun`}</li>
              <li>{`Crispy Fresh Lettuce`}</li>
              <li>{`Crispy Sliced Pickles`}</li>
              <li>{`Golden Fried Onions`}</li>
              <li>{`Thinly Sliced Tomatoes`}</li>
              <li>{`100% Angus Beef`}</li>
              <li>{`Dijon Mustard`}</li>
              <li>{`Bottom Buttery Toasted Bun`}</li>
            </ul>
          </div>
          <div
            ref={hamburgerButtonDisplayRef}
            className={styles.hamburgerButtonDisplay}
            onClick={() => {
              if (isIngredientsDisplayOpen) {
                setIsIngredientsDisplayOpen(() => {
                  return false;
                });
              } else {
                setIsIngredientsDisplayOpen(() => {
                  return true;
                });
              }
            }}
          >
            <img
              src={"https://img.icons8.com/ios-glyphs/2x/hamburger.png"}
              alt={"Hamburger Icon"}
              width={"95%"}
              height={"auto"}
              className={styles.hamburgerButtonIcon}
            />
          </div>
        </div>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default HamburgerExpansion;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
