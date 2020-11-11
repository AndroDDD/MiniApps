import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import $ from "jquery";

import "./PopupStyles.scss";

const Popup: React.FC = () => {
  // Handle screen size detection and changes
  const [screenHeight, setScreenHeight] = React.useState(() => {
    let fetchedScreenHeight = Dimensions.get("window").height;
    return fetchedScreenHeight;
  });
  const [screenWidth, setScreenWidth] = React.useState(() => {
    let fetchedScreenWidth = Dimensions.get("window").width;
    return fetchedScreenWidth;
  });
  $(window).on("resize", () => {
    console.log({ prevScreenHeight: screenHeight });
    setScreenHeight(() => {
      let fetchedScreenHeight = Dimensions.get("window").height;
      return fetchedScreenHeight;
    });
    setScreenWidth(() => {
      let fetchedScreenWidth = Dimensions.get("window").width;
      return fetchedScreenWidth;
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

    let timestamp = new Date().getTime();
    let queryString = "?t=" + timestamp;
    popupImageRef.current.src =
      `https://picsum.photos/id/${imageId}/500` + queryString;
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `mainPUDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    popupButton: `popupButton`,
    popupDisplay: `popupDisplay`,
    closePopupButton: `closePopupButton`,
    popupImage: `popupImage`,
    popupImageDisplay: `popupImageDisplay`,
  });

  // Declare variable holding image id
  const [imageId, setImageId] = React.useState(() => {
    return Math.floor(Math.random() * 850);
  });

  // Declare refs for data extraction
  let popupDisplayRef = React.useRef<any>();
  let popupImageDisplayRef = React.useRef<any>();
  let popupImageRef = React.useRef<any>();

  // Declare function handling image resize
  const handleImageResize = (
    event: any,
    containerHeight: number,
    containerWidth: number
  ) => {
    let imgContainerHeight = containerHeight;
    let imgContainerWidth = containerWidth;
    let actualImageHeight = event.currentTarget.naturalHeight;
    let actualImageWidth = event.currentTarget.naturalWidth;

    if (actualImageHeight < actualImageWidth) {
      // Handle resize for landscape
      let imgHeightRatio = imgContainerHeight / actualImageHeight;
      let reconfiggedWidth = imgHeightRatio * actualImageWidth;

      if (reconfiggedWidth > imgContainerWidth) {
        let imgWidthRatio = imgContainerWidth / reconfiggedWidth;
        let reconfiggedHeight = imgWidthRatio * imgContainerHeight;
        event.currentTarget.height = reconfiggedHeight;
        event.currentTarget.width = imgContainerWidth;
        console.log({
          widthClarified: `reconfiggedWidth > imgContainerWidth`,
          imgWidthRatio,
          reconfiggedHeight,
        });
      } else {
        console.log(`reconfiggedWidth < imgContainerWidth`);
        event.currentTarget.height = imgContainerHeight;
        event.currentTarget.width = reconfiggedWidth;
      }
      console.log({
        imgResizeType: `imgResize landscape`,
        imgHeightRatio,
        reconfiggedWidth,
      });
    } else if (actualImageWidth < actualImageHeight) {
      // Handle resize for portrait
      let imgWidthRatio = imgContainerWidth / actualImageWidth;
      let reconfiggedHeight = imgWidthRatio * actualImageHeight;
      if (reconfiggedHeight > imgContainerHeight) {
        let imgHeightRatio = imgContainerHeight / reconfiggedHeight;
        let reconfiggedWidth = imgHeightRatio * imgContainerWidth;
        event.currentTarget.height = imgContainerHeight;
        event.currentTarget.width = reconfiggedWidth;
        console.log({
          heightClarified: `reconfiggedHeight > imgContainerHeight`,
          imgHeightRatio,
          reconfiggedWidth,
        });
      } else {
        event.currentTarget.height = reconfiggedHeight;
        event.currentTarget.width = imgContainerWidth;
        console.log(`reconfiggedHeight < imgContainerHeight`);
      }
      console.log({
        imgResizeType: `imgResize portrait`,
        imgWidthRatio,
        reconfiggedHeight,
      });
    }
    console.log({
      imgContainerHeight,
      imgContainerWidth,
      actualImageHeight,
      actualImageWidth,
    });
  };

  // Handle component return view
  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div
          className={styles.popupButton}
          onClick={() => {
            setImageId(() => {
              return Math.floor(Math.random() * 850);
            });
            popupDisplayRef.current.style.display = "flex";
          }}
        >{`POPUP`}</div>
        <div ref={popupDisplayRef} className={styles.popupDisplay}>
          <div
            className={styles.closePopupButton}
            onClick={() => {
              popupDisplayRef.current.style.display = "none";
            }}
          >{`X`}</div>
          <div ref={popupImageDisplayRef} className={styles.popupImageDisplay}>
            <img
              ref={popupImageRef}
              src={`https://picsum.photos/id/${imageId}/500`}
              className={styles.popupImage}
              alt={`PopUp`}
              onLoad={(event) => {
                let extractedHeight = popupImageDisplayRef.current.offsetHeight;
                let extractedWidth = popupImageDisplayRef.current.offsetWidth;
                handleImageResize(event, extractedHeight, extractedWidth);
              }}
              onError={(event) => {
                event.currentTarget.src =
                  "data:image/jpeg;base64,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";
              }}
            />
          </div>
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

export default Popup;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
