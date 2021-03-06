import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

import { isMobile, localUrl } from "../../../../routes/routerBlock";

import "./MoviesLibraryStyles.scss";

const apiKey = "";

const OMDBAPIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const IMGPATH = `https://image.tmdb.org/t/p/w1280`;

const MoviesLibrary: React.FC = () => {
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
    mainDisplaySupportClass: `moviesLibraryPageDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForMoviesLibrary`,
    backToIndexPageButton: `backToIndexPageButtonForMoviesLibrary`,
    switchStylesButton: `switchStylesButtonForMoviesLibrary`,
    moviesDisplay: styles2.moviesDisplay,
    moviesDisplaySupport: { width: isMobile ? "400px" : "600px" },
    mainDisplayTitle: styles2.mainDisplayTitle,
    movieView: styles2.movieView,
    movieTitle: styles2.movieTitle,
    movieOverview: styles2.movieOverview,
    movieOverviewStyleSupport: `movieOverviewStyleSupport`,
    movieReleaseDate: styles2.movieReleaseDate,
    movieRating: styles2.movieRating,
    movieImage: styles2.movieImage,
  });

  // Declare array for storing movies image
  const [movieViews, setMovieViews] = React.useState([
    <View key={"default"}></View>,
  ]);

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

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

  // Handle movie fetch requests
  React.useEffect(() => {
    const omdbFetched = async () => {
      const fetchMovies = await (await fetch(OMDBAPIURL)).json();
      let tempMoviesImage: Array<string> = [];
      let tempMovieViews: Array<JSX.Element> = [];

      fetchMovies.results.forEach((movie: { poster_path: string }) => {
        tempMoviesImage.push(IMGPATH + movie.poster_path);
      });
      fetchMovies.results.forEach(
        (
          movie: {
            original_title: string;
            overview: string;
            release_date: string;
            vote_average: number;
          },
          index: number
        ) => {
          let movieViewConfig = (
            <View key={movie.original_title} style={styles.movieView}>
              <Text style={styles.movieTitle}>{`${movie.original_title}`}</Text>
              <View style={styles.movieImage}>
                <img
                  src={tempMoviesImage[index]}
                  alt={"Poster for movie"}
                  width={"100%"}
                  height={"auto"}
                />
              </View>
              <div className={styles.movieOverviewStyleSupport}>
                <Text style={styles.movieOverview}>{`${movie.overview}`}</Text>
              </div>
              <Text
                style={styles.movieReleaseDate}
              >{`Released: ${movie.release_date}`}</Text>
              <Text
                style={styles.movieRating}
              >{`Rating: ${movie.vote_average}/10`}</Text>
            </View>
          );

          tempMovieViews.push(movieViewConfig);
        }
      );
      console.log({
        moviesImage: tempMoviesImage,
        fetchedMovies: fetchMovies.results,
      });
      setMovieViews(tempMovieViews);
    };
    omdbFetched();
  }, [styles]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `moviesLibraryPageDisplaySupportClass`,
          mainDisplayTitle: styles2.mainDisplayTitle,
          movieView: styles2.movieView,
          movieTitle: styles2.movieTitle,
          movieOverview: styles2.movieOverview,
          movieOverviewStyleSupport: `movieOverviewStyleSupport`,
          movieReleaseDate: styles2.movieReleaseDate,
          movieRating: styles2.movieRating,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `moviesLibraryPageDisplaySupportClassv2`,
          mainDisplayTitle: styles2.mainDisplayTitlev2,
          movieView: styles2.movieViewv2,
          movieTitle: styles2.movieTitlev2,
          movieOverview: styles2.movieOverviewv2,
          movieOverviewStyleSupport: `movieOverviewStyleSupportv2`,
          movieReleaseDate: styles2.movieReleaseDatev2,
          movieRating: styles2.movieRatingv2,
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
        <Text style={styles.mainDisplayTitle}>{`MINI MOVIES LIBRARY`}</Text>
        <View style={[styles.moviesDisplay, styles.moviesDisplaySupport]}>
          {movieViews}
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
  mainDisplayTitle: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(43, 43, 206, 0.75)",
    color: "rgba(194, 178, 128, 1)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(194, 178, 128, 1)",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 10,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Comic Sans MS",
    letterSpacing: 2,
  },
  mainDisplayTitlev2: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
    color: "gainsboro",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "gainsboro",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 10,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Comic Sans MS",
    letterSpacing: 2,
  },
  moviesDisplay: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "auto",
    paddingTop: "50px",
    height: "auto",
  },
  movieView: {
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",

    backgroundColor: "black",
    width: "190px",
    height: "570px",
    border: "2px solid rgba(112, 128, 144, 1)",
    borderRadius: 15,
  },
  movieViewv2: {
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",

    backgroundColor: "black",
    width: "190px",
    height: "570px",
    border: "2px solid gainsboro",
    borderRadius: 15,
  },
  movieTitle: {
    color: "rgba(194, 178, 128, 1)",
    textAlign: "center",
    textShadowColor: "rgba(43, 43, 206, 1)",
    textShadowRadius: 15,
    fontSize: 15,
    fontWeight: "600",
  },
  movieTitlev2: {
    color: "gainsboro",
    textAlign: "center",
    textShadowColor: "rgba(43, 43, 206, 1)",
    textShadowRadius: 15,
    fontSize: 15,
    fontWeight: "600",
  },
  movieImage: {
    width: "100%,",
    marginTop: "5px",
    marginBottom: "10px",
  },
  movieOverview: {
    width: "100%",
    color: "rgba(216, 185, 185, 1)",
    fontSize: 12,
  },
  movieOverviewv2: {
    width: "100%",
    color: "black",
    fontSize: 12,
  },
  movieReleaseDate: {
    color: "rgba(112, 128, 144, 0.75)",
  },
  movieReleaseDatev2: {
    color: "gainsboro",
  },
  movieRating: {
    color: "rgba(112, 128, 144, 0.75)",
  },
  movieRatingv2: {
    color: "gainsboro",
  },
});

export default MoviesLibrary;
