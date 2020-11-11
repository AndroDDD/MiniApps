import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik, Form } from "formik";
import { IconButton } from "@material-ui/core";
import { ArrowBack, PostAddSharp } from "@material-ui/icons";

import $ from "jquery";

import "./NotePadStyles.scss";

interface notePadFormValues {
  title: string;
  note: string;
}

export const MobileNotePad: React.FC = () => {
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

  // Declare variable storing form initial state
  const [formNoteValues, setFormNoteValues] = React.useState({
    title: ``,
    note: ``,
  });

  // Handle component return view
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
        formViewSupport: {
          ...styles.formViewSupport,
          width: screenWidth,
          height: screenHeight * 90 * 0.01,
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
    notePadHomeButton: `notePadHomeButton`,
    notePadHomeIcon: `notePadHomeIcon`,
    savedNotesView: styles2.savedNotesView,
    savedNoteView: styles2.savedNoteView,
    formView: styles2.formView,
    formViewSupport: { width: screenWidth, height: screenHeight * 90 * 0.01 },
    formInputTitle: `formInputTitle`,
    formInputTitleLabel: styles2.formInputTitleLabel,
    formInputNote: `formInputNote`,
    formInputNoteLabel: styles2.formInputNoteLabel,
    formSubmitButton: `formSubmitButton`,
    genericText: styles2.genericText,
  });

  // Declare variable handling current notepad view
  const [notePadView, setNotePadView] = React.useState(`main`);

  // Declare variable handling selected note
  const [selectedNote, setSelectedNote] = React.useState(0);
  // Declare variable holding saved notes
  const [notes, setNotes] = React.useState([
    {
      title: `Helper Note`,
      note: `Type in your new note and press the save button. Viola!`,
    },
  ]);

  // Declare variables holding input values
  const [inputTitleValue, setInputTitleValue] = React.useState(``);
  const [inputNoteValue, setInputNoteValue] = React.useState(``);

  // Handle component return view
  switch (notePadView) {
    case `main`:
      return (
        <ImageBackground
          source={{
            uri:
              "http://4.bp.blogspot.com/-6dJnOVtK2Mw/UTcaydsAb0I/AAAAAAAABEc/jvwhj-yv_0g/s1600/DSC_0017.JPG",
          }}
          imageStyle={{ resizeMode: "cover" }}
          style={styles.backgroundImage}
        >
          <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
            <View style={styles.mainHeader}>
              <IconButton
                className={styles.notePadHomeButton}
                onClick={() => {
                  setNotePadView(`newNote`);
                }}
              >
                <PostAddSharp className={styles.notePadHomeIcon} />
              </IconButton>
              <View style={styles.mainHeaderTitleView}>
                <Text style={styles.mainHeaderTitle}>{`SAVED NOTES`}</Text>
              </View>
            </View>
            <View style={styles.savedNotesView}>
              {notes.map((note, index) => {
                return (
                  <View style={styles.savedNoteView}>
                    <button
                      onClick={(event) => {
                        setSelectedNote(index);
                        setFormNoteValues({
                          title: note.title,
                          note: note.note,
                        });
                        setInputTitleValue(note.title);
                        setInputNoteValue(note.note);
                        setNotePadView(`updateNote`);
                      }}
                    >
                      <Text>{note.title}</Text>
                    </button>
                  </View>
                );
              })}
            </View>
          </View>
        </ImageBackground>
      );
    case `newNote`:
      return (
        <ImageBackground
          source={{
            uri:
              "http://4.bp.blogspot.com/-6dJnOVtK2Mw/UTcaydsAb0I/AAAAAAAABEc/jvwhj-yv_0g/s1600/DSC_0017.JPG",
          }}
          imageStyle={{ resizeMode: "cover" }}
          style={styles.backgroundImage}
        >
          <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
            <View style={styles.mainHeader}>
              <IconButton
                className={styles.notePadHomeButton}
                onClick={() => {
                  setNotePadView(`main`);
                }}
              >
                <ArrowBack className={styles.notePadHomeIcon} />
              </IconButton>
              <View style={styles.mainHeaderTitleView}>
                <Text style={styles.mainHeaderTitle}>{`ADD A NOTE`}</Text>
              </View>
            </View>
            <Formik
              initialValues={formNoteValues}
              onSubmit={(values) => {
                let updatedNotes = [...notes];
                let configgedValues = {
                  title: inputTitleValue,
                  note: inputNoteValue,
                };
                updatedNotes.push(configgedValues);
                setNotes(updatedNotes);
                console.log(updatedNotes);
                setNotePadView(`main`);
              }}
            >
              <Form>
                <View style={[styles.formView, styles.formViewSupport]}>
                  <Text style={styles.formInputTitleLabel}>{`TITLE`}</Text>
                  <input
                    name={`title`}
                    placeholder={formNoteValues.title}
                    className={styles.formInputTitle}
                    onChange={(event) => {
                      setInputTitleValue(event.currentTarget.value);
                    }}
                  />
                  <Text style={styles.formInputNoteLabel}>{`NOTE`}</Text>
                  <input
                    name={`note`}
                    placeholder={formNoteValues.note}
                    className={styles.formInputNote}
                    onChange={(event) => {
                      setInputNoteValue(event.currentTarget.value);
                    }}
                  />
                  <button
                    className={styles.formSubmitButton}
                    type={`submit`}
                  >{`SAVE`}</button>
                </View>
              </Form>
            </Formik>
          </View>
        </ImageBackground>
      );
    case `updateNote`:
      return (
        <ImageBackground
          source={{
            uri:
              "http://4.bp.blogspot.com/-6dJnOVtK2Mw/UTcaydsAb0I/AAAAAAAABEc/jvwhj-yv_0g/s1600/DSC_0017.JPG",
          }}
          imageStyle={{ resizeMode: "cover" }}
          style={styles.backgroundImage}
        >
          <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
            <View style={styles.mainHeader}>
              <IconButton
                className={styles.notePadHomeButton}
                onClick={() => {
                  setNotePadView(`main`);
                }}
              >
                <ArrowBack className={styles.notePadHomeIcon} />
              </IconButton>
              <View style={styles.mainHeaderTitleView}>
                <Text style={styles.mainHeaderTitle}>{`UPDATE NOTE`}</Text>
              </View>
            </View>
            <Formik
              initialValues={formNoteValues}
              onSubmit={(values) => {
                let updatedNotes = [...notes];
                let configgedValues = {
                  title: inputTitleValue,
                  note: inputNoteValue,
                };
                updatedNotes.push(configgedValues);
                setNotes(updatedNotes);
                console.log(updatedNotes);
                setFormNoteValues({ title: ``, note: `` });
                setNotePadView(`main`);
              }}
            >
              <Form>
                <View style={[styles.formView, styles.formViewSupport]}>
                  <Text style={styles.formInputTitleLabel}>{`TITLE`}</Text>
                  <input
                    name={`title`}
                    className={styles.formInputTitle}
                    value={formNoteValues.title}
                    onChange={(event) => {
                      setFormNoteValues({
                        ...formNoteValues,
                        title: event.currentTarget.value,
                      });
                      setInputTitleValue(event.currentTarget.value);
                    }}
                  />
                  <Text style={styles.formInputNoteLabel}>{`NOTE`}</Text>
                  <input
                    name={`note`}
                    className={styles.formInputNote}
                    value={formNoteValues.note}
                    onChange={(event) => {
                      setFormNoteValues({
                        ...formNoteValues,
                        note: event.currentTarget.value,
                      });
                      setInputNoteValue(event.currentTarget.value);
                    }}
                  />
                  <button
                    className={styles.formSubmitButton}
                    type={`submit`}
                  >{`SAVE`}</button>
                </View>
              </Form>
            </Formik>
          </View>
        </ImageBackground>
      );
    default:
      return (
        <View>
          <Text>{`.!.You shouldnt be here.!.`}</Text>
        </View>
      );
  }
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowX: "hidden",
  },
  mainHeader: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
  },
  mainHeaderTitleView: {
    position: "absolute",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: -5,
  },
  mainHeaderTitle: {
    textAlign: "center",
    textShadowColor: "rgba(0, 255, 255, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  savedNotesView: {
    width: "100%",
  },
  savedNoteView: {
    width: "100%",
    backgroundColor: "whitesmoke",
  },
  formView: {},
  formInputTitleLabel: {
    height: "7%",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "whitesmoke",
    textAlign: "center",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  formInputNoteLabel: {
    height: "7%",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "whitesmoke",
    textAlign: "center",
    textShadowColor: "cyan",
    textShadowRadius: 3,
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
});
