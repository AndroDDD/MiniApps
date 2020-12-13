import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

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

const CountdownTimer: React.FC = () => {
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

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `countdownTimerDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    mainDisplayTitle: styles2.mainDisplayTitle,
    mainDisplayTitleView: styles2.mainDisplayTitleView,
    headerBar: `headerBarForCountdownTimer`,
    backToIndexPageButton: `backToIndexPageButtonForCountdownTimer`,
    switchStylesButton: `switchStylesButtonForCountdownTimer`,
    countdownTimerImage: `countdownTimerImage`,
    countdownTimerImageStyleSupport: `countdownTimerImageStyleSupport`,
    countdownTimer: styles2.countdownTimer,
    countdownTimerLeft: styles2.countdownTimerLeft,
    countdownTimerRight: styles2.countdownTimerRight,
    countdownTimerDays: styles2.countdownTimerDays,
    countdownTimerHours: styles2.countdownTimerHours,
    countdownTimerMinutes: styles2.countdownTimerMinutes,
    countdownTimerSeconds: styles2.countdownTimerSeconds,
    countdownTimerDaysTitle: styles2.countdownTimerDaysTitle,
    countdownTimerHoursTitle: styles2.countdownTimerHoursTitle,
    countdownTimerMinutesTitle: styles2.countdownTimerMinutesTitle,
    countdownTimerSecondsTitle: styles2.countdownTimerSecondsTitle,
    countdownTimerDaysText: styles2.countdownTimerDaysText,
    countdownTimerHoursText: styles2.countdownTimerHoursText,
    countdownTimerMinutesText: styles2.countdownTimerMinutesText,
    countdownTimerSecondsText: styles2.countdownTimerSecondsText,
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

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

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

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `countdownTimerDisplaySupportClass`,
          mainDisplayTitle: styles2.mainDisplayTitle,
          countdownTimerImage: `countdownTimerImage`,
          countdownTimerImageStyleSupport: `countdownTimerImageStyleSupport`,
          countdownTimerSecondsTitle: styles2.countdownTimerSecondsTitle,
          countdownTimerMinutesTitle: styles2.countdownTimerMinutesTitle,
          countdownTimerHoursTitle: styles2.countdownTimerHoursTitle,
          countdownTimerDaysTitle: styles2.countdownTimerDaysTitle,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `countdownTimerDisplaySupportClassv2`,
          mainDisplayTitle: styles2.mainDisplayTitlev2,
          countdownTimerImage: `countdownTimerImagev2`,
          countdownTimerImageStyleSupport: `countdownTimerImageStyleSupportv2`,
          countdownTimerSecondsTitle: styles2.countdownTimerSecondsTitlev2,
          countdownTimerMinutesTitle: styles2.countdownTimerMinutesTitlev2,
          countdownTimerHoursTitle: styles2.countdownTimerHoursTitlev2,
          countdownTimerDaysTitle: styles2.countdownTimerDaysTitlev2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle return view for component
  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div className={styles.countdownTimerImage}>
          <img
            src={
              "https://ohmy.disney.com/wp-content/uploads/2014/02/Fantasy-Disney-Wedding-Locations-The-Nightmare-Before-Christmas.jpg"
            }
            alt={`Countdown Timer Skin`}
            width={"750px"}
            height={"auto"}
            className={styles.countdownTimerImageStyleSupport}
          />
        </div>
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
        <View style={styles.mainDisplayTitleView}>
          <Text
            style={styles.mainDisplayTitle}
          >{`COUNTDOWN TIL NEWYEARS!`}</Text>
        </View>
        <View style={styles.countdownTimer}>
          <View style={styles.countdownTimerLeft}>
            <View style={styles.countdownTimerDays}>
              <Text style={styles.countdownTimerDaysTitle}>{`DAYS`}</Text>
              <Text style={styles.countdownTimerDaysText}>{days}</Text>
            </View>
            <View style={styles.countdownTimerHours}>
              <Text style={styles.countdownTimerHoursTitle}>{`HOURS`}</Text>
              <Text style={styles.countdownTimerHoursText}>{hours}</Text>
            </View>
          </View>
          <View style={styles.countdownTimerRight}>
            <View style={styles.countdownTimerMinutes}>
              <Text style={styles.countdownTimerMinutesTitle}>{`MINUTES`}</Text>
              <Text style={styles.countdownTimerMinutesText}>{minutes}</Text>
            </View>
            <View style={styles.countdownTimerMinutes}>
              <Text style={styles.countdownTimerSecondsTitle}>{`SECONDS`}</Text>
              <Text style={styles.countdownTimerSecondsText}>{seconds}</Text>
            </View>
          </View>
        </View>
      </View>
    </div>
  );
};

// Declare stylesheet for react native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  mainDisplayTitle: {
    textAlign: "center",
    color: "rgba(0, 255, 255, 0.3)",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
  },
  mainDisplayTitlev2: {
    textAlign: "center",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
  },
  mainDisplayTitleView: {
    position: "absolute",
    top: "7%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownTimer: {
    flexDirection: "row",
    margin: "auto",
    position: "relative",
    top: "-5%",
    justifyContent: "center",
    alignItems: "center",
    width: "750px",
    border: "1px solid slategrey",
  },
  countdownTimerLeft: {
    flexDirection: "row",
    margin: "auto",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid purple",
  },
  countdownTimerRight: {
    flexDirection: "row",
    margin: "auto",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid purple",
  },
  countdownTimerDays: {
    margin: "auto",
    paddingTop: "5px",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid cyan",
    backgroundColor: "rgba(112, 128, 144, 0.25)",
  },
  countdownTimerHours: {
    margin: "auto",
    paddingTop: "5px",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid cyan",
    backgroundColor: "rgba(112, 128, 144, 0.25)",
  },
  countdownTimerMinutes: {
    margin: "auto",
    paddingTop: "5px",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid cyan",
    backgroundColor: "rgba(112, 128, 144, 0.25)",
  },
  countdownTimerSeconds: {
    margin: "auto",
    paddingTop: "5px",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid cyan",
    backgroundColor: "rgba(112, 128, 144, 0.25)",
  },
  countdownTimerDaysTitle: {
    border: "0px solid red",
    color: "crimson",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerHoursTitle: {
    border: "0px solid red",
    color: "crimson",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerMinutesTitle: {
    border: "0px solid red",
    color: "crimson",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerSecondsTitle: {
    border: "0px solid red",
    color: "crimson",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerDaysTitlev2: {
    border: "0px solid red",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerHoursTitlev2: {
    border: "0px solid red",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerMinutesTitlev2: {
    border: "0px solid red",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerSecondsTitlev2: {
    border: "0px solid red",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
  },
  countdownTimerDaysText: {
    position: "relative",
    top: -10,
    border: "0px solid orange",
    color: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
    fontSize: 100,
    fontWeight: "700",
  },
  countdownTimerHoursText: {
    position: "relative",
    top: -10,
    border: "0px solid orange",
    color: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
    fontSize: 100,
    fontWeight: "700",
  },
  countdownTimerMinutesText: {
    position: "relative",
    top: -10,
    border: "0px solid orange",
    color: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
    fontSize: 100,
    fontWeight: "700",
  },
  countdownTimerSecondsText: {
    position: "relative",
    top: -10,
    border: "0px solid orange",
    color: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 5,
    fontSize: 100,
    fontWeight: "700",
  },
});

export default CountdownTimer;
