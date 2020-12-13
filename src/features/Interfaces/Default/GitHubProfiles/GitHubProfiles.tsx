import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik, Form } from "formik";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import $ from "jquery";

import FormikField from "./FormikField";

import { localUrl } from "../../../../routes/routerBlock";

import "./GitHubProfilesStyles.scss";

const APIURL = `https://api.github.com/users/`;

const GitHubProfiles: React.FC = () => {
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
    mainDisplaySupportClass: `gitHubProfilesPageDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForGitHubProfiles`,
    backToIndexPageButton: `backToIndexPageButtonForGitHubProfiles`,
    switchStylesButton: `switchStylesButtonForGitHubProfiles`,
    searchView: styles2.searchView,
    searchQueryButtonView: styles2.searchQueryButtonView,
    searchQueryButton: `searchQueryButton`,
    searchQueryButtonIcon: `searchQueryButtonIcon`,
    profileView: styles2.profileView,
    profilePhotoView: styles2.profilePhotoView,
    profilePhoto: `profilePhoto`,
    profileSummaryView: styles2.profileSummaryView,
    profileName: styles2.profileName,
    profileFollowers: styles2.profileFollowers,
    profileFollowing: styles2.profileFollowing,
    profilePublicRepos: styles2.profilePublicRepos,
    repository: styles2.repository,
    repoName: styles2.repoName,
  });

  // Declare variable for storing search data
  const [searchQuery, setSearchQuery] = React.useState(`androddd`);

  // Declare variable storing profile view
  const [profileView, setProfileView] = React.useState(<View></View>);

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Declare function for handling profile search queries
  const performSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Search button clicked.!.`);
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

  // Handle data fetch for views
  React.useEffect(() => {
    const fetchProcess = async (user: string) => {
      const fetchedData = await (await fetch(APIURL + user)).json();
      const fecthedRepoData = await (
        await fetch(APIURL + user + `/repos`)
      ).json();

      let configgedRepoView = fecthedRepoData.map((repo: { name: string }) => {
        let tempRepoViewHold = (
          <Text key={repo.name} style={styles.repoName}>
            {repo.name}
          </Text>
        );
        return tempRepoViewHold;
      });

      const tempProfileViewHold = (
        <View style={styles.profileView}>
          <View style={styles.profilePhotoView}>
            <img
              className={styles.profilePhoto}
              src={fetchedData.avatar_url}
              alt={"profile"}
              width={"100%"}
              height={"50%"}
            />
          </View>
          <View style={styles.profileSummaryView}>
            <Text style={styles.profileName}>{`${fetchedData.name}`}</Text>
            <Text style={styles.profileFollowers}>
              <div
                className={"profileSnippetTitle"}
              >{`Number of followers: `}</div>
              {`${fetchedData.followers}`}
            </Text>
            <Text style={styles.profileFollowing}>
              <div
                className={"profileSnippetTitle"}
              >{`Number of followings: `}</div>
              {`${fetchedData.following}`}
            </Text>
            <Text style={styles.profilePublicRepos}>
              <div className={"profileSnippetTitle"}>{`Number of repos: `}</div>
              {`${fetchedData.public_repos}`}
            </Text>
            <View style={styles.repository}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "700",
                  textAlign: "left",
                  textShadowColor: "rgba(112, 128, 144, 1)",
                  textShadowRadius: 3,
                }}
              >{`Repositories: `}</Text>
              {configgedRepoView}
            </View>
          </View>
        </View>
      );
      setProfileView(tempProfileViewHold);
      console.log({ fetchedData, fecthedRepoData });
    };
    fetchProcess(searchQuery);
  }, [searchQuery, styles]);

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `gitHubProfilesPageDisplaySupportClass`,
          mainDisplay: styles2.mainDisplay,
          searchView: styles2.searchView,
          profileView: styles2.profileView,
          profileName: styles2.profileName,
          profileFollowers: styles2.profileFollowers,
          profileFollowing: styles2.profileFollowing,
          profilePublicRepos: styles2.profilePublicRepos,
          repository: styles2.repository,
          repoName: styles2.repoName,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `gitHubProfilesPageDisplaySupportClassv2`,
          mainDisplay: styles2.mainDisplayv2,
          searchView: styles2.searchViewv2,
          profileView: styles2.profileViewv2,
          profileName: styles2.profileNamev2,
          profileFollowers: styles2.profileFollowersv2,
          profileFollowing: styles2.profileFollowingv2,
          profilePublicRepos: styles2.profilePublicReposv2,
          repository: styles2.repositoryv2,
          repoName: styles2.repoNamev2,
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
        <View style={styles.searchView}>
          <Formik
            initialValues={{ searchQuery }}
            onSubmit={(values) => {
              performSearch(values.searchQuery);
            }}
          >
            {() => {
              return (
                <Form>
                  <FormikField
                    name={"searchQuery"}
                    label={"Find GitHub Profile By Username"}
                    style={{
                      disableUnderline: true,
                    }}
                    required={false}
                    kindOfStyle={kindOfStyle}
                  />
                  <View style={styles.searchQueryButtonView}>
                    <IconButton
                      className={styles.searchQueryButton}
                      type={"submit"}
                    >
                      <Search className={styles.searchQueryButtonIcon} />
                    </IconButton>
                  </View>
                </Form>
              );
            }}
          </Formik>
        </View>
        {profileView}
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  mainDisplayv2: {
    margin: "auto",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  searchView: {
    position: "relative",
    margin: "auto",
    justifyContent: "center",
    width: "500px",
    height: "100px",
    border: "1px solid rgba(12, 5, 112, 0.705)",
    backgroundColor: "rgba(112, 128, 144, 0.75)",
    borderRadius: 10,
    borderBottomLeftRadius: 50,
  },
  searchViewv2: {
    position: "relative",
    margin: "auto",
    justifyContent: "center",
    width: "500px",
    height: "100px",
    border: "1px solid rgba(12, 5, 112, 0.705)",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderBottomLeftRadius: 50,
  },
  searchQueryView: {
    position: "absolute",
    top: "-10px",
  },
  searchQueryButtonView: {
    position: "absolute",
    top: "13px",
    left: "455px",
  },
  profileView: {
    postion: "relative",
    top: "-100px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: "auto",
    padding: "5px",
    width: "500px",
    height: "200px",
    border: "1px solid rgba(12, 5, 112, 0.705)",
    borderRadius: 10,
    borderTopLeftRadius: 50,
    backgroundColor: "rgba(112, 128, 144, 0.75)",
    overflow: "hidden",
  },
  profileViewv2: {
    postion: "relative",
    top: "-100px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: "auto",
    padding: "5px",
    width: "500px",
    height: "200px",
    border: "1px solid rgba(12, 5, 112, 0.705)",
    borderRadius: 10,
    borderTopLeftRadius: 50,
    backgroundColor: "whitesmoke",
    overflow: "hidden",
  },
  profilePhotoView: {
    margin: "auto",
    width: "20%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 10,
  },
  profileSummaryView: {
    margin: "auto",
    marginLeft: "10px",
    justifyContent: "space-between",
    width: "80%",
    height: "100%",
  },
  profileName: {
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profileNamev2: {
    width: "100%",
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profileFollowers: {
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profileFollowersv2: {
    width: "100%",
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profileFollowing: {
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profileFollowingv2: {
    width: "100%",
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profilePublicRepos: {
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  profilePublicReposv2: {
    width: "100%",
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  repository: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  repositoryv2: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  repoName: {
    paddingLeft: "5px",
    paddingRight: "5px",
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
  repoNamev2: {
    paddingLeft: "5px",
    paddingRight: "5px",
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 3,
  },
});

export default GitHubProfiles;
