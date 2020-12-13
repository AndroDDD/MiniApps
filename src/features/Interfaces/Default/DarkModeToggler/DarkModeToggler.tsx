import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

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
    headerBar: `headerBarForDMT`,
    backToIndexPageButton: `backToIndexPageButtonForDMT`,
    switchStylesButton: `switchStylesButtonForDMT`,
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

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare refs for data extraction and view manipulation
  let mainDisplaySupportRef = React.useRef<any>();
  let toggleButtonRef = React.useRef<any>();

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle toggle button text manipulation on toggle mode change
  React.useEffect(() => {
    if (toggleMode === `sun`) {
      if (kindOfStyle === `colorful`) {
        mainDisplaySupportRef.current.style.backgroundImage = `url("https://wallpapercave.com/wp/wp2268970.jpg")`;
        toggleButtonRef.current.style.color = `cyan`;
        setToggleButtonText(() => {
          return `SWITCH TO MOON MODE`;
        });
      } else if (kindOfStyle === `plain`) {
        mainDisplaySupportRef.current.style.backgroundImage = `url("https://th.bing.com/th/id/OIP.EnDdZz9Zsezly-PgglD9TgHaJf?pid=Api&rs=1")`;
        toggleButtonRef.current.style.color = `silver`;
        setToggleButtonText(() => {
          return `SWITCH TO DARK MODE`;
        });
      }
    } else if (toggleMode === `moon`) {
      if (kindOfStyle === `colorful`) {
        toggleButtonRef.current.style.color = `orangered`;
        mainDisplaySupportRef.current.style.backgroundImage = `url("https://wallpapercave.com/wp/qSKZhow.jpg")`;
        setToggleButtonText(() => {
          return `SWITCH TO SUN MODE`;
        });
      } else if (kindOfStyle === `plain`) {
        toggleButtonRef.current.style.color = `floralwhite`;
        mainDisplaySupportRef.current.style.backgroundImage = `url("https://comicartcommunity.com/gallery/data/media/230/Dark-Knight-Cover-10-final_small_final_inks.jpg")`;
        setToggleButtonText(() => {
          return `SWITCH TO LIGHT MODE`;
        });
      }
    } else {
      toggleButtonRef.current.style.color = `slategrey`;
      setToggleButtonText(() => {
        return `|:ERROR:|`;
      });
    }
  }, [toggleMode]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
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
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainDMTDisplaySupportClass`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      if (toggleMode === `sun`) {
        mainDisplaySupportRef.current.style.backgroundImage = `url("https://th.bing.com/th/id/OIP.EnDdZz9Zsezly-PgglD9TgHaJf?pid=Api&rs=1")`;
        toggleButtonRef.current.style.color = `silver`;
        setToggleButtonText(() => {
          return `SWITCH TO DARK MODE`;
        });
      } else if (toggleMode === `moon`) {
        toggleButtonRef.current.style.color = `floralwhite`;
        mainDisplaySupportRef.current.style.backgroundImage = `url("https://comicartcommunity.com/gallery/data/media/230/Dark-Knight-Cover-10-final_small_final_inks.jpg")`;
        setToggleButtonText(() => {
          return `SWITCH TO LIGHT MODE`;
        });
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainDMTDisplaySupportClassv2`,
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
