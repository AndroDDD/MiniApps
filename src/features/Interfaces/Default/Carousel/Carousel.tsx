import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { gsap } from "gsap";

import $ from "jquery";

import "./CarouselStyles.scss";

const Carousel: React.FC = () => {
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
    setScreenHeight(() => {
      let fetchedScreenHeight = Dimensions.get("window").height;
      return fetchedScreenHeight;
    });

    setScreenWidth(() => {
      let fetchedScreenWidth = Dimensions.get("window").width;
      return fetchedScreenWidth;
    });
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
    formerImageRef.current.src = formerImageRef.current.src + queryString;
    latterImageRef.current.src = latterImageRef.current.src + queryString;
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `mainCarouselDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    carouselDisplay: `carouselDisplay`,
    formerImageDiv: `formerImageDiv`,
    formerImage: `formerImage`,
    latterImageDiv: `latterImageDiv`,
    latterImage: `latterImage`,
  });

  // Declare variable holding image urls
  const [imageUrls, setImageUrls] = React.useState<Array<string>>();

  // Declare variable tracking if initial image urls have been fetched
  const [imagesFetched, setImagesFetched] = React.useState(() => {
    return false;
  });

  // Declare variable tracking current image
  const [currentImage, setCurrentImage] = React.useState(() => {
    return 0;
  });

  // Declare variable holding carousel iteration count
  const [carouselIteration, setCarouselIteration] = React.useState(() => {
    return 1;
  });

  // Declare gsap ref for animating view
  let gsapRef = React.useRef<any>();

  // Declare element ref for data extraction and manipulation
  let carouselDisplayRef = React.useRef<any>();
  let formerImageDivRef = React.useRef<any>();
  let formerImageRef = React.useRef<any>();
  let latterImageDivRef = React.useRef<any>();
  let latterImageRef = React.useRef<any>();

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

  // Handle initial image urls fetch
  React.useEffect(() => {
    const handleImageFetch = async () => {
      let fetching = await fetch(
        "https://pixabay.com/api/?key=19069269-dbd82b3a6cdc407ead0408fe1"
      )
        .then((res) => {
          let jsonData = res.json();
          console.log({ pixabayResponse: jsonData });
          return jsonData;
        })
        .then((json: { hits: Array<{ largeImageURL: string }> }) => {
          let extractImageUrls = () => {
            let imageUrlsHold = [];
            for (let i = 0; i < json.hits.length; i++) {
              imageUrlsHold.push(json.hits[i].largeImageURL);
            }
            return imageUrlsHold;
          };

          let extractedImageUrls = extractImageUrls();
          setImageUrls(() => {
            return extractedImageUrls;
          });
          setImagesFetched(() => {
            return true;
          });
          console.log({ pixabayResponsev2: json.hits, extractedImageUrls });
        });
    };
    handleImageFetch();
  }, []);

  // Handle carousel animation
  React.useEffect(() => {
    if (imagesFetched) {
      let nextImageIdx =
        imageUrls && currentImage >= imageUrls?.length - 1
          ? 0
          : currentImage + 1;

      gsapRef.current = gsap
        .timeline()
        .set(formerImageRef.current, {
          attr: {
            src: imageUrls
              ? imageUrls[currentImage]
              : `http://getwallpapers.com/wallpaper/full/a/0/f/692583-question-mark-wallpapers-2048x2048-for-tablet.jpg`,
          },
        })
        .set(latterImageRef.current, {
          attr: {
            src: imageUrls
              ? imageUrls[nextImageIdx]
              : `http://getwallpapers.com/wallpaper/full/a/0/f/692583-question-mark-wallpapers-2048x2048-for-tablet.jpg`,
          },
        })
        .to(formerImageDivRef.current, { top: "-110%", duration: 3 })
        .to(latterImageDivRef.current, {
          top: "-100%",
          duration: 3,
          delay: -2.7,
        })
        .set(formerImageRef.current, {
          attr: {
            src: imageUrls
              ? imageUrls[nextImageIdx]
              : `http://getwallpapers.com/wallpaper/full/a/0/f/692583-question-mark-wallpapers-2048x2048-for-tablet.jpg`,
          },
        })
        .set(formerImageDivRef.current, { top: "0%" })
        .set(latterImageDivRef.current, { top: "10%" })
        .call(() => {
          setCurrentImage(() => {
            return nextImageIdx;
          });
          setTimeout(() => {
            setCarouselIteration((iteration) => {
              return iteration + 1;
            });
          }, 3000);
        });
    }
  }, [carouselIteration, imagesFetched]);

  // Handle component return view
  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <div ref={carouselDisplayRef} className={styles.carouselDisplay}>
          <div ref={formerImageDivRef} className={styles.formerImageDiv}>
            <img
              ref={formerImageRef}
              src={``}
              alt={`Former`}
              className={styles.formerImage}
              onLoad={(event) => {
                handleImageResize(
                  event,
                  carouselDisplayRef.current.offsetHeight,
                  carouselDisplayRef.current.offsetWidth
                );
              }}
            />
          </div>
          <div ref={latterImageDivRef} className={styles.latterImageDiv}>
            <img
              ref={latterImageRef}
              src={``}
              alt={`Latter`}
              className={styles.latterImage}
              onLoad={(event) => {
                handleImageResize(
                  event,
                  carouselDisplayRef.current.offsetHeight,
                  carouselDisplayRef.current.offsetWidth
                );
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

export default Carousel;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
