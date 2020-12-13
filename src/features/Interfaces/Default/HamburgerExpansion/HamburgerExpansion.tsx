import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { gsap } from "gsap";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

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
    headerBar: `headerBarForHED`,
    backToIndexPageButton: `backToIndexPageButtonForHED`,
    switchStylesButton: `switchStylesButtonForHED`,
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

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

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

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainHEDisplaySupportClass`,
          hamburgerExpansionDisplay: `hamburgerExpansionDisplay`,
          hamburgerIngredientsDisplay: `hamburgerIngredientsDisplay`,
          hamburgerIngredientsListDisplay: `hamburgerIngredientsListDisplay`,
          hamburgerButtonDisplay: `hamburgerButtonDisplay`,
          hamburgerButtonIcon: `hamburgerButtonIcon`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainHEDisplaySupportClassv2`,
          hamburgerExpansionDisplay: `hamburgerExpansionDisplayv2`,
          hamburgerIngredientsDisplay: `hamburgerIngredientsDisplayv2`,
          hamburgerIngredientsListDisplay: `hamburgerIngredientsListDisplayv2`,
          hamburgerButtonDisplay: `hamburgerButtonDisplayv2`,
          hamburgerButtonIcon: `hamburgerButtonIconv2`,
        };
      });
    }
  }, [kindOfStyle]);

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
    justifyContent: "flex-start",
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
