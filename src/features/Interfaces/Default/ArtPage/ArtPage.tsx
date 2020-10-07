import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import rough from "roughjs/bin/rough";
import { Drawable } from "roughjs/bin/core";

import $ from "jquery";

import "./ArtPageStyles.scss";
import { formatDiagnosticsWithColorAndContext } from "typescript";

const generator = rough.generator();

const ArtPage: React.FC = () => {
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
    mainDisplaySupportClass: `artPageDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    artBoardDisplay: styles2.artBoardDisplay,
    artBoardCanvas: "artBoardCanvas",
    canvasToolsetView: styles2.canvasToolsetView,
    selectLineButton: `selectLineButton`,
    selectRectButton: `selectRectButton`,
    selectSelectionButton: `selectSelectionButton`,
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

  // Create art board reference
  const createCanvasRef = () => {
    let canvasConfig = document.createElement("canvas");

    return canvasConfig;
  };
  const canvasRef = React.useRef(createCanvasRef());

  // Declare canvas run states
  // variable tracking drawing data
  const [elements, setElements] = React.useState<
    Array<{
      id: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;

      tool: string;
      roughElement: Drawable;
      offSetX?: number;
      offSetY?: number;
    }>
  >([]);
  // variable tracking if drawing
  const [action, setAction] = React.useState(`none`);
  // variable tracking selected draw shape
  const [selectedTool, setSelectedTool] = React.useState(`line`);
  // variable for tracking selected element
  const [selectedElement, setSelectedElement] = React.useState<{
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    tool: string;
    roughElement: Drawable;
    offSetX?: number;
    offSetY?: number;
  }>();

  // Declare canvas processes to run operations
  const createElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tool: string,
    offSetX?: number,
    offSetY?: number
  ) => {
    let roughElement: any;
    if (tool === `line`) {
      roughElement = generator.line(x1, y1, x2, y2);
    } else if (tool === `rect`) {
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    } else if (tool === `selection`) {
    } else {
      roughElement = generator.line(x1, y1, x2, y2);
    }
    return { id, x1, y1, x2, y2, tool, roughElement, offSetX, offSetY };
  };

  const updateElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tool: string
  ) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, tool);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  };

  const distance = (
    av2: { x: number; y: number },
    bv2: { x: number; y: number }
  ) => {
    const calculations = Math.sqrt(
      Math.pow(av2.x - bv2.x, 2) + Math.pow(av2.y - bv2.y, 2)
    );
    return calculations;
  };

  const isWithinElement = (
    mousePosXv2: number,
    mousePosYv2: number,
    element: {
      id: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      tool: string;
      roughElement: Drawable;
      offSetX?: number;
      offSetY?: number;
    }
  ) => {
    console.log({ ElementForIsWithinElement: element });
    const { tool, x1, x2, y1, y2 } = element;
    if (tool === `rect`) {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      console.log({
        clickedMouseXPos: mousePosXv2,
        clickedMouseVPos: mousePosYv2,
        clickedMinX: minX,
        clickedMaxX: maxX,
        clickedMinY: minY,
        clickedMaxY: maxY,
      });
      return (
        mousePosXv2 >= minX &&
        mousePosXv2 <= maxX &&
        mousePosYv2 >= minY &&
        mousePosYv2 <= maxY
      );
    } else {
      const a = { x1, y1 };
      const b = { x2, y2 };
      const c = { mousePosXv2, mousePosYv2 };
      console.log({ a, b, c });
      const offset =
        distance({ x: a.x1, y: a.y1 }, { x: b.x2, y: b.y2 }) -
        (distance(
          { x: a.x1, y: a.y1 },
          { x: c.mousePosXv2, y: c.mousePosYv2 }
        ) +
          distance(
            { x: b.x2, y: b.y2 },
            { x: c.mousePosXv2, y: c.mousePosYv2 }
          ));
      console.log(`offset of selection ${offset}`);
      return Math.abs(offset) < 1;
    }
  };

  const getElementAtPosition = (
    mousePosX: number,
    mousePosY: number,
    elementsv2: Array<{
      id: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      tool: string;
      roughElement: Drawable;
      offSetX?: number;
      offSetY?: number;
    }>
  ) => {
    return elementsv2.find((element) => {
      console.log({ elementsv2, mousePosX, mousePosY });
      const verifyIsWithinElement = isWithinElement(
        mousePosY,
        mousePosX,
        element
      );

      console.log({ verifyIsWithinElement });
      return verifyIsWithinElement;
    });
  };

  const adjustElementCoordinates = (element: {
    id?: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    tool?: string;
    roughElement?: Drawable;
    offSetX?: number | undefined;
    offSetY?: number | undefined;
  }) => {
    const { tool, x1, y1, x2, y2 } = element;
    if (tool === "rect") {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return { x1: minX, y1: minY, x2: maxX, y2: maxY };
    } else {
      if (x1 < x2 || (x1 === x2 && y1 < y2)) {
        return { x1, y1, x2, y2 };
      } else {
        return { x1: x2, y1: y2, x2: x1, y2: y1 };
      }
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const { clientX, clientY } = event;
    const reconfiggedMousePositionX = clientX - canvasRect.left;
    const reconfiggedMousePositionY = clientY - canvasRect.top;

    if (selectedTool === `selection`) {
      console.log(`selecting`);
      const element = getElementAtPosition(
        reconfiggedMousePositionX,
        reconfiggedMousePositionY,
        elements
      );
      console.log({ element, elements });
      if (element) {
        const offSetXv2 = reconfiggedMousePositionX - element.x1;
        const offSetYv2 = reconfiggedMousePositionY - element.y1;
        setSelectedElement({
          ...element,
          offSetX: offSetXv2,
          offSetY: offSetYv2,
        });
        setAction(`moving`);
      }
    } else {
      const idv2 = elements.length;
      const element = createElement(
        idv2,
        reconfiggedMousePositionX,
        reconfiggedMousePositionY,
        reconfiggedMousePositionX,
        reconfiggedMousePositionY,
        selectedTool
      );

      setElements((prevState) => {
        return [...prevState, element];
      });
      setAction(`drawing`);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const reconfiggedMousePositionX = clientX - canvasRect.left;
    const reconfiggedMousePositionY = clientY - canvasRect.top;

    if (selectedTool === "selection") {
      event.currentTarget.style.cursor = getElementAtPosition(
        reconfiggedMousePositionX,
        reconfiggedMousePositionY,
        elements
      )
        ? "move"
        : "default";
    }

    if (action === `drawing`) {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(
        index,
        x1,
        y1,
        reconfiggedMousePositionX,
        reconfiggedMousePositionY,
        selectedTool
      );
    } else if (action === `moving`) {
      console.log(`mouse is moving with selection tool.. I think`);
      if (selectedElement) {
        const { id, x1, y1, x2, y2, tool, offSetX, offSetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = offSetX ? reconfiggedMousePositionX - offSetX : 0;
        const newY1 = offSetY ? reconfiggedMousePositionY - offSetY : 0;

        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, tool);
      }
    }
  };
  const handleMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const reconfiggedMousePositionX = clientX - canvasRect.left;
    const reconfiggedMousePositionY = clientY - canvasRect.top;
    const index = elements.length - 1;
    const { id, tool } = elements[index];
    if (action === "drawing") {
      //const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      //updateElement(id, x1, y1, x1, y1, tool);
    }
    setAction(`none`);
    setSelectedElement(undefined);
  };

  // Set up art board canvas
  React.useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const roughCanvas = rough.canvas(canvasRef.current);

      elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    }
  }, [elements]);

  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <View style={styles.artBoardDisplay}>
          <canvas
            ref={canvasRef}
            className={styles.artBoardCanvas}
            width={"700px"}
            height={"700px"}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
          <View style={styles.canvasToolsetView}>
            <button
              className={styles.selectLineButton}
              onClick={() => {
                setSelectedTool(`line`);
              }}
            >
              {"LINE"}
            </button>
            <button
              className={styles.selectRectButton}
              onClick={() => {
                setSelectedTool(`rect`);
              }}
            >
              {"RECT"}
            </button>
            <button
              className={styles.selectSelectionButton}
              onClick={() => {
                setSelectedTool(`selection`);
              }}
            >{`SELECTION`}</button>
          </View>
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    width: "100%",
    height: "100%",
  },
  artBoardDisplay: {
    margin: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgba(0, 255, 255, 0.85)",
    backgroundColor: "rgba(255, 255, 255, 0.90)",
  },
  canvasToolsetView: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
});

export default ArtPage;
