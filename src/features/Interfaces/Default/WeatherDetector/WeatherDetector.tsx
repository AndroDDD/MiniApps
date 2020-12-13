import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { IconButton } from "@material-ui/core";
import { ImageSearchTwoTone } from "@material-ui/icons";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./WeatherDetectorStyles.scss";

// Declare variables for storing api fetch url
const apikey = "";
const APIURL = (location: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

// Declare function converting Kelvin to Celsius
const convertKelvinToCelsius = (KelvinDegrees: number) => {
  let convertedToCelsius = (KelvinDegrees - 273.15).toFixed(2);
  return convertedToCelsius;
};

// Declare function for fecthing weather api data
const queryWeather = async (
  location: string,
  updateWeatherTemp: Function,
  updateWeatherFeelsLike: Function,
  updateWeatherMaxTemp: Function,
  updateWeatherMinTemp: Function,
  updateWeatherHumidity: Function,
  updateLocationCoords: Function,
  updateWhichLocation: Function
) => {
  const weatherData = await fetch(APIURL(location)).then((res) => res.json());
  if (weatherData.cod === 200) {
    console.log("Weather data configuration initiated.!.");
    const locationTempForcedToNumber = Number(weatherData.main.temp);
    const locationFeelsLikeTempForcedToNumber = Number(
      weatherData.main.feels_like
    );
    const locationMaxTempForcedToNumber = Number(weatherData.main.temp_max);
    const locationMinTempForcedToNumber = Number(weatherData.main.temp_min);
    const locationHumidityForcedToNumber = Number(weatherData.main.humidity);
    const fetchedWeatherTempInCelsius = convertKelvinToCelsius(
      locationTempForcedToNumber
    );
    const fetchedWeatherFeelsLikeInCelsius = convertKelvinToCelsius(
      locationFeelsLikeTempForcedToNumber
    );
    const fetchedWeatherMaxTempInCelsius = convertKelvinToCelsius(
      locationMaxTempForcedToNumber
    );
    const fetchedWeatherMinTempInCeslsius = convertKelvinToCelsius(
      locationMinTempForcedToNumber
    );
    const fetchedLocationCoords = {
      longitude: weatherData.coord.lon,
      latitude: weatherData.coord.lat,
    };
    updateWeatherTemp(fetchedWeatherTempInCelsius);
    updateWeatherFeelsLike(fetchedWeatherFeelsLikeInCelsius);
    updateWeatherMaxTemp(fetchedWeatherMaxTempInCelsius);
    updateWeatherMinTemp(fetchedWeatherMinTempInCeslsius);
    updateWeatherHumidity(locationHumidityForcedToNumber);
    updateLocationCoords(fetchedLocationCoords);
  } else {
    updateWeatherTemp(0);
    updateWeatherFeelsLike(0);
    updateWeatherMaxTemp(0);
    updateWeatherMinTemp(0);
    updateWeatherHumidity(0);
    updateLocationCoords(0);
    updateWhichLocation(`No Such Location:/`);
  }
};

const WeatherDetector: React.FC = () => {
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
    mainDisplaySupportClass: `weatherDetectorPageDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForWeatherDetector`,
    backToIndexPageButton: `backToIndexPageButtonForWeatherDetector`,
    switchStylesButton: `switchStylesButtonForWeatherDetector`,
    weatherDetectorDisplay: styles2.weatherDetectorDisplay,
    weatherDetectorDisplayTitleText: styles2.weatherDetectorDisplayTitleText,
    locationQueryDisplay: styles2.locationQueryDisplay,
    locationQueryInput: `locationQueryInput`,
    locationQuerySearchIconDisplay: `locationQuerySearchIconDisplay`,
    locationQuerySearchIcon: `locationQuerySearchIcon`,
    weatherDataDisplay: styles2.weatherDataDisplay,
    coordsView: styles2.coordsView,
    longCoordsText: styles2.longCoordsText,
    latCoordsText: styles2.latCoordsText,
    aboveTempView: styles2.aboveTempView,
    tempView: styles2.tempView,
    belowTempView: styles2.belowTempView,
    weatherTempTitleText: styles2.weatherTempTitleText,
    weatherTempText: styles2.weatherTempText,
    weatherFeelsLikeText: styles2.weatherFeelsLikeText,
    weatherMaxTempText: styles2.weatherMaxTempText,
    weatherMinTempText: styles2.weatherMinTempText,
    weatherHumidityText: styles2.weatherHumidityText,
  });

  // Declare variable holding user location query
  const [whichLocation, setWhichLocation] = React.useState(`amsterdam`);
  const [locationQueryInput, setLocationQueryInput] = React.useState(``);

  // Declare variables holding weather data
  const [locationCoords, setLocationCoords] = React.useState({
    longitude: 0,
    latitude: 0,
  });
  const [weatherTemperature, setWeatherTemperature] = React.useState(0);
  const [weatherFeelsLike, setWeatherFeelsLike] = React.useState(0);
  const [weatherMaxTemp, setWeatherMaxTemp] = React.useState(0);
  const [weatherMinTemp, setWeatherMinTemp] = React.useState(0);
  const [weatherHumidity, setWeatherHumidity] = React.useState(0);

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

  // Handle weather data requests by user
  React.useEffect(() => {
    console.log({ envProcess: process.env.WEATHER_API_KEY });
    queryWeather(
      whichLocation,
      setWeatherTemperature,
      setWeatherFeelsLike,
      setWeatherMaxTemp,
      setWeatherMinTemp,
      setWeatherHumidity,
      setLocationCoords,
      setWhichLocation
    );
  }, [whichLocation]);

  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `weatherDetectorPageDisplaySupportClass`,
          locationQueryInput: `locationQueryInput`,
          locationQuerySearchIcon: `locationQuerySearchIcon`,
          weatherDetectorDisplay: styles2.weatherDetectorDisplay,
          weatherDetectorDisplayTitleText:
            styles2.weatherDetectorDisplayTitleText,
          weatherDataDisplay: styles2.weatherDataDisplay,
          tempView: styles2.tempView,
          longCoordsText: styles2.longCoordsText,
          latCoordsText: styles2.latCoordsText,
          weatherTempTitleText: styles2.weatherTempTitleText,
          weatherTempText: styles2.weatherTempText,
          weatherFeelsLikeText: styles2.weatherFeelsLikeText,
          weatherMaxTempText: styles2.weatherMaxTempText,
          weatherMinTempText: styles2.weatherMinTempText,
          weatherHumidityText: styles2.weatherHumidityText,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `weatherDetectorPageDisplaySupportClassv2`,
          locationQueryInput: `locationQueryInputv2`,
          locationQuerySearchIcon: `locationQuerySearchIconv2`,
          weatherDetectorDisplay: styles2.weatherDetectorDisplayv2,
          weatherDetectorDisplayTitleText:
            styles2.weatherDetectorDisplayTitleTextv2,
          weatherDataDisplay: styles2.weatherDataDisplayv2,
          tempView: styles2.tempViewv2,
          longCoordsText: styles2.longCoordsTextv2,
          latCoordsText: styles2.latCoordsTextv2,
          weatherTempTitleText: styles2.weatherTempTitleTextv2,
          weatherTempText: styles2.weatherTempTextv2,
          weatherFeelsLikeText: styles2.weatherFeelsLikeTextv2,
          weatherMaxTempText: styles2.weatherMaxTempTextv2,
          weatherMinTempText: styles2.weatherMinTempTextv2,
          weatherHumidityText: styles2.weatherHumidityTextv2,
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
        <View style={styles.weatherDetectorDisplay}>
          <Text
            style={styles.weatherDetectorDisplayTitleText}
          >{`Weather Detector`}</Text>
          <View style={styles.locationQueryDisplay}>
            <IconButton
              className={styles.locationQuerySearchIconDisplay}
              onClick={() => {
                setWhichLocation(locationQueryInput);
              }}
            >
              <ImageSearchTwoTone className={styles.locationQuerySearchIcon} />
            </IconButton>
            <input
              className={styles.locationQueryInput}
              type={"text"}
              placeholder={whichLocation}
              onChange={(event) => {
                let updatedQueryValue = event.target.value;
                setLocationQueryInput(updatedQueryValue);
                console.log({ searching: updatedQueryValue });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  setWhichLocation(locationQueryInput);
                }
              }}
            />
          </View>
          <View style={styles.weatherDataDisplay}>
            <View style={styles.coordsView}>
              <Text style={styles.longCoordsText}>
                {"longitude: "}
                {locationCoords.longitude}
              </Text>
              <Text style={styles.latCoordsText}>
                {"latitude: "}
                {locationCoords.latitude}
              </Text>
            </View>
            <View style={styles.aboveTempView}>
              <Text style={styles.weatherFeelsLikeText}>
                {"Feels Like: "}
                {weatherFeelsLike}
                {` \xB0C`}
              </Text>

              <Text style={styles.weatherHumidityText}>
                {"Humidity: "}
                {weatherHumidity}
                {"%"}
              </Text>
            </View>
            <View style={styles.tempView}>
              <Text
                style={styles.weatherTempTitleText}
              >{`TEMPERATURE IN ${whichLocation.toUpperCase()}`}</Text>
              <Text style={styles.weatherTempText}>
                {weatherTemperature}
                {` \xB0C`}
              </Text>
            </View>
            <View style={styles.belowTempView}>
              <Text style={styles.weatherMaxTempText}>
                {"Max Temp: "}
                {weatherMaxTemp}
                {` \xB0C`}
              </Text>
              <Text style={styles.weatherMinTempText}>
                {"Min Temp: "}
                {weatherMinTemp}
                {` \xB0C`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  weatherDetectorDisplay: {
    paddingTop: "5px",
    width: "400px",
    height: "500px",
    border: "1px solid rgba(204, 85, 0, 0.75)",
    borderRadius: 30,
    backgroundColor: "rgba(112, 128, 144, 0.75)",
  },
  weatherDetectorDisplayv2: {
    paddingTop: "5px",
    width: "400px",
    height: "500px",
    border: "1px solid black",
    borderRadius: 30,
    backgroundColor: "gainsboro",
  },
  weatherDetectorDisplayTitleText: {
    margin: "auto",
    marginTop: "8px",
    marginBottom: "8px",
    paddingLeft: "4px",
    paddingRight: "4px",
    paddingBottom: "6px",
    height: "50px",
    paddingTop: "5px",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(0, 255, 255, 0.2)",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 7,
    fontFamily: "Cambria",
    fontWeight: "700",
    fontSize: 17,
  },
  weatherDetectorDisplayTitleTextv2: {
    margin: "auto",
    marginTop: "8px",
    marginBottom: "8px",
    paddingLeft: "4px",
    paddingRight: "4px",
    paddingBottom: "6px",
    height: "50px",
    paddingTop: "5px",
    borderRadius: 10,
    backgroundColor: "gainsboro",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 7,
    fontFamily: "Cambria",
    fontWeight: "700",
    fontSize: 17,
  },
  locationQueryDisplay: {
    position: "relative",
    top: "-12px",
    marginTop: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "50px",
  },
  weatherDataDisplay: {
    width: "100%",
    height: "380px",
    paddingLeft: "7px",
    paddingRight: "7px",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  weatherDataDisplayv2: {
    width: "100%",
    height: "380px",
    paddingLeft: "7px",
    paddingRight: "7px",
    justifyContent: "space-evenly",
    backgroundColor: "gainsboro",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  coordsView: {
    width: "100%",
    position: "absolute",
    top: "3px",
    flexDirection: "row",
    justifyContent: "center",
  },
  longCoordsText: {
    height: "12px",
    marginRight: "1px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "2px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "300",
    fontFamily: "OCR A Std, monospace",
  },
  longCoordsTextv2: {
    height: "12px",
    marginRight: "1px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "2px",
    backgroundColor: "gainsboro",
    color: "black",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "300",
    fontFamily: "OCR A Std, monospace",
  },
  latCoordsText: {
    height: "12px",
    marginLeft: "1px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "2px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "300",
    fontFamily: "OCR A Std, monospace",
  },
  latCoordsTextv2: {
    height: "12px",
    marginLeft: "1px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "2px",
    backgroundColor: "gainsboro",
    color: "black",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "300",
    fontFamily: "OCR A Std, monospace",
  },
  aboveTempView: { width: "100%", flexDirection: "row" },
  tempView: {
    width: "100%",
    border: "1px solid rgba(112, 128, 144, 0.75)",
    backgroundColor: "rgba(204, 85, 0, 0.5)",
  },
  tempViewv2: {
    width: "100%",
    border: "1px solid black",
    backgroundColor: "gainsboro",
  },
  belowTempView: { width: "100%", flexDirection: "row" },
  weatherTempTitleText: {
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "OCR A Std, monospace",
  },
  weatherTempTitleTextv2: {
    width: "100%",
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "OCR A Std, monospace",
  },
  weatherTempText: {
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowRadius: 10,
    fontSize: 75,
    fontWeight: "700",
    fontFamily: "OCR A Std, monospace",
  },
  weatherTempTextv2: {
    width: "100%",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 10,
    fontSize: 75,
    fontWeight: "700",
    fontFamily: "OCR A Std, monospace",
  },
  weatherFeelsLikeText: {
    width: "50%",
    height: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: "6px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    borderTopLeftRadius: 20,
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherFeelsLikeTextv2: {
    width: "50%",
    height: "30px",
    backgroundColor: "gainsboro",
    paddingTop: "6px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderTopLeftRadius: 20,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherMaxTempText: {
    width: "50%",
    height: "30px",
    paddingTop: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    borderBottomLeftRadius: 20,
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherMaxTempTextv2: {
    width: "50%",
    height: "30px",
    paddingTop: "4px",
    backgroundColor: "gainsboro",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderBottomLeftRadius: 20,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherMinTempText: {
    width: "50%",
    height: "30px",
    paddingTop: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    borderBottomRightRadius: 20,
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherMinTempTextv2: {
    width: "50%",
    height: "30px",
    paddingTop: "4px",
    backgroundColor: "gainsboro",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderBottomRightRadius: 20,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherHumidityText: {
    width: "50%",
    height: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: "6px",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    borderTopRightRadius: 20,
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
  weatherHumidityTextv2: {
    width: "50%",
    height: "30px",
    backgroundColor: "gainsboro",
    paddingTop: "6px",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderTopRightRadius: 20,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OCR A Std, monospace",
  },
});

export default WeatherDetector;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
