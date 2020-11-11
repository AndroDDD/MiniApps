import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik, Form, Field } from "formik";

import $ from "jquery";

import "./MobilePasswordGeneratorStyles.scss";

interface passwordGeneratorValues {
  passwordLength: number;
  uppercaseLetters: boolean;
  lowercaseLetters: boolean;
  addNumbers: boolean;
  addSymbols: boolean;
}

const MobilePasswordGenerator: React.FC = () => {
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
        passwordOptionsViewSupport: {
          ...styles.passwordOptionsViewSupport,
          width: screenWidth,
          height: screenHeight * 70 * 0.01,
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
    mainHeader: styles2.mainHeader,
    mainHeaderTitleView: styles2.mainHeaderTitleView,
    mainHeaderTitle: styles2.mainHeaderTitle,
    passwordOptionsView: styles2.passwordOptionsView,
    passwordOptionsViewSupport: {
      width: screenWidth,
      height: screenHeight * 70 * 0.01,
    },
    passwordOptionContainer: styles2.passwordOptionContainer,
    passwordLengthOption: `passwordLengthOption`,
    passwordLengthOptionLabel: styles2.passwordLengthOptionLabel,
    passwordOptionsSubmitButtonView: styles2.passwordOptionsSubmitButtonView,
    uppercaseOption: `uppercaseOption`,
    uppercaseOptionLabel: styles2.uppercaseOptionLabel,
    lowercaseOption: `lowercaseOption`,
    lowercaseOptionLabel: styles2.lowercaseOptionLabel,
    addNumbersOption: `addNumbersOption`,
    addNumbersOptionLabel: styles2.addNumbersOptionLabel,
    addSymbolsOption: `addSymbolsOptions`,
    generatedPasswordView: styles2.generatedPasswordView,
    addSymbolsOptionLabel: styles2.addSymbolsOptionLabel,
    generatedPasswordText: styles2.generatedPasswordText,
    passwordOptionsSubmitButton: `passwordOptionsSubmitButton`,
    genericText: styles2.genericText,
  });

  // Declare variable holding initial password options values
  const [initialOptions, setInitialOptions] = React.useState({
    passwordLength: 0,
    uppercaseLetters: false,
    lowercaseLetters: false,
    addNumbers: false,
    addSymbols: false,
  });

  // Declare variable for password generator values library
  const [
    passwordGeneratorValuesLibrary,
    setPasswordGeneratorValuesLibrary,
  ] = React.useState({
    uppercaseLetters: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
    lowercaseLetters: `abscdefghijklmnopqrstuvqwxyz`,
    numbers: `0123456789`,
    symbols: `!@#$%^&*()_+=`,
  });

  // Declare variable holding password data
  const [generatedPassword, setGeneratedPassword] = React.useState(``);

  // Declare functions for generating various password values
  const getUppercase = () => {
    const newUppercase =
      passwordGeneratorValuesLibrary.uppercaseLetters[
        Math.floor(
          Math.random() * passwordGeneratorValuesLibrary.uppercaseLetters.length
        )
      ];
    return newUppercase;
  };

  const getLowercase = () => {
    const newLowercase =
      passwordGeneratorValuesLibrary.lowercaseLetters[
        Math.floor(
          Math.random() * passwordGeneratorValuesLibrary.lowercaseLetters.length
        )
      ];
    return newLowercase;
  };

  const getNumber = () => {
    const newNumber =
      passwordGeneratorValuesLibrary.numbers[
        Math.floor(
          Math.random() * passwordGeneratorValuesLibrary.numbers.length
        )
      ];
    return newNumber;
  };

  const getSymbol = () => {
    const newSymbol =
      passwordGeneratorValuesLibrary.symbols[
        Math.floor(
          Math.random() * passwordGeneratorValuesLibrary.symbols.length
        )
      ];
    return newSymbol;
  };

  // Declare function for creating password
  const createPassword = (values: passwordGeneratorValues) => {
    console.log({ formValues: values });
    console.log(`Generating password.`);
    console.log({
      createdUppercase: getUppercase(),
      createdLowercase: getLowercase(),
      createdNumber: getNumber(),
      createdSymbol: getSymbol(),
    });

    let tempGeneratedPasswordValues = [];
    let passwordValueTypesOptions: Array<number> = [];
    let passwordValueTypesOptionsConfiguring = [
      values.uppercaseLetters,
      values.lowercaseLetters,
      values.addNumbers,
      values.addSymbols,
    ].forEach((value, index) => {
      if (value) {
        return passwordValueTypesOptions.push(index);
      }
    });
    console.log({ generatedPasswordOptions: passwordValueTypesOptions });
    let passwordLengthNumber = values.passwordLength;
    let passwordValueTypesOptionsLength = passwordValueTypesOptions.length;
    console.log({ passwordLengthNumber });
    for (let i = 0; i < passwordLengthNumber; i++) {
      let randomValueSelection = Math.floor(
        Math.random() * Math.floor(passwordValueTypesOptionsLength)
      );
      let valueType = passwordValueTypesOptions[randomValueSelection];
      console.log({ valueTypeToGenerate: valueType });
      if (valueType === 0) {
        let generatedUppercase = getUppercase();
        tempGeneratedPasswordValues.push(generatedUppercase);
      } else if (valueType === 1) {
        let generatedLowercase = getLowercase();
        tempGeneratedPasswordValues.push(generatedLowercase);
      } else if (valueType === 2) {
        let generatedNumber = getNumber();
        tempGeneratedPasswordValues.push(generatedNumber);
      } else if (valueType === 3) {
        let generatedSymbol = getSymbol();
        tempGeneratedPasswordValues.push(generatedSymbol);
      }
    }

    let tempGeneratedPassword = tempGeneratedPasswordValues.join("");

    console.log({ generatedPassword: tempGeneratedPassword });
    setGeneratedPassword(tempGeneratedPassword);
  };

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "https://www.privateinternetaccess.com/blog/wp-content/uploads/2018/11/encryption-1024x538.jpg?x55504",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderTitleView}>
            <Text style={styles.mainHeaderTitle}>{`¡PASSWORD GENERATOR!`}</Text>
          </View>
        </View>
        <Formik initialValues={initialOptions} onSubmit={createPassword}>
          {(formikProps) => (
            <Form>
              <View
                style={[
                  styles.passwordOptionsView,
                  styles.passwordOptionsViewSupport,
                ]}
              >
                <View style={styles.passwordOptionContainer}>
                  <Text
                    style={styles.passwordLengthOptionLabel}
                  >{`Password Length:`}</Text>
                  <Field
                    name={`passwordLength`}
                    type={`number`}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.passwordLength}
                    className={styles.passwordLengthOption}
                  />
                </View>
                <View style={styles.passwordOptionContainer}>
                  <Text
                    style={styles.uppercaseOptionLabel}
                  >{`Include Uppercase Letters:`}</Text>
                  <Field
                    name={`uppercaseLetters`}
                    type={"checkbox"}
                    onChange={formikProps.handleChange}
                    className={styles.uppercaseOption}
                  />
                </View>
                <View style={styles.passwordOptionContainer}>
                  <Text
                    style={styles.lowercaseOptionLabel}
                  >{`Include Lowercase Letters:`}</Text>
                  <Field
                    name={`lowercaseLetters`}
                    type={`checkbox`}
                    onChange={formikProps.handleChange}
                    className={styles.lowercaseOption}
                  />
                </View>
                <View style={styles.passwordOptionContainer}>
                  <Text
                    style={styles.addNumbersOptionLabel}
                  >{`Include Numbers:`}</Text>
                  <Field
                    name={`addNumbers`}
                    type={`checkbox`}
                    onChange={formikProps.handleChange}
                    className={styles.addNumbersOption}
                  />
                </View>
                <View style={styles.passwordOptionContainer}>
                  <Text
                    style={styles.addSymbolsOptionLabel}
                  >{`Include Symbols:`}</Text>
                  <Field
                    name={`addSymbols`}
                    type={`checkbox`}
                    onChange={formikProps.handleChange}
                    className={styles.addSymbolsOption}
                  />
                </View>
              </View>
              <View style={styles.passwordOptionsSubmitButtonView}>
                <button
                  className={styles.passwordOptionsSubmitButton}
                  type={`submit`}
                >{`GENERATE`}</button>
              </View>
            </Form>
          )}
        </Formik>
        <View style={styles.generatedPasswordView}>
          <Text style={styles.generatedPasswordText}>{generatedPassword}</Text>
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
    overflow: "hidden",
  },
  mainHeader: {
    position: "relative",
    top: "0%",
    flexDirection: "row",
    width: "100%",
    height: "10%",
  },
  mainHeaderTitleView: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  mainHeaderTitle: {
    textAlign: "center",
    textShadowColor: "rgba(0, 255, 255, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  passwordOptionsView: {
    position: "relative",
    top: "0%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  passwordOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 255, 255, 1)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0, 255, 255, 1)",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "100%",
    height: "18%",
  },
  passwordOptionsSubmitButtonView: {
    width: "100%",
    height: "10%",
  },
  passwordLengthOptionLabel: {
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontFamily: "Consolas",
    fontSize: 25,
    fontWeight: "700",
  },
  uppercaseOptionLabel: {
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontFamily: "Consolas",
    fontSize: 25,
    fontWeight: "700",
  },
  lowercaseOptionLabel: {
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontFamily: "Consolas",
    fontSize: 25,
    fontWeight: "700",
  },
  addNumbersOptionLabel: {
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontFamily: "Consolas",
    fontSize: 25,
    fontWeight: "700",
  },
  addSymbolsOptionLabel: {
    color: "rgba(112, 128, 144, 0)",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontFamily: "Consolas",
    fontSize: 25,
    fontWeight: "700",
  },
  generatedPasswordView: {
    position: "relative",
    bottom: "0%",
    width: "100%",
    height: "20%",
    justifyContent: "flex-start",

    overflow: "scroll",
  },
  generatedPasswordText: {
    width: "100%",
    height: "100%",
    paddingBottom: "15%",
    color: "rgba(112, 128, 144, 1)",
    textAlign: "center",
    textShadowRadius: 1,
    textShadowColor: "whitesmoke",
    fontFamily: "Consolas",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 10,
    lineHeight: 20,
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
});

export default MobilePasswordGenerator;
