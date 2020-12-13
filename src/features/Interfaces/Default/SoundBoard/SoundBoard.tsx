import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import helicopter1 from "../../../Media/forSoundBoard/0000545.mp3";
import heavyShoveling from "../../../Media/forSoundBoard/0001041.mp3";
import tappingSomething from "../../../Media/forSoundBoard/0001197.mp3";
import windUp from "../../../Media/forSoundBoard/0001526.mp3";
import lightShoveling from "../../../Media/forSoundBoard/0002199.mp3";
import doctorAvailable from "../../../Media/forSoundBoard/0009107.mp3";
import helicopterSwooping from "../../../Media/forSoundBoard/0009605.mp3";
import theSubway from "../../../Media/forSoundBoard/0010626.mp3";
import inTheLeaves from "../../../Media/forSoundBoard/0011271.mp3";
import atTheTrainStation from "../../../Media/forSoundBoard/0011791.mp3";
import erratic from "../../../Media/forSoundBoard/0011892.mp3";
import spitting from "../../../Media/forSoundBoard/0012533.mp3";
import helicopterChilling from "../../../Media/forSoundBoard/0012665.mp3";

import "./SoundBoardStyles.scss";

const SoundBoard: React.FC = () => {
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
    mainDisplaySupportClass: `mainSoundBoardDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForSoundBoard`,
    backToIndexPageButton: `backToIndexPageButtonForSoundBoard`,
    switchStylesButton: `switchStylesButtonForSoundBoard`,
    soundPlayersDisplay: `soundPlayersDisplay`,
    soundPlayerContainer: `soundPlayerContainer`,
    soundPlayerTitle: `soundPlayerTitle`,
    soundPlayer: `soundPlayer`,
  });

  // Declare variable holding all mp3 paths
  const [sounds, setSounds] = React.useState(() => {
    return [
      { path: helicopter1, title: `Helicopter Take Off ` },
      { path: heavyShoveling, title: `Heavy Shoveling?` },
      { path: tappingSomething, title: `TappingSomething` },
      { path: windUp, title: `Wind Up` },
      { path: lightShoveling, title: `Light Shoveling` },
      { path: doctorAvailable, title: `Doctor Available` },
      { path: helicopterChilling, title: `Helicopter Chilling` },
      { path: helicopterSwooping, title: `Helicopter Swooping` },
      { path: theSubway, title: `The Subway` },
      { path: inTheLeaves, title: `In The Leaves` },
      { path: atTheTrainStation, title: `At The Train Station` },
      { path: erratic, title: `Erratic Noise` },
      { path: spitting, title: `Spitting` },
      { path: helicopterChilling, title: `Helicopter Chilling` },
    ];
  });

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainSoundBoardDisplaySupportClass`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainSoundBoardDisplaySupportClassv2`,
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
      <View style={styles.mainDisplay}>
        <div className={styles.soundPlayersDisplay}>
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
          {sounds.map((sound) => (
            <div className={styles.soundPlayerContainer}>
              <div className={styles.soundPlayerTitle}>{sound.title}</div>
              <ReactAudioPlayer
                key={`${Math.random() * 1000}&${Math.random() * 2000}`}
                className={styles.soundPlayer}
                src={sound.path}
                autoPlay={false}
                controls
                onError={(err) => {
                  console.log({ err });
                }}
              />
            </div>
          ))}
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

export default SoundBoard;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
