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

import { localUrl } from "../../../../routes/routerBlock";

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
    headerBar: `headerBarForNotePad`,
    backToIndexPageButton: `backToIndexPageButtonForNotePad`,
    switchStylesButton: `switchStylesButtonForNotePad`,
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

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainHeaderTitle: styles2.mainHeaderTitle,
          notePadHomeButton: `notePadHomeButton`,
          notePadHomeIcon: `notePadHomeIcon`,
          savedNoteView: styles2.savedNoteView,
          formInputTitleLabel: styles2.formInputTitleLabel,
          formInputNote: `formInputNote`,
          formInputNoteLabel: styles2.formInputNoteLabel,
          formSubmitButton: `formSubmitButton`,
          genericText: styles2.genericText,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainHeaderTitle: styles2.mainHeaderTitlev2,
          notePadHomeButton: `notePadHomeButtonv2`,
          notePadHomeIcon: `notePadHomeIconv2`,
          savedNoteView: styles2.savedNoteViewv2,
          formInputTitleLabel: styles2.formInputTitleLabelv2,
          formInputNote: `formInputNotev2`,
          formInputNoteLabel: styles2.formInputNoteLabelv2,
          formSubmitButton: `formSubmitButtonv2`,
          genericText: styles2.genericTextv2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle component return view
  switch (notePadView) {
    case `main`:
      return (
        <ImageBackground
          source={{
            uri:
              kindOfStyle === `colorful`
                ? "http://4.bp.blogspot.com/-6dJnOVtK2Mw/UTcaydsAb0I/AAAAAAAABEc/jvwhj-yv_0g/s1600/DSC_0017.JPG"
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4c+fOfwAIwAOUHj6BoQAAAABJRU5ErkJggg==",
          }}
          imageStyle={{ resizeMode: "cover" }}
          style={styles.backgroundImage}
        >
          <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
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
              kindOfStyle === `colorful`
                ? "http://4.bp.blogspot.com/-6dJnOVtK2Mw/UTcaydsAb0I/AAAAAAAABEc/jvwhj-yv_0g/s1600/DSC_0017.JPG"
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4c+fOfwAIwAOUHj6BoQAAAABJRU5ErkJggg==",
          }}
          imageStyle={{ resizeMode: "cover" }}
          style={styles.backgroundImage}
        >
          <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
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
              kindOfStyle === `colorful`
                ? "http://4.bp.blogspot.com/-6dJnOVtK2Mw/UTcaydsAb0I/AAAAAAAABEc/jvwhj-yv_0g/s1600/DSC_0017.JPG"
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4c+fOfwAIwAOUHj6BoQAAAABJRU5ErkJggg==",
          }}
          imageStyle={{ resizeMode: "cover" }}
          style={styles.backgroundImage}
        >
          <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
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
    paddingTop: "1%",
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
  mainHeaderTitlev2: {
    textAlign: "center",
    textShadowColor: "gainsboro",
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
  savedNoteViewv2: {
    width: "100%",
    backgroundColor: "gainsboro",
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
  formInputTitleLabelv2: {
    height: "7%",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "black",
    textAlign: "center",
    textShadowColor: "silver",
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
  formInputNoteLabelv2: {
    height: "7%",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "black",
    textAlign: "center",
    textShadowColor: "silver",
    textShadowRadius: 3,
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
  genericTextv2: {
    color: "black",
    textAlign: "center",
  },
});
