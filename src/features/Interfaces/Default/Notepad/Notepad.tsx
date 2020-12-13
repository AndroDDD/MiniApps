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

import { localUrl } from "../../../../routes/routerBlock";

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
    headerBar: `headerBarForNotepad`,
    backToIndexPageButton: `backToIndexPageButtonForNotepad`,
    switchStylesButton: `switchStylesButtonForNotepad`,
    notepadDisplay: styles2.notepadDisplay,
    notepadDisplayEditMode: styles2.notepadDisplayEditMode,
    notepadHeader: styles2.notepadHeader,
    headerTitleText: styles2.headerTitleText,
    addPostIconButton: `addPostIconButton`,
    addPostIcon: `addPostIcon`,
    availableNotesView: styles2.availableNotesView,
    availableNotesButtonsView: styles2.availableNotesButtonsView,
    availableNoteButton: `availableNoteButton`,
    availableNoteButtonText: `availableNoteButtonText`,
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

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

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
            <div className={styles.availableNoteButtonText}>{note.title}</div>
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
  }, [notes, availableNotesButtonStatus, styles]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `notepadDisplaySupportClass`,
          notepadDisplay: styles2.notepadDisplay,
          notepadDisplayEditMode: styles2.notepadDisplayEditMode,
          headerTitleText: styles2.headerTitleText,
          availableNoteButtonText: `availableNoteButtonText`,
          addPostIcon: `addPostIcon`,
          homeIcon: `homeIcon`,
          availableNoteButton: `availableNoteButton`,
          formSubmitButton: `formSubmitButton`,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `notepadDisplaySupportClassv2`,
          notepadDisplay: styles2.notepadDisplayv2,
          notepadDisplayEditMode: styles2.notepadDisplayEditModev2,
          headerTitleText: styles2.headerTitleTextv2,
          availableNoteButtonText: `availableNoteButtonTextv2`,
          addPostIcon: `addPostIconv2`,
          homeIcon: `homeIconv2`,
          availableNoteButton: `availableNoteButtonv2`,
          formSubmitButton: `formSubmitButtonv2`,
        };
      });
    }
  }, [kindOfStyle]);

  switch (notepadView) {
    case `main`:
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
            <View style={styles.notepadDisplayEditMode}>
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
                      <Form>
                        <FormikField
                          style={{
                            disableUnderline: true,
                          }}
                          name="title"
                          label=" TITLE"
                          required
                          kindOfStyle={kindOfStyle}
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
                          kindOfStyle={kindOfStyle}
                        />
                        <View
                          style={{
                            position: "relative",
                            top: "28px",
                            alignItems: "center",
                          }}
                        >
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
            <View style={styles.notepadDisplayEditMode}>
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
                          kindOfStyle={kindOfStyle}
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
                          kindOfStyle={kindOfStyle}
                        />
                        <View
                          style={{
                            position: "relative",
                            top: "28px",
                            alignItems: "center",
                          }}
                        >
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
          <div className={styles.headerBar}>
            <div
              className={styles.backToIndexPageButton}
              onClick={() => {
                window.location.href = `${localUrl}`;
              }}
            >{`Back To Idex Page`}</div>
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
  notepadDisplayv2: {
    margin: "auto",
    width: "500px",
    height: "650px",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "gainsboro",
  },
  notepadDisplayEditMode: {
    margin: "auto",
    width: "500px",
    height: "auto",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "rgba(112, 128, 144, 0.9)",
  },
  notepadDisplayEditModev2: {
    margin: "auto",
    width: "500px",
    height: "auto",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "gainsboro",
  },
  notepadHeader: {
    position: "relative",
    left: "50px",
    flexDirection: "row",
    justifyContent: "center",
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
  headerTitleTextv2: {
    width: "80%",
    margin: "auto",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(112, 128, 144, 0.75)",
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
    justifyContent: "flex-start",
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
