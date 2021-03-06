import React from "react";
import { View, StyleSheet } from "react-native";
import { TextField } from "@material-ui/core";
import { Field, ErrorMessage } from "formik";
import cx from "classnames";

interface FormikFieldInterface {
  name: string;
  label: string;
  type?: string;
  style?: any;
  multiline?: {
    isMultilined: boolean;
    initialNumberOfRows: number;
    maxNumberOfRows: number;
  };
  required: boolean;
  kindOfStyle: string;
}

const FormikField: React.FC<FormikFieldInterface> = ({
  label,
  name,
  type = "text",
  style,
  multiline,
  required = false,
  kindOfStyle,
}) => {
  // Declare stylesheet for mutation
  const [styles, setStyles] = React.useState({
    fieldDisplay: styles2.fieldDisplay,
  });

  // Handle return view for component
  return (
    <View style={styles.fieldDisplay}>
      <Field
        required={required}
        autoComplete="off"
        as={TextField}
        inputProps={{
          style: {
            paddingLeft: "10px",
            paddingRight: "10px",
            backgroundColor:
              kindOfStyle === `colorful` ? "rgba(0, 0, 0, 0.5)" : "gainsboro",
            color:
              kindOfStyle === `colorful`
                ? "rgba(255, 253, 208, 1)"
                : "rgba(0, 0, 0, 1)",
          },
        }}
        InputProps={style}
        InputLabelProps={{
          style: {
            color:
              kindOfStyle === `colorful`
                ? "rgba(255, 253, 208, 1)"
                : "rgba(0, 0, 0, 1)",
            paddingLeft: "5px",
            textShadow: "0px 0px 3px rgba(0, 0, 0, 0.75)",
          },
        }}
        multiline={multiline?.isMultilined}
        rows={multiline?.initialNumberOfRows}
        rowsMax={multiline?.maxNumberOfRows}
        label={label}
        name={name}
        fullWidth
        type={type}
        helperText={<ErrorMessage name={name} />}
      />
    </View>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  fieldDisplay: {
    position: "relative",
    top: "-18px",
  },
});

export default FormikField;
