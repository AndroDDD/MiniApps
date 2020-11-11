import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import "./ToastNotificationStyles.scss";
import { ListItemIcon } from "@material-ui/core";

const ToastNotification: React.FC = () => {
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
    mainDisplaySupportClass: `mainTNDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    toastNotificationDisplay: `toastNotificationDisplay`,
    toastNotificationButton: `toastNotificationButton`,
    notificationListItem: `notificationListItem`,
  });

  // Declare variable holding notifications jsx elements
  const [notificationList, setNotificationList] = React.useState<
    Array<JSX.Element>
  >([]);

  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div className={styles.toastNotificationDisplay}>
          <button
            className={styles.toastNotificationButton}
            onClick={async () => {
              let notificationListHold = [...notificationList];
              notificationListHold.push(
                <div
                  key={Math.floor(Math.random() * 999)}
                  className={styles.notificationListItem}
                >{`tap tap tap tap tap ${Math.floor(
                  Math.random() * 999
                )}`}</div>
              );
              setNotificationList(() => {
                return notificationListHold;
              });
              await setTimeout(() => {
                setNotificationList((notificationListv2) => {
                  let notificationListHoldv2 = [...notificationListv2];
                  notificationListHoldv2.splice(0, 1);
                  return notificationListHoldv2;
                });
              }, 2000);
            }}
          >{`Tap Button As Fast As You Can`}</button>
          {notificationList.map((listItem) => listItem)}
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

export default ToastNotification;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
