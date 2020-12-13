import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./MobileGitHubProfileStyles.scss";

// Declare variable holding api url
const APIURL = `https://api.github.com/users/`;

const MobileGitHubProfiles: React.FC = () => {
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
        backgroundImageSupport: {
          ...styles.backgroundImageSupport,
          height: screenHeight,
        },
        profileSummaryViewSupport: {
          ...styles.profileSummaryViewSupport,
          width: "100%",
          // height: screenHeight * 90 * 0.01 - 120,
        },
        searchQueryViewSupport: {
          ...styles.searchQueryViewSupport,
          width: screenWidth * 95 * 0.01 - 130,
        },
      };
      return updatedSizes;
    });
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupport: { width: "100%", height: screenHeight },
    backgroundImage: styles2.backgroundImage,
    backgroundImageSupport: { width: "100%", height: screenHeight },
    headerBar: `headerBarForGitHubProfiles`,
    backToIndexPageButton: `backToIndexPageButtonForGitHubProfiles`,
    switchStylesButton: `switchStylesButtonForGitHubProfiles`,
    profileView: styles2.profileView,
    profileSummaryView: styles2.profileSummaryView,
    profileSummaryViewSupport: {
      width: "100%",
      // height: screenHeight * 90 * 0.01 - 120,
    },
    profileSummaryItemView: styles2.profileSummaryItemView,
    profileNameText: styles2.profileNameText,
    profileSummaryItemTitleText: styles2.profileSummaryItemTitleText,
    profileSummaryItemText: styles2.profileSummaryItemText,
    searchView: styles2.searchView,
    searchQueryView: styles2.searchQueryView,
    searchQueryViewSupport: { width: screenWidth * 95 * 0.01 - 130 },
    searchQueryInput: `searchQueryInput`,
    avatarImageView: styles2.avatarImageView,
    avatarImage: `avatarImage`,
    genericText: styles2.genericText,
  });

  // Declare variable holding search query
  const [searchQuery, setSearchQuery] = React.useState(`androddd`);

  // Declare variable storing profile view
  const [profileView, setProfileView] = React.useState(<View></View>);

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

  // Handle data fetch for views
  React.useEffect(() => {
    const fetchProcess = async (user: string) => {
      const fetchedData = await (await fetch(APIURL + user)).json();
      const fecthedRepoData = await (
        await fetch(APIURL + user + `/repos`)
      ).json();
      let verifiedImageUrl =
        fetchedData.message === "Not Found"
          ? `https://th.bing.com/th/id/OIP.iO2uqmPaOmKLAHu9YYHuYwHaHa?pid=Api&rs=1`
          : fetchedData.avatar_url;
      const tempProfileViewHold = (
        <View style={styles.profileView}>
          <View style={styles.searchView}>
            <View style={styles.avatarImageView}>
              <img
                src={verifiedImageUrl}
                alt={`profile`}
                width={`100%`}
                height={`100%`}
                className={styles.avatarImage}
              />
            </View>
            <View
              style={[styles.searchQueryView, styles.searchQueryViewSupport]}
            >
              <input
                name={`searchQuery`}
                className={styles.searchQueryInput}
                placeholder={`${searchQuery}`}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    setSearchQuery(event.currentTarget.value);
                  }
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.profileSummaryView,
              styles.profileSummaryViewSupport,
            ]}
          >
            <View style={styles.profileSummaryItemView}>
              <Text style={styles.profileNameText}>{fetchedData.name}</Text>
            </View>
            <View style={styles.profileSummaryItemView}>
              <Text
                style={styles.profileSummaryItemTitleText}
              >{`FOLLOWERS:`}</Text>
              <Text style={styles.profileSummaryItemText}>
                {fetchedData.followers}
              </Text>
            </View>
            <View style={styles.profileSummaryItemView}>
              <Text
                style={styles.profileSummaryItemTitleText}
              >{`FOLLOWINGS:`}</Text>
              <Text style={styles.profileSummaryItemText}>
                {fetchedData.following}
              </Text>
            </View>
            <View style={styles.profileSummaryItemView}>
              <Text style={styles.profileSummaryItemTitleText}>{`REPOS:`}</Text>
              {fecthedRepoData.map((repo: { name: string }) => {
                return (
                  <Text style={styles.profileSummaryItemText}>{repo.name}</Text>
                );
              })}
            </View>
          </View>
        </View>
      );
      if (fetchedData.message === "Not Found") {
        setSearchQuery(`NOT FOUND!:-\\`);
      }
      setProfileView(tempProfileViewHold);
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
          profileView: styles2.profileView,
          profileSummaryView: styles2.profileSummaryView,
          profileNameText: styles2.profileNameText,
          profileSummaryItemTitleText: styles2.profileSummaryItemTitleText,
          profileSummaryItemText: styles2.profileSummaryItemText,
          searchView: styles2.searchView,
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
          profileView: styles2.profileViewv2,
          profileSummaryView: styles2.profileSummaryViewv2,
          profileNameText: styles2.profileNameTextv2,
          profileSummaryItemTitleText: styles2.profileSummaryItemTitleTextv2,
          profileSummaryItemText: styles2.profileSummaryItemTextv2,
          searchView: styles2.searchViewv2,
          genericText: styles2.genericTextv2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/originals/48/c6/1f/48c61f19bf4c11a128533fd44d803809.jpg",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={[styles.backgroundImage, styles.backgroundImageSupport]}
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
        {profileView}
      </View>
    </ImageBackground>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {
    position: "relative",
    paddingBottom: "5%",
    width: "100%",
    height: "100%",
    alignItems: "center",
    overflow: "scroll",
  },
  backgroundImage: {},
  profileView: {
    width: "95%",
    // height: "90%",
    marginTop: "25px",
    border: "1px solid cyan",
    borderRadius: 25,
    borderTopLeftRadius: 60,
    overflow: "hidden",
  },
  profileViewv2: {
    width: "95%",
    // height: "90%",
    marginTop: "25px",
    border: "1px solid gainsboro",
    borderRadius: 25,
    borderTopLeftRadius: 60,
    overflow: "hidden",
  },
  profileSummaryView: {
    justifyContent: "flex-start",
    paddingBottom: "15px",
    backgroundColor: "rgba(0, 255, 255, 0.5)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "slategrey",
  },
  profileSummaryViewv2: {
    justifyContent: "flex-start",
    paddingBottom: "15px",
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "gainsboro",
  },
  profileSummaryItemView: { alignItems: "center", marginTop: "15px" },
  profileNameText: {
    paddingTop: "10px",
    color: "rgba(0, 0, 0, 0.5)",
    textShadowColor: "orange",
    textShadowRadius: 2,
    fontSize: 30,
    fontWeight: "800",
  },
  profileNameTextv2: {
    paddingTop: "10px",
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 2,
    fontSize: 30,
    fontWeight: "800",
  },
  profileSummaryItemTitleText: {
    color: "rgba(0, 0, 0, 0.0)",
    textShadowColor: "blue",
    textShadowRadius: 2,
    fontSize: 20,
    fontWeight: "800",
  },
  profileSummaryItemTitleTextv2: {
    color: "gainsboro",
    textShadowColor: "rgba(112, 128, 144, 1)",
    textShadowRadius: 2,
    fontSize: 20,
    fontWeight: "800",
  },
  profileSummaryItemText: {
    height: "20px",
    color: "black",
  },
  profileSummaryItemTextv2: {
    height: "20px",
    color: "floralwhite",
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10px",
    paddingTop: "8px",
    backgroundColor: "black",
  },
  searchViewv2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10px",
    paddingTop: "8px",
    backgroundColor: "black",
  },
  searchQueryView: {
    marginLeft: 10,
  },
  avatarImageView: {
    width: "100px",
    height: "100px",
    borderRadius: 50,
    overflow: "hidden",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
  genericTextv2: {
    color: "gainsboro",
    textAlign: "center",
  },
});

export default MobileGitHubProfiles;
