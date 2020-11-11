import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

import "./MobileArtPageStyles.scss";

const MobileArtPage: React.FC = () => {
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
    setScreenWidth(() => {
      return Dimensions.get("window").width;
    });
    setScreenHeight(() => {
      return Dimensions.get("window").height;
    });

    setWidthPRT(() => {
      return Math.floor(pixelRatio * Dimensions.get("window").width);
    });
    setHeightPRT(() => {
      return Math.floor(pixelRatio * Dimensions.get("window").height);
    });
  });

  React.useEffect(() => {
    setStyles(() => {
      let updatedSizes = {
        ...styles,
        mainDisplaySupport: {
          ...styles.mainDisplaySupport,
          height: Dimensions.get("window").height,
        },
        backgroundImage: {
          ...styles.backgroundImage,
          height: Dimensions.get("window").height,
        },
        canvasDisplay: {
          ...styles.canvasDisplay,
          height: Dimensions.get("window").height,
        },
        toolkitSupport: {
          ...styles.toolkitSupport,
        },
      };
      return updatedSizes;
    });
  }, [screenWidth, screenHeight]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupport: { width: "100%", height: screenHeight },
    canvasDisplay: {
      width: "100%",
      height: screenHeight,
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
    backgroundImage: { width: "100%", height: screenHeight },
    toolkit: styles2.toolkit,
    toolkitSupport: { width: "100%" },
    brushButton: `brushButton`,
    eraserButton: `eraserButton`,
    resetButton: `resetButton`,
    genericText: styles2.genericText,
  });

  // Obtain device pixel ratio
  const [pixelRatio, setPixelRatio] = React.useState(() => {
    return window.devicePixelRatio;
  });

  // Define canvas inline width/height with pixel ratio translation
  const [widthPRT, setWidthPRT] = React.useState(() => {
    return Math.floor(pixelRatio * screenWidth);
  });
  const [heightPRT, setHeightPRT] = React.useState(() => {
    return Math.floor(pixelRatio * styles.canvasDisplay.height);
  });

  // Declare variable tracking finger position
  const [fingerPositions, setFingerPositions] = React.useState<
    Array<{ x: number; y: number }>
  >();
  // Declare variable tracking initial finger position
  const [initialFingerPosition, setInitialFingerPosition] = React.useState({
    x: 0,
    y: 0,
  });
  // Declare variable tracking ending finger postion
  const [endingFingerPosition, setEndingFingerPosition] = React.useState({
    x: 0,
    y: 0,
  });

  // Declare variable tracking drawing status
  const [isDrawing, setIsDrawing] = React.useState(false);

  // Declare variable tracking draw tool
  const [drawTool, setDrawTool] = React.useState(`brush`);

  // Declare variable tracking brush size
  const [brushSize, setBrushSize] = React.useState(10);
  // Declare variable tracking fill color
  const [fillColor, setFillColor] = React.useState(`rgba(234, 224, 200, 1)`);

  // Declare refs for DOM/view manipulation
  // Declare canvas ref
  const canvasRef = React.useRef<any>();
  // Declare brush button ref
  const brushButtonRef = React.useRef<any>();
  // Declare eraser button ref
  const eraserButtonRef = React.useRef<any>();
  // Declare reset button ref
  const resetButtonRef = React.useRef<any>();

  // Handle canvas manipulations and updates
  // Handle drawing and erasing
  React.useEffect(() => {
    const canvasCtx = canvasRef.current.getContext("2d");

    if (drawTool === `brush`) {
      canvasCtx.globalCompositeOperation = `source-over`;
      const brushStroke = (x: number, y: number) => {
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, brushSize, 0, Math.PI * 2);
        canvasCtx.fillStyle = fillColor;
        canvasCtx.fill();
      };
      if (fingerPositions) {
        brushStroke(
          fingerPositions[fingerPositions.length - 1].x,
          fingerPositions[fingerPositions.length - 1].y
        );
      }
    } else if (drawTool === `eraser`) {
      canvasCtx.globalCompositeOperation = `destination-out`;
      const erasing = (x: number, y: number) => {
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, brushSize, 0, Math.PI * 2);
        canvasCtx.fillStyle = `rgba(0, 0, 0, 0.75)`;
        canvasCtx.fill();
      };
      if (fingerPositions) {
        erasing(
          fingerPositions[fingerPositions.length - 1].x,
          fingerPositions[fingerPositions.length - 1].y
        );
      }
    }
  }, [fingerPositions]);

  // Handle clearing canvas
  React.useEffect(() => {
    const canvasCtx = canvasRef.current.getContext("2d");
    if (drawTool === `reset`) {
      canvasCtx.clearRect(
        0,
        0,
        styles.canvasDisplay.width,
        styles.canvasDisplay.height
      );
    }
  }, [drawTool]);

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "https://www.pixelstalk.net/wp-content/uploads/2016/09/Nature-Abstract-Art-Wallpaper-620x388.jpg",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
        <Text
          style={styles.genericText}
        >{`drawing: ${isDrawing}, x: ${Math.floor(
          fingerPositions ? fingerPositions[fingerPositions.length - 1].x : 0
        )}, y: ${Math.floor(
          fingerPositions ? fingerPositions[fingerPositions.length - 1].y : 0
        )}`}</Text>
        <canvas
          ref={canvasRef}
          width={screenWidth}
          height={screenHeight}
          style={styles.canvasDisplay}
          onTouchStart={(event) => {
            setInitialFingerPosition(() => {
              return {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              };
            });
            setIsDrawing(true);
          }}
          onTouchMove={(event) => {
            let xPosition = event.touches[0].clientX;
            let yPosition = event.touches[0].clientY;
            setFingerPositions(() => {
              if (fingerPositions) {
                let updatedFingerPositions = [...fingerPositions];

                updatedFingerPositions.push({
                  x: xPosition,
                  y: yPosition,
                });
                return updatedFingerPositions;
              } else {
                return [{ x: xPosition, y: yPosition }];
              }
            });
          }}
          onTouchEnd={(event) => {
            setEndingFingerPosition(() => {
              if (fingerPositions) {
                let lastFingerPositionIndex = fingerPositions.length - 1;
                return {
                  x: fingerPositions[lastFingerPositionIndex].x,
                  y: fingerPositions[lastFingerPositionIndex].y,
                };
              } else {
                return { x: 0, y: 0 };
              }
            });
            setIsDrawing(false);
          }}
        />
        <View style={[styles.toolkit, styles.toolkitSupport]}>
          <button
            ref={brushButtonRef}
            className={styles.brushButton}
            onClick={() => {
              setDrawTool(() => {
                return `brush`;
              });
              // Handle current button style change
              brushButtonRef.current.style.backgroundColor =
                "rgba(0, 255, 255, 0.5)";
              brushButtonRef.current.style.color = "whitesmoke";

              // Handle other toolkit buttons style changes
              eraserButtonRef.current.style.backgroundColor =
                "rgba(255, 115, 0, 1)";
              eraserButtonRef.current.style.color = "rgba(112, 128, 144, 1)";
              resetButtonRef.current.style.backgroundColor =
                "rgba(255, 0, 0, 1)";
              resetButtonRef.current.style.color = "rgba(112, 128, 144, 1)";
            }}
          >{`BRUSH`}</button>
          <button
            ref={eraserButtonRef}
            className={styles.eraserButton}
            onClick={() => {
              setDrawTool(() => {
                return `eraser`;
              });
              // Handle current button style change
              eraserButtonRef.current.style.backgroundColor =
                "rgba(255, 115, 0, 0.5)";
              eraserButtonRef.current.style.color = "whitesmoke";

              // Handle other toolkit buttons style changes
              brushButtonRef.current.style.backgroundColor = "cyan";
              brushButtonRef.current.style.color = "rgba(112, 128, 144, 1)";
              resetButtonRef.current.style.backgroundColor =
                "rgba(255, 0, 0, 1)";
              resetButtonRef.current.style.color = "rgba(112, 128, 144, 1)";
            }}
          >{`ERASER`}</button>
          <button
            ref={resetButtonRef}
            className={styles.resetButton}
            onClick={() => {
              setDrawTool(() => {
                return `reset`;
              });
              // Handle current button style change
              resetButtonRef.current.style.backgroundColor =
                "rgba(255, 0, 0, 0.5)";
              resetButtonRef.current.style.color = "whitesmoke";

              // Handle other toolkit buttons style changes
              brushButtonRef.current.style.backgroundColor = "cyan";
              brushButtonRef.current.style.color = "rgba(112, 128, 144, 1)";
              eraserButtonRef.current.style.backgroundColor =
                "rgba(255, 115, 0, 1)";
              eraserButtonRef.current.style.color = "rgba(112, 128, 144, 1)";
            }}
          >{`RESET`}</button>
        </View>
      </View>
    </ImageBackground>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toolkit: {
    position: "absolute",
    bottom: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  genericText: {
    position: "absolute",
    color: "cyan",
    textAlign: "center",
  },
});

export default MobileArtPage;
