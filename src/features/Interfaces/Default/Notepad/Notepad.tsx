import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { IconButton } from "@material-ui/core";
import { PostAddSharp, Home } from "@material-ui/icons";
import { Formik, Form } from "formik";

import $ from "jquery";

import FormikField from "./FormikField";

import "./NotepadStyles.scss";

interface FormValues {
  title: string;
  note: string;
}

const Notepad: React.FC = () => {
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

  // Declare variable state for holding notepad inserts
  const [notes, setNotes] = React.useState([
    {
      title: "Helper Note",
      note: `Fill out your own notes and update them. But be aware, every browser refresh gives your notepad amnesia!`,
    },
  ]);

  // Declare view state for manipulation
  const [availableNotesViewData, setAvailableNotesViewData] = React.useState(
    <></>
  );

  const [
    availableNotesButtonStatus,
    setAvailableNotesButtonStatus,
  ] = React.useState([{ hovered: false }]);

  // Declare variable tracking current notepad view
  const [notepadView, setNotepadView] = React.useState(`main`);

  // Declare variable tracking current note
  const [currentNote, setCurrentNote] = React.useState(0);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `notepadDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    notepadDisplay: styles2.notepadDisplay,
    notepadHeader: styles2.notepadHeader,
    headerTitleText: styles2.headerTitleText,
    addPostIconButton: `addPostIconButton`,
    addPostIcon: `addPostIcon`,
    availableNotesView: styles2.availableNotesView,
    availableNotesButtonsView: styles2.availableNotesButtonsView,
    availableNoteButton: `availableNoteButton`,
    availableNoteButtonText: styles2.availableNoteButtonText,
    availableNoteButtonTextHovered: styles2.availableNoteButtonTextHovered,
    addNoteView: styles2.addNoteView,
    homeIconButton: `homeIconButton`,
    homeIcon: `homeIcon`,
    formSubmitButton: `formSubmitButton`,
    tempNotesButtonsViewSupport: `tempNotesButtonsViewSupport`,
    reviewNoteView: styles2.reviewNoteView,
  });

  // Set initial values for form
  const initialFormValues = {
    title: ``,
    note: ``,
  };

  // Declare store state for form input values
  const [formInputValues, setFormInputValues] = React.useState({
    title: ``,
    note: ``,
  });

  // Handle submission of form
  const handleNotePost = (values: FormValues): void => {
    let updatedNotes = [...notes, { title: values.title, note: values.note }];
    setNotes(updatedNotes);
    setNotepadView(`main`);
  };

  // Handle updating reviewed note
  const handleNoteUpdate = (values: FormValues): void => {
    let fetchedNotes = [...notes];
    let updatedNote = { title: values.title, note: values.note };
    fetchedNotes.splice(currentNote, 1, updatedNote);
    setNotes(fetchedNotes);
    setNotepadView(`main`);
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

  // Handle available notes view update
  React.useEffect(() => {
    console.log(`available notes update initiated.!.`);
    let availButStatLength = availableNotesButtonStatus.length;
    let notesLength = notes.length;
    console.log({
      availButStatLength: availButStatLength,
      notesLength: notesLength,
    });
    if (availButStatLength < notesLength) {
      let tempButtonsStatusHold = notes.map((note) => {
        let statusHold = { hovered: false };
        return statusHold;
      });
      console.log({ status: tempButtonsStatusHold });
      setAvailableNotesButtonStatus(tempButtonsStatusHold);
    } else {
      let tempNotesButtonsHold = notes.map((note, index) => {
        let noteButtonConfig = (
          <button
            key={index}
            className={styles.availableNoteButton}
            onPointerOver={() => {
              console.log(`${index} note hovered.!.`);
              console.log({ availableNotesButtonStatus });

              setAvailableNotesButtonStatus(() => {
                const retrievedButtonsStatus = [...availableNotesButtonStatus];
                const updatedButtonsStatus = retrievedButtonsStatus.splice(
                  index,
                  1,
                  {
                    hovered: true,
                  }
                );
                console.log({ retrievedButtonsStatus });
                return retrievedButtonsStatus;
              });
            }}
            onPointerLeave={() => {
              console.log(`${index} note unhovered.!.`);
              setAvailableNotesButtonStatus(() => {
                const retrievedButtonsStatus = [...availableNotesButtonStatus];
                const updatedButtonsStatus = retrievedButtonsStatus.splice(
                  index,
                  1,
                  {
                    hovered: false,
                  }
                );

                return updatedButtonsStatus;
              });
            }}
            onClick={() => {
              setCurrentNote(index);
              setFormInputValues({ title: note.title, note: note.note });
              setNotepadView(`reviewNote`);
            }}
          >
            <Text
              style={
                availableNotesButtonStatus[index].hovered
                  ? styles.availableNoteButtonTextHovered
                  : styles.availableNoteButtonText
              }
            >
              {note.title}
            </Text>
          </button>
        );
        return noteButtonConfig;
      });
      let tempViewHold = (
        <div className={styles.tempNotesButtonsViewSupport}>
          <View style={styles.availableNotesButtonsView}>
            {tempNotesButtonsHold}
          </View>
        </div>
      );

      setAvailableNotesViewData(tempViewHold);
    }
  }, [notes, availableNotesButtonStatus]);

  switch (notepadView) {
    case `main`:
      return (
        <div
          className={styles.mainDisplaySupportClass}
          style={styles.mainDisplaySupportStyle}
        >
          <View style={styles.mainDisplay}>
            <View style={styles.notepadDisplay}>
              <View style={styles.notepadHeader}>
                <Text style={styles.headerTitleText}>{`Notepad`}</Text>
                <IconButton
                  className={styles.addPostIconButton}
                  onClick={() => {
                    setNotepadView(`addNote`);
                  }}
                >
                  <PostAddSharp className={styles.addPostIcon} />
                </IconButton>
              </View>
              <View style={styles.availableNotesView}>
                {availableNotesViewData}
              </View>
            </View>
          </View>
        </div>
      );

    case `addNote`:
      return (
        <div
          className={styles.mainDisplaySupportClass}
          style={styles.mainDisplaySupportStyle}
        >
          <View style={styles.mainDisplay}>
            <View style={styles.notepadDisplay}>
              <View style={styles.notepadHeader}>
                <Text style={styles.headerTitleText}>{`Add A Note`}</Text>
                <IconButton
                  className={styles.homeIconButton}
                  onClick={() => {
                    setNotepadView(`main`);
                  }}
                >
                  <Home className={styles.homeIcon} />
                </IconButton>
              </View>
              <View style={styles.addNoteView}>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={handleNotePost}
                >
                  {() => {
                    return (
                      <Form style={{ height: "100%" }}>
                        <FormikField
                          style={{
                            disableUnderline: true,
                          }}
                          name="title"
                          label=" TITLE"
                          required
                        />
                        <FormikField
                          style={{
                            disableUnderline: true,
                          }}
                          multiline={{
                            isMultilined: true,
                            initialNumberOfRows: 1,
                            maxNumberOfRows: 999,
                          }}
                          name="note"
                          label=" WHAT'S THE NOTE?"
                          required
                        />
                        <View style={{ position: "relative", top: "100px", alignItems: "center" }}>
                          <button
                            className={styles.formSubmitButton}
                            type={"submit"}
                          >{`SAVE NOTE`}</button>
                        </View>
                      </Form>
                    );
                  }}
                </Formik>
              </View>
            </View>
          </View>
        </div>
      );
    case `reviewNote`:
      return (
        <div
          className={styles.mainDisplaySupportClass}
          style={styles.mainDisplaySupportStyle}
        >
          <View style={styles.mainDisplay}>
            <View style={styles.notepadDisplay}>
              <View style={styles.notepadHeader}>
                <Text style={styles.headerTitleText}>{`Add A Note`}</Text>
                <IconButton
                  className={styles.homeIconButton}
                  onClick={() => {
                    setNotepadView(`main`);
                  }}
                >
                  <Home className={styles.homeIcon} />
                </IconButton>
              </View>
              <View style={styles.reviewNoteView}>
                <Formik
                  initialValues={formInputValues}
                  onSubmit={handleNoteUpdate}
                >
                  {() => {
                    return (
                      <Form style={{ height: "100%" }}>
                        <FormikField
                          style={{
                            disableUnderline: true,
                          }}
                          name="title"
                          label=" TITLE"
                          required
                        />
                        <FormikField
                          style={{
                            disableUnderline: true,
                          }}
                          multiline={{
                            isMultilined: true,
                            initialNumberOfRows: 1,
                            maxNumberOfRows: 999,
                          }}
                          name="note"
                          label=" WHAT'S THE NOTE?"
                          required
                        />
                        <View style={{ position: "relative", top: "100px", alignItems: "center" }}>
                          <button
                            className={styles.formSubmitButton}
                            type={"submit"}
                          >{`SAVE NOTE`}</button>
                        </View>
                      </Form>
                    );
                  }}
                </Formik>
              </View>
            </View>
          </View>
        </div>
      );

    default:
      return (
        <View>
          <Text>{`It is strange how you got here.!.`}</Text>
        </View>
      );
  }
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  notepadDisplay: {
    margin: "auto",
    width: "500px",
    height: "650px",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "rgba(112, 128, 144, 0.9)",
  },
  notepadHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "10%",
  },
  headerTitleText: {
    width: "80%",
    margin: "auto",
    color: "rgba(100, 216, 216, 0.75)",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
    fontSize: 20,
    fontWeight: "500",
  },
  availableNotesView: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  availableNotesButtonsView: {
    margin: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  availableNoteButtonText: {
    color: "rgba(255, 102, 204, 0.75)",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "700",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 3,
  },
  availableNoteButtonTextHovered: {
    color: "rgba(255, 102, 204, 0.75)",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "700",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 3,
  },
  addNoteView: {
    margin: "auto",
    width: "100%",
    height: "90%",
    overflow: "hidden",
  },
  reviewNoteView: {
    margin: "auto",
    width: "100%",
    height: "90%",
    overflow: "hidden",
  },
});

export default Notepad;
