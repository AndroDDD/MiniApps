import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import $ from "jquery";
import { Formik, Form, Field, FieldProps } from "formik";
import { TextField } from "@material-ui/core";
import "./PasswordGeneratorStyles.scss";

interface passwordGeneratorValues {
  passwordLength: string;
  uppercaseLetters: boolean;
  lowercaseLetters: boolean;
  addNumbers: boolean;
  addSymbols: boolean;
}

const PasswordGenerator: React.FC = () => {
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
    mainDisplaySupportClass: `passwordGeneratorPageDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    passwordGeneratorDisplay: styles2.passwordGeneratorDisplay,
    passwordFormText: styles2.passwordFormText,
    formDisplay: styles2.formDisplay,
    formLabel: `formLabel`,
    generateButton: `generateButton`,
    generatedPasswordDisplay: styles2.generatedPasswordDisplay,
    generatedPasswordText: styles2.generatedPasswordText,
  });

  // Declare initial form data
  const [initialValues, setInitialValues] = React.useState({
    passwordLength: `0`,
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

  // Declare variable holding passwordLength
  const [passwordLength, setPasswordLength] = React.useState(`0`);

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
    console.log({ formValues: values, passwordLength: passwordLength });
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
    let passwordLengthNumber = Number(passwordLength);
    let passwordValueTypesOptionsLength = passwordValueTypesOptions.length;

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

  return (
    <div
      className={styles.mainDisplaySupportClass}
      style={styles.mainDisplaySupportStyle}
    >
      <View style={styles.mainDisplay}>
        <View style={styles.passwordGeneratorDisplay}>
          <Text
            style={{
              margin: "auto",
              paddingLeft: "5px",
              paddingRight: "5px",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(112, 128, 144, 0.75)",
              borderRadius: 25,
              backgroundColor: "rgba(0, 0, 255, 0.5)",
              color: "rgba(0, 255, 50, 0.5)",
              textAlign: "center",
              textShadowColor: "rgba(255, 0, 0, 0.75)",
              textShadowRadius: 5,
              fontSize: 17,
              fontWeight: "600",
              fontFamily: "Comic Sans MS",
            }}
          >{`PASSWORD GENERATOR`}</Text>
          <Formik initialValues={initialValues} onSubmit={createPassword}>
            {() => {
              return (
                <Form>
                  <View style={styles.formDisplay}>
                    <label className={styles.formLabel}>
                      <Text style={styles.passwordFormText}>
                        {"Length Of Password"}
                      </Text>
                      <Field
                        name={"passwordLength"}
                        component={TextInput}
                        style={{
                          width: "60px",
                          backgroundColor: "rgba(112, 128, 144, 0.75)",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                        onChange={(event: { target: { value: any } }) => {
                          let capturedValue = event.target.value;
                          setPasswordLength(capturedValue);
                          console.log({
                            passwordLengthInputValue: capturedValue,
                          });
                        }}
                      />
                    </label>
                    <label className={styles.formLabel}>
                      <Text style={styles.passwordFormText}>
                        {"Contain Upper-case Letters"}
                      </Text>
                      <Field
                        name={`uppercaseLetters`}
                        render={({ field }: FieldProps) => (
                          <input
                            {...field}
                            type={"checkbox"}
                            checked={field.value}
                            onClick={(event) => {
                              let capturedValue = event.currentTarget.value;
                              console.log({
                                eventValue: capturedValue,
                              });
                            }}
                          />
                        )}
                      />
                    </label>
                    <label className={styles.formLabel}>
                      <Text style={styles.passwordFormText}>
                        {"Contain Lower-case Letters"}
                      </Text>
                      <Field
                        name={`lowercaseLetters`}
                        render={({ field }: FieldProps) => (
                          <input
                            {...field}
                            type={"checkbox"}
                            checked={field.value}
                          />
                        )}
                      />
                    </label>
                    <label className={styles.formLabel}>
                      <Text style={styles.passwordFormText}>
                        {"Contain Numbers"}
                      </Text>
                      <Field
                        name={"addNumbers"}
                        render={({ field }: FieldProps) => (
                          <input
                            {...field}
                            type={"checkbox"}
                            checked={field.value}
                          />
                        )}
                      />
                    </label>
                    <label className={styles.formLabel}>
                      <Text style={styles.passwordFormText}>
                        {"Contain Symbols"}
                      </Text>
                      <Field
                        name={"addSymbols"}
                        render={({ field }: FieldProps) => (
                          <input
                            {...field}
                            type={"checkbox"}
                            checked={field.value}
                          />
                        )}
                      />
                    </label>
                    <button
                      className={styles.generateButton}
                      type={"submit"}
                    >{`GENERATE`}</button>
                  </View>
                </Form>
              );
            }}
          </Formik>
        </View>
        <View style={styles.generatedPasswordDisplay}>
          <Text style={styles.generatedPasswordText}>{generatedPassword}</Text>
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  passwordGeneratorDisplay: {
    height: "360px",
    paddingTop: "10px",
    border: "1px solid rgba(112, 128, 144, 0.75)",
    borderRadius: 50,
    backgroundColor: "black",
    overflow: "hidden",
  },
  passwordFormText: {
    color: "green",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 5,
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "Comic Sans MS",
  },
  formDisplay: {
    position: "relative",
    top: "5px",
    paddingLeft: "20px",
    paddingRight: "20px",
    justifyContent: "space-evenly",
    width: "500px",
    height: "320px",
  },
  generatedPasswordDisplay: {
    position: "relative",
    top: "30px",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    height: "75px",
    backgroundColor: "black",
    border: "1px solid rgba(112, 128, 144, 0.75)",
    borderRadius: 50,
  },
  generatedPasswordText: {
    width: "425px",
    height: "35px",
    color: "rgba(112, 128, 144, 1.0)",
    overflow: "hidden",
    textAlign: "center",
    fontSize: 27,
    fontWeight: "500",
    fontFamily: "Comic Sans MS",
  },
});

export default PasswordGenerator;

/**  Another window resize suggestion
 * <canvas
 * width={window.innerWidth}
 * height={window.innerHeight}
 * ></canvas
 * */
