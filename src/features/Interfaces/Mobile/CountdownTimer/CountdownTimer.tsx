import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import { localUrl } from "../../../../routes/routerBlock";

import $ from "jquery";

import "./CountdownTimerStyles.scss";

// Declare new years date
const newYears = "1 Jan 2021";

// Declare countdown function
function countdown(setTime: {
  day: Function;
  hour: Function;
  minutes: Function;
  seconds: Function;
}) {
  const newYearsFullDate = Number(new Date(newYears));
  const newYearsDay = new Date(newYears).getDate();
  const newYearsHour = new Date(newYears).getHours();
  const newYearsMinutes = new Date(newYears).getMinutes();
  const newYearsSeconds = new Date(newYears).getSeconds();

  const currentFullDate = Number(new Date());
  const currentDay = new Date().getDate();
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();

  const totalSeconds = (newYearsFullDate - currentFullDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  // Handle Timer update
  setTime.day(days);
  setTime.hour(hours);
  setTime.minutes(minutes);
  setTime.seconds(seconds);

  // Handle message logs
  console.log({
    timeDifferenceInSeconds: totalSeconds,
    calculatedDays: days,
    calculatedHours: hours,
    calculatedMinutes: minutes,
    calculatedSeconds: seconds,
  });

  console.log({ currentFullDate, newYearsFullDate });

  console.log({
    currentDate: [currentDay, currentHour, currentMinutes, currentSeconds],
    newYearsDate: [newYearsDay, newYearsHour, newYearsMinutes, newYearsSeconds],
  });
}

const MobileCountdownTimer: React.FC = () => {
  // Handle screen size detection and changes
  // Declare variable tracking screen height
  const [screenHeight, setScreenHeight] = React.useState(
    Dimensions.get("window").height
  );
  // Declare variable tracking screen width
  const [screenWidth, setScreenWidth] = React.useState(
    Dimensions.get("window").width
  );
  // Handle screen size change
  $(window).on("resize", () => {
    setScreenHeight(() => {
      return Dimensions.get("window").height;
    });
    setScreenWidth(() => {
      return Dimensions.get("window").width;
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
    backgroundImage: { width: "100%", height: screenHeight },
    headerBar: `headerBarForCountdownTimer`,
    backToIndexPageButton: `backToIndexPageButtonForCountdownTimer`,
    switchStylesButton: `switchStylesButtonForCountdownTimer`,
    daysView: styles2.daysView,
    hoursView: styles2.hoursView,
    minutesView: styles2.minutesView,
    secondsView: styles2.secondsView,
    daysText: styles2.daysText,
    hoursText: styles2.hoursText,
    minutesText: styles2.minutesText,
    secondsText: styles2.secondsText,
    daysTitleText: styles2.daysTitleText,
    hoursTitleText: styles2.hoursTitleText,
    minutesTitleText: styles2.minutesTitleText,
    secondsTitleText: styles2.secondsTitleText,
    genericText: styles2.genericText,
  });

  // Declare variables for time manipulation
  const [incrementCount, setIncrementCount] = React.useState(0);
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle time updates
  React.useEffect(() => {
    countdown({
      day: setDays,
      hour: setHours,
      minutes: setMinutes,
      seconds: setSeconds,
    });
    setTimeout(() => {
      let updatedIncrementCount = incrementCount + 1;
      setIncrementCount(updatedIncrementCount);
    }, 1000);
  }, [incrementCount]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          daysView: styles2.daysView,
          hoursView: styles2.hoursView,
          minutesView: styles2.minutesView,
          secondsView: styles2.secondsView,
          daysText: styles2.daysText,
          hoursText: styles2.hoursText,
          minutesText: styles2.minutesText,
          secondsText: styles2.secondsText,
          daysTitleText: styles2.daysTitleText,
          hoursTitleText: styles2.hoursTitleText,
          minutesTitleText: styles2.minutesTitleText,
          secondsTitleText: styles2.secondsTitleText,
          genericText: styles2.genericText,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          daysView: styles2.daysViewv2,
          hoursView: styles2.hoursViewv2,
          minutesView: styles2.minutesViewv2,
          secondsView: styles2.secondsViewv2,
          daysText: styles2.daysTextv2,
          hoursText: styles2.hoursTextv2,
          minutesText: styles2.minutesTextv2,
          secondsText: styles2.secondsTextv2,
          daysTitleText: styles2.daysTitleTextv2,
          hoursTitleText: styles2.hoursTitleTextv2,
          minutesTitleText: styles2.minutesTitleTextv2,
          secondsTitleText: styles2.secondsTitleTextv2,
          genericText: styles2.genericTextv2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "https://th.bing.com/th/id/OIP.NTUMpfsaltioiQTsh4ErEwHaFt?pid=Api&rs=1",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
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
        <View style={styles.daysView}>
          <Text style={styles.daysTitleText}>{`DAYS`}</Text>
          <Text style={styles.daysText}>{days}</Text>
        </View>
        <View style={styles.hoursView}>
          <Text style={styles.hoursTitleText}>{`HOURS`}</Text>
          <Text style={styles.hoursText}>{hours}</Text>
        </View>
        <View style={styles.minutesView}>
          <Text style={styles.minutesTitleText}>{`MINUTES`}</Text>
          <Text style={styles.minutesText}>{minutes}</Text>
        </View>
        <View style={styles.secondsView}>
          <Text style={styles.secondsTitleText}>{`SECONDS`}</Text>
          <Text style={styles.secondsText}>{seconds}</Text>
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
  daysView: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopColor: "cyan",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "cyan",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  daysViewv2: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderTopColor: "gainsboro",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "gainsboro",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  hoursView: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopColor: "cyan",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "cyan",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  hoursViewv2: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    borderTopColor: "gainsboro",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "gainsboro",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  minutesView: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopColor: "cyan",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "cyan",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  minutesViewv2: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    borderTopColor: "gainsboro",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "gainsboro",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  secondsView: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopColor: "cyan",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "cyan",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  secondsViewv2: {
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    borderTopColor: "gainsboro",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomColor: "gainsboro",
    boderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  daysText: {
    textAlign: "center",
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  daysTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  hoursText: {
    textAlign: "center",
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  hoursTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  minutesText: {
    textAlign: "center",
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  minutesTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  secondsText: {
    textAlign: "center",
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  secondsTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontSize: 50,
    fontWeight: "700",
  },
  daysTitleText: {
    textAlign: "center",
    color: "rgba(0, 255, 255, 0.5)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  daysTitleTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  hoursTitleText: {
    textAlign: "center",
    color: "rgba(0, 255, 255, 0.5)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  hoursTitleTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  minutesTitleText: {
    textAlign: "center",
    color: "rgba(0, 255, 255, 0.5)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  minutesTitleTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  secondsTitleText: {
    textAlign: "center",
    color: "rgba(0, 255, 255, 0.5)",
    textShadowColor: "rgba(200, 229, 235, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  secondsTitleTextv2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 2,
    fontWeight: "700",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
  genericTextv2: {
    color: "gainsboro",
    textAlign: "center",
  },
});

export default MobileCountdownTimer;
