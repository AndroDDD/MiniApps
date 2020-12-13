import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { IconButton } from "@material-ui/core";
import {
  PostAddSharp,
  DeleteForeverSharp,
  HomeSharp,
} from "@material-ui/icons";
import { Formik, Form } from "formik";

import $ from "jquery";

import FormikField from "./FormikField";

import { localUrl } from "../../../../routes/routerBlock";

import "./TodoListStyles.scss";

interface FormValues {
  title: string;
  todo: string;
  doBy: string;
}

const HoldPage: React.FC = () => {
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
    mainDisplaySupportClass: `todoListDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForTodoList`,
    backToIndexPageButton: `backToIndexPageButtonForTodoList`,
    switchStylesButton: `switchStylesButtonForTodoList`,
    todoListDisplay: styles2.todoListDisplay,
    todoListHeader: styles2.todoListHeader,
    todoListHeaderTitle: styles2.todoListHeaderTitle,
    addTodoIconButton: `addTodoIconButton`,
    addTodoIcon: `addTodoIcon`,
    todoListItemsDisplay: styles2.todoListItemsDisplay,
    todoListItemsContainer: styles2.todoListItemsContainer,
    todoListItemView: styles2.todoListItemView,
    todoListItemsContainerStyleSupport: `listItemsContainerStyleSupport`,
    todoTitleText: styles2.todoTitleText,
    todoTodoText: styles2.todoTodoText,
    todoDoByText: styles2.todoDoByText,
    todoListItemDeleteButtonView: styles2.todoListItemDeleteButtonView,
    todoListItemDeleteButton: `todoListItemDeleteButton`,
    todoListItemDeleteButtonIcon: `todoListItemDeleteButtonIcon`,
    addTodoDisplay: styles2.addTodoDisplay,
    addTodoFormDisplay: styles2.addTodoFormDisplay,
    formSubmitButton: `formSubmitButton`,
  });

  // Declare variable for storing todo list items
  let date = new Date();
  const [todoList, setTodoList] = React.useState([
    {
      title: `Get Started`,
      todo: `Click on top right icon to add a new thing to do.`,
      doBy: `${date.toDateString()}`,
    },
  ]);

  // Declare variable for tracking current todo page
  const [todoPage, setTodoPage] = React.useState(`main`);

  // Declare variable for storing Todo Item List View
  const [todoItemsListView, setTodoItemsListView] = React.useState(<></>);

  // Declare variable holding new todo initial form values
  const initialFormValues = {
    title: ``,
    todo: ``,
    doBy: ``,
  };

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Declare function to add new todo item
  const handleTodoPost = (values: FormValues) => {
    let updatedTodoList = [...todoList];
    updatedTodoList.splice(0, 0, {
      title: values.title,
      todo: values.todo,
      doBy: values.doBy,
    });
    setTodoList(updatedTodoList);
    setTodoPage("main");
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

  // Handle todo list view update
  React.useEffect(() => {
    let configgedItemsViewHold = todoList.map((todo, index) => {
      let itemViewHold = (
        <View style={styles.todoListItemView}>
          <Text style={styles.todoTitleText}>{todo.title}</Text>
          <Text style={styles.todoTodoText}>{todo.todo}</Text>
          <Text style={styles.todoDoByText}>{todo.doBy}</Text>
          <View style={styles.todoListItemDeleteButtonView}>
            <IconButton className={styles.todoListItemDeleteButton}>
              <DeleteForeverSharp
                className={styles.todoListItemDeleteButtonIcon}
                onClick={() => {
                  let updatedTodoList = [...todoList];
                  updatedTodoList.splice(index, 1);
                  setTodoList(updatedTodoList);
                }}
              />
            </IconButton>
          </View>
        </View>
      );
      return itemViewHold;
    });
    let configgedTodoListViewHold = (
      <div className={styles.todoListItemsContainerStyleSupport}>
        <View style={styles.todoListItemsContainer}>
          {configgedItemsViewHold}
        </View>
      </div>
    );
    setTodoItemsListView(configgedTodoListViewHold);
  }, [todoList, styles]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `todoListDisplaySupportClass`,
          todoListDisplay: styles2.todoListDisplay,
          todoListHeaderTitle: styles2.todoListHeaderTitle,
          todoListItemView: styles2.todoListItemView,
          addTodoDisplay: styles2.addTodoDisplay,
          addTodoIconButton: `addTodoIconButton`,
          addTodoIcon: `addTodoIcon`,
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
          mainDisplaySupportClass: `todoListDisplaySupportClassv2`,
          todoListDisplay: styles2.todoListDisplayv2,
          todoListHeaderTitle: styles2.todoListHeaderTitlev2,
          todoListItemView: styles2.todoListItemViewv2,
          addTodoDisplay: styles2.addTodoDisplayv2,
          addTodoIconButton: `addTodoIconButtonv2`,
          addTodoIcon: `addTodoIconv2`,
          formSubmitButton: `formSubmitButtonv2`,
        };
      });
    }
  }, [kindOfStyle]);

  switch (todoPage) {
    case "main":
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
            <View style={styles.todoListDisplay}>
              <View style={styles.todoListHeader}>
                <Text style={styles.todoListHeaderTitle}>{`Todo List`}</Text>
                <IconButton
                  className={styles.addTodoIconButton}
                  onClick={() => {
                    setTodoPage(`addTodo`);
                  }}
                >
                  <PostAddSharp className={styles.addTodoIcon} />
                </IconButton>
              </View>
              <View style={styles.todoListItemsDisplay}>
                {todoItemsListView}
              </View>
            </View>
          </View>
        </div>
      );

    case "addTodo":
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
            <View style={styles.addTodoDisplay}>
              <View style={styles.todoListHeader}>
                <Text
                  style={styles.todoListHeaderTitle}
                >{`Add New Thing To Do`}</Text>
                <IconButton
                  className={styles.addTodoIconButton}
                  onClick={() => {
                    setTodoPage(`main`);
                  }}
                >
                  <HomeSharp className={styles.addTodoIcon} />
                </IconButton>
              </View>
              <View style={styles.addTodoFormDisplay}>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={handleTodoPost}
                >
                  {() => {
                    return (
                      <Form>
                        <FormikField
                          name={"title"}
                          label={"Title"}
                          required
                          kindOfStyle={kindOfStyle}
                        />
                        <FormikField
                          name={"todo"}
                          label={"What to do?"}
                          required
                          kindOfStyle={kindOfStyle}
                        />
                        <FormikField
                          name={"doBy"}
                          label={"Complete by?"}
                          required
                          kindOfStyle={kindOfStyle}
                        />
                        <View
                          style={{
                            position: "relative",
                            top: "100px",
                            marginTop: "20px",
                            alignItems: "center",
                          }}
                        >
                          <button
                            className={styles.formSubmitButton}
                            type={"submit"}
                          >
                            {"Save New To Do"}
                          </button>
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
          <Text>{`Sorry the code has directed you to default. You shouldn't be here.`}</Text>
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
  todoListDisplay: {
    margin: "auto",
    paddingBottom: "10px",
    width: "500px",
    height: "650px",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  todoListDisplayv2: {
    margin: "auto",
    paddingBottom: "10px",
    width: "500px",
    height: "650px",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  todoListHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "10%",
    paddingTop: "10px",
  },
  todoListHeaderTitle: {
    width: "80%",
    paddingTop: "15px",
    color: "rgba(255, 253, 208, 0.75)",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 7,
    fontSize: 20,
    fontWeight: "500",
  },
  todoListHeaderTitlev2: {
    width: "80%",
    paddingTop: "15px",
    color: "gainsboro",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 7,
    fontSize: 20,
    fontWeight: "500",
  },
  todoListItemsDisplay: {
    margin: "auto",
    width: "100%",
    height: "90%",
  },
  todoListItemsContainer: {
    width: "100%",
    height: "100%",
  },
  todoListItemView: {
    margin: "auto",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "10px",
    width: "80%",
    border: "1px solid rgba(255, 253, 208, 1)",
    backgroundColor: "rgba(255, 253, 208, 0.75)",
  },
  todoListItemViewv2: {
    margin: "auto",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "10px",
    width: "80%",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "gainsboro",
  },
  todoListItemDeleteButtonView: {
    position: "absolute",
    right: "0px",
  },
  todoTitleText: {
    marginTop: "5px",
    marginBottom: "5px",
    fontWeight: "700",
  },
  todoTodoText: {
    marginTop: "5px",
    marginBottom: "5px",
    fontWeight: "600",
  },
  todoDoByText: {
    marginTop: "5px",
    marginBottom: "5px",
    fontWeight: "500",
  },
  addTodoDisplay: {
    margin: "auto",
    paddingBottom: "10px",
    width: "500px",
    height: "auto",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "rgba(255, 253, 208, 0.75)",
  },
  addTodoDisplayv2: {
    margin: "auto",
    paddingBottom: "10px",
    width: "500px",
    height: "auto",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    backgroundColor: "gainsboro",
  },
  addTodoFormDisplay: {
    margin: "auto",
    width: "100%",
    height: "90%",
  },
});

export default HoldPage;
