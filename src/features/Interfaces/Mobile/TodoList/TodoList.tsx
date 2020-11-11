import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik, Form, Field } from "formik";
import { IconButton } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import $ from "jquery";

import "./TodoListStyles.scss";

const MobileTodoList: React.FC = () => {
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
        formSupport: { width: screenWidth, height: screenHeight * 45 * 0.01 },
      };
      return updatedSizes;
    });
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupport: { width: "100%", height: screenHeight },
    mainHeader: styles2.mainHeader,
    mainHeaderTitleView: styles2.mainHeaderTitleView,
    mainHeaderTitle: styles2.mainHeaderTitle,
    formSupport: { width: screenWidth, height: screenHeight * 45 * 0.01 },
    todoFormView: styles2.todoFormView,
    todoFormFooterView: styles2.todoFormFooterView,
    todoFormHeaderView: styles2.todoFormHeaderView,
    newTodoButton: `newTodoButton`,
    newTodoButtonIcon: `newTodoButtonIcon`,
    todoTitleInput: `todoTitleInput`,
    todoInput: `todoInput`,
    todoSaveButton: `todoSaveButton`,
    todoCompleteByInput: `todoCompleteByInput`,
    todoListView: styles2.todoListView,
    todoItemView: styles2.todoItemView,
    todoItemSubjectView: styles2.todoItemSubjectView,
    todoItemTitleText: styles2.todoItemTitleText,
    todoItemCompleteByText: styles2.todoItemCompleteByText,
    todoItemEditButtonView: styles2.todoItemEditButtonView,
    todoItemEditButton: `todoItemEditButton`,
    todoItemEditButtonIcon: `todoItemEditButtonIcon`,
    backgroundImage: { width: "100", height: screenHeight },
    genericText: styles2.genericText,
  });

  // Declare variable holding form data
  const [formData, setFormData] = React.useState({
    title: ``,
    todo: ``,
    completeBy: ``,
  });

  // Declare variable holding todo list data
  const [todoListData, setTodoListData] = React.useState([
    {
      title: `ADD WATADO`,
      todo: `Add a title, watodo and complete by, then save.`,
      completeBy: `Whenever you're ready`,
    },
  ]);

  // Declare variable tracking if adding and editing
  const [isEditing, setIsEditing] = React.useState(false);

  // Declare variable tracking which todo item to edit
  const [todoItemToEdit, setTodoItemToEdit] = React.useState(0);

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "http://yesofcorsa.com/wp-content/uploads/2017/09/Horizon-Best-Wallpaper1.jpg",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View style={[styles.mainDisplay, styles.mainDisplaySupport]}>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderTitleView}>
            <Text style={styles.mainHeaderTitle}>{`WHAT TO DO?`}</Text>
          </View>
        </View>
        <View style={styles.todoFormView}>
          <Formik
            enableReinitialize
            initialValues={formData}
            onSubmit={(values) => {
              let configgedFormData = {
                title: values.title,
                todo: values.todo,
                completeBy: values.completeBy,
              };
              let updatedTodoList = [...todoListData];
              if (isEditing) {
                updatedTodoList.splice(todoItemToEdit, 1, configgedFormData);
                setTodoListData(updatedTodoList);
              } else {
                updatedTodoList.push(configgedFormData);
                console.log({ updatedTodoList });
                setTodoListData(updatedTodoList);
              }
            }}
          >
            {(props) => (
              <Form>
                <View style={styles.formSupport}>
                  <View style={styles.todoFormHeaderView}>
                    <input
                      name={`title`}
                      placeholder={`WATODO TITLE`}
                      className={styles.todoTitleInput}
                      type={"text"}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      autoComplete={"off"}
                    />
                    <IconButton
                      type={"button"}
                      className={styles.newTodoButton}
                      onClick={() => {
                        let cleanFormData = {
                          title: ``,
                          todo: ``,
                          completeBy: ``,
                        };
                        setFormData(cleanFormData);
                        setIsEditing(false);
                      }}
                    >
                      <Add className={styles.newTodoButtonIcon} />
                    </IconButton>
                  </View>
                  <input
                    name={`todo`}
                    placeholder={`WATODO`}
                    className={styles.todoInput}
                    type={"text"}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.todo}
                    autoComplete={"off"}
                  />
                  <View style={styles.todoFormFooterView}>
                    <input
                      name={`completeBy`}
                      placeholder={`COMPLETE BY`}
                      className={styles.todoCompleteByInput}
                      type={"text"}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.completeBy}
                      autoComplete={"off"}
                    />
                    <button
                      type={`submit`}
                      className={styles.todoSaveButton}
                    >{`SAVE`}</button>
                  </View>
                </View>
              </Form>
            )}
          </Formik>
        </View>
        <View style={styles.todoListView}>
          {todoListData.map((todo, index) => (
            <View style={styles.todoItemView}>
              <View style={styles.todoItemSubjectView}>
                <Text style={styles.todoItemTitleText}>{todo.title}</Text>
                <Text style={styles.todoItemCompleteByText}>
                  {todo.completeBy}
                </Text>
              </View>
              <View style={styles.todoItemEditButtonView}>
                <IconButton
                  className={styles.todoItemEditButton}
                  onClick={(event) => {
                    console.log(`Edit Button Clicked`);
                    let formDataToEdit = {
                      title: todo.title,
                      todo: todo.todo,
                      completeBy: todo.completeBy,
                    };
                    setIsEditing(true);
                    setTodoItemToEdit(index);
                    setFormData(formDataToEdit);
                  }}
                >
                  <Edit className={styles.todoItemEditButtonIcon} />
                </IconButton>
              </View>
            </View>
          ))}
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
    color: "rgba(0, 255, 255, 0.5)",
    textAlign: "center",
    textShadowColor: "rgba(255, 83, 73, 1)",
    textShadowRadius: 5,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Consolas",
  },
  todoFormView: {
    width: "100%",
    height: "45%",
    backgroundColor: "rgba(112, 128, 144, 0.5)",
    overflow: "hidden",
  },
  todoFormFooterView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "15%",
    overflow: "hidden",
  },
  todoFormHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "20%",
    overflow: "hidden",
    border: "1px solid rgba(0, 255, 255, 1)",
  },
  todoListView: {
    width: "100%",
    height: "45%",
    borderTopColor: "rgba(0, 255, 255, 1)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    backgroundColor: "rgba(112, 128, 144, 0.5)",
    overflowY: "scroll",
  },
  todoItemView: {
    flexDirection: "row",
    width: "100%",
    height: "50px",
    border: "1px solid rgba(231, 201, 169, 0.5)",
  },
  todoItemSubjectView: {
    width: "75%",
    height: "100%",
    paddingLeft: 10,
    paddingTop: 2,
    border: "1px solid rgba(231, 201, 169, 0.5)",
    backgroundColor: "rgba(231, 201, 169, 0.1)",
  },
  todoItemTitleText: {
    width: "100%",
    height: "50%",
    color: "cyan",
    textShadowRadius: 2,
    textShadowColor: "rgba(231, 201, 169, 1)",
    fontWeight: "600",
  },
  todoItemCompleteByText: {
    width: "100%",
    height: "50%",
    color: "orange",
    textShadowRadius: 2,
    textShadowColor: "rgba(112,128, 144, 1)",
    fontWeight: "600",
  },
  todoItemEditButtonView: { width: "25%", height: "100%" },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
});

export default MobileTodoList;
