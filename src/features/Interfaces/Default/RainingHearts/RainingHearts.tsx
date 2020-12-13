import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./RainingHeartsStyles.scss";

const RainingHearts: React.FC = () => {
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
    mainDisplaySupportClass: `mainRHDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForRH`,
    backToIndexPageButton: `backToIndexPageButtonForRH`,
    switchStylesButton: `switchStylesButtonForRH`,
    heart: `heart`,
  });

  // Declare variable tracking heart falls iterations
  const [heartFallsIteration, setHeartFallsIteration] = React.useState(() => {
    return 0;
  });

  // Declare variable holding hearts displays array
  const [heartDisplays, setHeartsDisplays] = React.useState<Array<JSX.Element>>(
    () => {
      return [];
    }
  );

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare refs for data extraction and view manipulation
  let mainDisplayRef = React.useRef<any>();

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle heart falls
  React.useEffect(() => {
    let plainStyle = Math.random() < 0.5 ? 0 : 1;
    let skyHeart = (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="11.4000000pt"
        height="12.0000000pt"
        viewBox="0 0 114.000000 120.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,120.000000) scale(0.100000,-0.100000)"
          fill={`rgba(${
            kindOfStyle === `colorful`
              ? Math.floor(Math.random() * 255)
              : plainStyle
          }, ${
            kindOfStyle === `colorful`
              ? Math.floor(Math.random() * 255)
              : plainStyle
          }, ${
            kindOfStyle === `colorful`
              ? Math.floor(Math.random() * 255)
              : plainStyle
          }, ${Math.random() + 0.5})`}
          stroke="none"
        >
          <path
            d="M732 1160 c-66 -31 -159 -111 -193 -166 l-20 -33 -39 39 c-48 48
   -130 75 -196 65 -61 -9 -153 -73 -198 -138 -54 -78 -77 -161 -77 -277 0 -220
   77 -337 330 -504 69 -46 137 -95 150 -110 33 -35 47 -33 67 11 20 41 95 118
   263 273 141 129 211 213 260 312 92 181 71 383 -49 492 -56 50 -97 66 -172 66
   -49 0 -77 -7 -126 -30z m183 -81 c46 -41 61 -71 75 -150 21 -118 -26 -260
   -133 -400 -23 -31 -95 -114 -161 -185 -65 -71 -132 -150 -149 -175 l-31 -46
   -95 81 c-218 183 -287 282 -298 427 -14 199 80 369 205 369 69 0 112 -27 142
   -88 14 -28 30 -54 37 -56 7 -3 27 23 49 65 63 119 160 188 266 189 50 0 62 -4
   93 -31z"
          />
        </g>
      </svg>
    );
    let skyHeartDisplay = (
      <div
        key={`${Math.floor(Math.random() * 1000)}&${Math.random() * 100}`}
        className={styles.heart}
        style={{
          position: "absolute",
          top: "-10%",
          left: `${Math.floor(Math.random() * 100)}%`,
          animationDuration: `${Math.floor(Math.random() * 20 + 5)}s`,
        }}
      >
        {skyHeart}
      </div>
    );

    setHeartsDisplays((displays) => {
      let displaysHold = [...displays];
      if (displaysHold.length >= 100) {
        displaysHold.slice(0, 10);
      }
      displaysHold.push(skyHeartDisplay);
      return displaysHold;
    });
    setTimeout(() => {
      setHeartFallsIteration((iteration) => {
        return iteration + 1;
      });
    }, 50);
  }, [heartFallsIteration]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainRHDisplaySupportClass`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainRHDisplaySupportClassv2`,
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
      <View ref={mainDisplayRef} style={styles.mainDisplay}>
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
          style={{
            position: "absolute",
            width: "100%",
            height: "95%",
            zIndex: -10,
          }}
        >
          {heartDisplays.map((displays) => {
            return displays;
          })}
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
    overflow: "hidden",
  },
});

export default RainingHearts;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
