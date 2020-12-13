import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./ToastNotificationStyles.scss";

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
    headerBar: `headerBarForTN`,
    backToIndexPageButton: `backToIndexPageButtonForTN`,
    switchStylesButton: `switchStylesButtonForTN`,
    toastNotificationDisplay: `toastNotificationDisplay`,
    toastNotificationButton: `toastNotificationButton`,
    notificationListItem: `notificationListItem`,
  });

  // Declare variable holding notifications jsx elements
  const [notificationList, setNotificationList] = React.useState<
    Array<JSX.Element>
  >([]);

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
          mainDisplaySupportClass: `mainTNDisplaySupportClass`,
          toastNotificationDisplay: `toastNotificationDisplay`,
          toastNotificationButton: `toastNotificationButton`,
          notificationListItem: `notificationListItem`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `mainTNDisplaySupportClassv2`,
          toastNotificationDisplay: `toastNotificationDisplayv2`,
          toastNotificationButton: `toastNotificationButtonv3`,
          notificationListItem: `notificationListItemv2`,
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
    justifyContent: "flex-start",
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
