import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Swipeable } from "react-swipeable";

import $ from "jquery";

import "./MobileCookbookStyles.scss";

const recipes = [
  {
    name: `Simple Stromboli`,
    photo: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F955576.jpg&q=85`,
    ingredients: [
      `½ pound bulk pork sausage`,
      `1 (1 pound) loaf frozen bread dough, thawed`,
      `4 slices hard salami`,
      `4 slices thinly sliced ham`,
      `4 slices American cheese`,
      `1 cup shredded mozzarella cheese`,
      `salt and ground black pepper to taste`,
      `1 egg white, lightly beaten`,
    ],
    instructions: [
      `Preheat oven to 425 degrees F (220 degrees C).`,
      `Heat a large skillet over medium-high heat; cook and stir sausage until crumbly, evenly browned, and no longer pink, about 10 minutes. Drain and discard any excess grease.`,
      `Pat out bread dough on an ungreased baking sheet, to 3/4-inch thickness. Lay salami, ham, and American cheese slices in center of dough. Sprinkle with mozzarella cheese, salt, pepper, and cooked sausage. Wrap dough to cover ingredients, pinching and sealing edges to prevent leakage; brush top with egg white.`,
      `Bake in preheated oven until dough is baked and lightly browned, 17 to 20 minutes.`,
    ],
    reference: `https://www.allrecipes.com/recipe/222746/simple-stromboli/?lnkid=pin13404`,
  },
  {
    name: `Simple Granola`,
    photo: `https://i0.wp.com/lmld.org/wp-content/uploads/2013/05/Simple-Granola-10.jpg?w=700&ssl=1`,
    ingredients: [
      `1/2 cup brown sugar`,
      `1/2 cup honey`,
      `1/4 cup canola oil**`,
      `4 cups old fashioned oats`,
      `1/2 tsp cinnamon`,
      `1/4 tsp salt`,
    ],
    instructions: [
      `Preheat oven to 250 degrees.`,
      `Combine brown sugar, honey and canola oil in a small sauce pan over medium heat.`,
      `Cook, stirring often until sugar is dissolved.`,
      `Pour brown sugar mixture over oats and add cinnamon and salt. Stir until oats are evenly coated.`,
      `Spread granola mixture over a cookie sheet (sprayed with pam) and press mixture down.`,
      `Place in oven and bake for 1 hour, stirring every 15-20 minutes.`,
      `Remove from oven and allow to cool completely before breaking apart and into pieces.`,
      `Store in a ziplock bag or other air tight container.`,
    ],
    reference: `https://lmld.org/simple-granola/`,
  },
  {
    name: `Barbecue Chicken Quesadillas`,
    photo: `https://www.tasteofhome.com/wp-content/uploads/2018/01/exps176457_SD163614D12_01_6b-696x696.jpg`,
    ingredients: [
      `3 cups shredded cooked chicken`,
      `8 flour tortillas (8 inches)`,
      `1 can (4 ounces) chopped green chiles`,
      `3/4 cup shredded sharp cheddar cheese`,
      `1/2 cup salsa`,
      `1/3 cup barbecue sauce`,
      `1/4 cup taco sauce`,
      `Optional: Sour cream and additional salsa`,
    ],
    instructions: [
      `Preheat oven to 450°. In a large bowl, combine the first 5 ingredients; toss to combine.`,
      `Divide four tortillas between two baking sheets; spread with chicken mixture. Sprinkle with cheese and top with remaining tortillas.`,
      `Bake 6-8 minutes or until lightly browned and cheese is melted. Cut each quesadilla into six wedges. If desired, serve with sour cream and additional salsa.`,
    ],
    reference: `https://www.tasteofhome.com/recipes/barbecue-chicken-quesadillas/`,
  },
  {
    name: `Grill Cheese Sandwich`,
    photo: `https://www.bing.com/images/blob?bcid=SHt6pHHmUOoBXA`,
    ingredients: [
      `2 pieces sourdough bread`,
      `1 ½ tablespoons unsalted butter`,
      `1 ½ tablespoons mayonnaise`,
      `3 slices cheddar cheese`,
    ],
    instructions: [
      `On a cutting board, butter each piece of bread with butter on one side.`,
      `Flip the bread over and spread each piece of bread with mayonnaise.`,
      `Place the cheese on the buttered side of one piece of bread. Top it with the second piece of bread, mayonnaise side out.`,
      `Heat a nonstick pan over medium low heat.`,
      `Place the sandwich on the pan, mayonnaise side down.`,
      `Cook for 3-4 minutes, until golden brown.`,
      `Using a spatula, flip the sandwich over and continue cooking until golden brown, about 2-3 minutes.`,
      `Enjoy!`,
    ],
    reference: `https://tasty.co/recipe/grilled-cheese`,
  },
  {
    name: `Easy Donuts`,
    photo: `https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_721,h_406/v1/img/recipes/21/74/63/OZAWGqRsRGeDzVIl00XM_Easy%20Donuts%20site-2.jpg`,
    ingredients: [
      `10 refrigerated buttermilk biscuits`,
      `2 cups sugar`,
      `2 teaspoons cinnamon`,
    ],
    instructions: [
      `Cut or tear each biscuit in half.`,
      `Roll in palm of hand to finger shape.`,
      `Stretch and join ends together.`,
      `Drop in hot lard at 350 degrees.`,
      `Brown on both sides.`,
      `Drain on absorbent paper.`,
      `Drop in paper sack with mixture of sugar and cinnamon.`,
      `Shake until coated.`,
    ],
    reference: `https://www.food.com/recipe/easy-donuts-217463`,
  },
  {
    name: `Easy Homemade Cheese Sauce`,
    photo: `https://i2.wp.com/bakingmischief.com/wp-content/uploads/2018/01/easy-cheese-sauce-image.jpg`,
    ingredients: [
      `butter: The base of this cheese sauce is a roux made with butter and flour. You can use salted or unsalted butter for this recipe.`,
      `all-purpose flour: Using equal parts (by volume) of flour to butter helps thicken the cheese sauce.`,
      `milk: You can use any percentage milk you’d like in this recipe, but the higher fat the milk, the smoother and creamier your sauce will be. `,
      `cheddar cheese: Be sure to use full-fat cheese and start with a block of cheese that you shred yourself. The anti-caking additives in bagged, pre-shredded cheese can make your sauce lumpy. I prefer to use sharp cheddar, but mild to extra sharp will all work.`,
    ],
    instructions: [
      `You start with a roux made by melting the butter in a small pot and whisking in the flour until you get a lightly golden paste. Cooking the flour with butter first cooks the raw flour taste out of the mixture.`,
      `Then slowly pour in the milk, being careful to whisk out any lumps as they form, and stir until you have a nice bubbly, creamy sauce.`,
      `Once the sauce is thickened, turn off the heat and stir in the cheese a handful at a time. Add salt, pepper, and optional cayenne to taste, and voilà. Perfect cheese sauce ready to tasty up whatever you’re going to pour it over.`,
    ],
    reference: `https://bakingmischief.com/easy-cheese-sauce/`,
  },
  {
    name: `Simple Pizza Base`,
    photo: `https://www.bing.com/images/blob?bcid=SNtAXDLOveoBNw`,
    ingredients: [
      `200g - plain flour`,
      `1 tsp - yeast`,
      `1 tsp - salt`,
      `1/2 cup - milk`,
      `1/2 cup - water`,
    ],
    instructions: [
      `Warm together milk and water.`,
      `Sprinkle in yeast, and mix.`,
      `Stand covered for 20 minutes.`,
      `Mix in yeast mixture into flour.`,
      `Knead for 3-4 minutes till smooth.`,
      `Cover and rest for 45 minutes.`,
      `Knead again for 3 minutes.`,
      `Take a lump of dough, pat or roll into a pizza base.`,
      `Use dry flour to dust if required.`,
      `Add pizza gravy as required, add toppings.`,
      `Bake in a hot (300 degree C) oven, till base is crisp and light.`,
    ],
    reference: `https://www.bawarchi.com/recipe/simple-pizza-base-oetrI3iddgfdg.html`,
  },
  {
    name: `Mexican Halloween Pumpkin Shake`,
    photo: `https://www.adrianasbestrecipes.com/wp-content/uploads/2016/10/Making-a-ghoulish-Mexican-Pumpkin-Shake-to-share-with-all-the-family.jpg`,
    ingredients: [
      `1 cup candied pumpkin puree can be substituted with canned pumpkin puree`,
      `1/2 cup of ice`,
      `3 cups of 2% whole milk`,
      `1/2 teaspoon of ground cinnamon for garnishing`,
    ],
    instructions: [
      `Place all the ingredients in the blender and blend until getting a smoothie consistency. Serve and garnish with cinnamon.`,
    ],
    reference: `https://www.adrianasbestrecipes.com/mexican-pumpkin-shake/`,
  },
  {
    name: `Easy Banana Pudding`,
    photo: `https://www.theseasonedmom.com/wp-content/uploads/2018/06/Quick-and-Easy-Banana-Pudding-8.jpg`,
    ingredients: [
      `1 box vanilla wafer cookies`,
      `1 small box vanilla instant pudding (plus milk for preparing pudding)`,
      `2 large ripe bananas, thinly slice (plus extra for garnish)`,
      `4 ounces frozen whipped topping (such as Cool Whip), thawed`,
    ],
    instructions: [
      `Use a spatula to spread half of the prepared pudding (approximately 1 cup) over the cookies.`,
      `Top pudding with a single layer of banana slices.`,
      `Repeat layers, starting with cookies.`,
      `Top final layer of banana slices with whipped topping. Refrigerate at least one hour, or until ready to serve. Just before serving, garnish with extra vanilla wafers and sliced banana, if desired.`,
    ],
    reference: `https://www.theseasonedmom.com/summer-quick-and-easy-banana-pudding/`,
  },
  {
    name: `Easy Homemade Lemonade`,
    photo: `https://www.sugardishme.com/wp-content/uploads/2013/07/Easy-Homemade-Lemonade1.jpg`,
    ingredients: [
      `6-7 lemons`,
      `1-1 1/2 cups sugar (this amount can be reduced according to taste)`,
      `8 cups water, divided`,
    ],
    instructions: [
      `Zest 3 of the lemons.`,
      `Place the lemon zest and the sugar in a small saucepan (1-2 quart) with 2 cups of the water.`,
      `Stir and bring to a simmer but don't boil-- you just want to dissolve the sugar and get the lemon zest flavor into the liquid. Reduce the heat to low and let the mixture steep.`,
      `Juice the remaining lemons (and the 3 you zested). I pour the juice through a fine mesh strainer straight into the pitcher because I completely hate on some pulp. This step is not necessary-- it's all about preference.`,
      `Pour the simple syrup you made with the lemon zest into the pitcher with the lemon juice. I also pour this through a fine mesh strainer to remove the zest, but again-- it's preferential.`,
      `Stir.`,
      `Add the remaining 6 cups of Water.`,
      `Taste.`,
      `Add more water if it is too sweet/tart. Pour over ice and serve immediately or let it chill and serve later!`,
    ],
    reference: `https://www.sugardishme.com/easy-homemade-lemonade/`,
  },
];

const MobileCookbook: React.FC = () => {
  // Handle screen size detection and changes
  // Declare variable tracking screen height
  const [screenHeight, setScreenHeight] = React.useState(() => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      return Dimensions.get("window").height;
    } else {
      return Dimensions.get("screen").height;
    }
  });
  // Declare variable tracking screen width
  const [screenWidth, setScreenWidth] = React.useState(
    Dimensions.get("window").width
  );
  // Declare variable tracking if portrait || landscape orientation
  const [isPortrait, setIsPortrait] = React.useState(
    screenHeight > screenWidth ? true : false
  );
  // Handle screen size change
  $(window).on("resize", () => {
    let updatedScreenHeight: number = Dimensions.get("screen").height;
    let updatedScreenWidth: number = Dimensions.get("window").width;

    setScreenHeight(() => {
      if (updatedScreenHeight < updatedScreenWidth) {
        let updatedScreenHeight = Dimensions.get("screen").height;
        return updatedScreenHeight;
      } else {
        let updatedScreenHeight = Dimensions.get("window").height;
        return updatedScreenHeight;
      }
    });

    setScreenWidth(() => {
      let updatedScreenWidth = Dimensions.get("window").width;
      return updatedScreenWidth;
    });

    if (updatedScreenHeight > updatedScreenWidth) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  });

  React.useEffect(() => {
    let bodyHeight = $("body").height();
    console.log(`1body height: ${bodyHeight}`);
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
      };
      return updatedSizes;
    });
  }, [screenHeight, screenWidth]);

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupport: { width: "100%", height: screenHeight },
    backgroundImage: { width: "100%", height: screenHeight },
    recipesNavigationView: styles2.recipeNavigationView,
    firstRecipeButtonView: styles2.firstRecipeButtonView,
    firstRecipeButton: `firstRecipeButton`,
    firstRecipeButtonImage: `firstRecipeButtonImage`,
    secondRecipeButtonView: styles2.secondRecipeButtonView,
    secondRecipeButton: `secondRecipeButton`,
    secondRecipeButtonImage: `secondRecipeButtonImage`,
    thirdRecipeButtonView: styles2.thirdRecipeButtonView,
    thirdRecipeButton: `thirdRecipeButton`,
    thirdRecipeButtonImage: `thirdRecipeButtonImage`,
    fourthRecipeButtonView: styles2.fourthRecipeButtonView,
    fourthRecipeButton: `fourthRecipeButton`,
    fourthRecipeButtonImage: `fourthRecipeButtonImage`,
    fifthRecipeButtonView: styles2.fifthRecipeButtonView,
    fifthRecipeButton: `fifthRecipeButton`,
    fifthRecipeButtonImage: `fifthRecipeButtonImage`,
    swipeContainer: `swipeContainer`,
    swipeContainerSupport: { width: "100%", height: screenHeight },
    recipePhotoView: styles2.recipePhotoView,
    recipePhotoTitleView: styles2.recipePhotoTitleView,
    recipePhotoTitleText: styles2.recipePhotoTitleText,
    recipePhoto: `recipePhoto`,
    recipeIngredientsView: styles2.recipeIngredientsView,
    ingredientsTitleView: styles2.ingredientsTitleView,
    ingredientsListView: styles2.ingredientsListView,
    ingredientsTitleText: styles2.ingredientsTitleText,
    ingredientsListText: styles2.ingredientsListText,
    recipeInstructionsView: styles2.recipeInstructionsView,
    instructionsTitleView: styles2.instructionsTitleView,
    instructionsListView: styles2.instructionsListView,
    instructionsTitleText: styles2.instructionsTitleText,
    instructionsListText: styles2.instructionsListText,

    genericText: styles2.genericText,
  });

  // Declare variable tracking initial page setup
  const [initialPageSetup, setInitialPageSetup] = React.useState(false);
  // Declare variable tracking current recipe index
  const [currentRecipeIndex, setCurrentRecipeIndex] = React.useState(0);
  // Declare array holding cookbooks navigations bar recipes index
  const [navBarRecipesIndex, setNavBarRecipesIndex] = React.useState([
    0,
    1,
    2,
    3,
    4,
  ]);
  // Declare variable tracking recipe page
  const [whichRecipePage, setWhichRecipePage] = React.useState(`photo`);
  // Declare variable holding current recipe page view
  const [recipePageView, setRecipePageView] = React.useState(<></>);
  // Declare variable holding recipes navigation view
  const [recipesNavigation, setRecipesNavigation] = React.useState(<></>);
  // Declare variable holding recipe photo size dimensions
  const [recipesNavDimensions, setRecipesNavDimensions] = React.useState({
    width: isPortrait ? screenWidth : screenWidth * 20 * 0.01,
    height: isPortrait ? screenHeight * 20 * 0.01 : screenHeight,
  });

  // Declare refs for elements
  const mainDisplayRef = React.useRef<any>();
  const recipePhotoViewRef = React.useRef<any>();
  const recipePhotoRef = React.useRef<any>();
  const recipeIngredientsViewRef = React.useRef<any>();
  const recipeInstructionsViewRef = React.useRef<any>();
  const recipesNavigationSwiperRef = React.useRef<any>();
  const recipesNavigationViewRef = React.useRef<any>();

  // Handle recipe page setup and changes
  React.useEffect(() => {
    const pageSetupInit = () => {
      if (initialPageSetup) {
        let recipesNavWidth = recipesNavDimensions.width;
        let recipesNavHeight = recipesNavDimensions.height;

        let tenPercScreenWidth = screenWidth * 10 * 0.01;
        let tenPercScreenHeight = screenHeight * 10 * 0.01;
        let twentyPercScreenWidth = screenWidth * 20 * 0.01;
        let twentyPercScreenHeight = screenHeight * 20 * 0.01;
        let configgedScreenWidth = isPortrait
          ? screenWidth
          : screenWidth - recipesNavWidth;
        let configgedScreenHeight = isPortrait
          ? screenHeight - recipesNavHeight
          : screenHeight;
        let clarifiedScreenWidth = configgedScreenWidth;
        let clarifiedScreenHeight = configgedScreenHeight;
        console.log({
          recipesNavHeight,
          recipesNavWidth,
          tenPercScreenWidth,
          tenPercScreenHeight,
          screenWidth,
          screenHeight,
          configgedScreenWidth,
          configgedScreenHeight,
          clarifiedScreenWidth,
          clarifiedScreenHeight,
        });
        if (whichRecipePage === `photo`) {
          setRecipePageView(() => {
            return (
              <View
                ref={recipePhotoViewRef}
                style={[
                  styles.recipePhotoView,
                  {
                    position: "absolute",
                    left: isPortrait
                      ? `0px`
                      : `${twentyPercScreenHeight + 2}px`,
                    width: clarifiedScreenWidth,
                    height: clarifiedScreenHeight,
                  },
                ]}
              >
                <View
                  style={[
                    styles.recipePhotoTitleView,
                    { height: clarifiedScreenHeight * 10 * 0.01 },
                  ]}
                >
                  <Text style={styles.recipePhotoTitleText}>
                    {recipes[currentRecipeIndex].name}
                  </Text>
                </View>
                <img
                  ref={recipePhotoRef}
                  src={recipes[currentRecipeIndex].photo}
                  alt={`${recipes[currentRecipeIndex].name}`}
                  width={"0%"}
                  height={"0%"}
                  className={styles.recipePhoto}
                  onLoad={(event) => {
                    let originalWidth = event.currentTarget.naturalWidth;
                    let originalHeight = event.currentTarget.naturalHeight;
                    console.log(originalHeight);
                    console.log(screenHeight);
                    console.log(originalWidth);
                    console.log(screenWidth);
                    if (isPortrait) {
                      if (originalWidth > originalHeight) {
                        console.log(`orginalWidth > originalHeight`);
                        if (originalWidth > screenWidth) {
                          console.log(`image loaded imageWidth > screenWidth`);
                          let scaledWidthRatio = screenWidth / originalWidth;
                          let configgedHeight =
                            originalHeight * scaledWidthRatio;
                          event.currentTarget.width = screenWidth;
                          event.currentTarget.height = configgedHeight;
                          console.log({ scaledWidthRatio, configgedHeight });
                        } else if (originalWidth < screenWidth) {
                          console.log(`image loaded imageWidth < screenWidth`);
                          let scaledWidthRatio = originalWidth / screenWidth;
                          let configgedHeight =
                            originalHeight / scaledWidthRatio;
                          event.currentTarget.width = screenWidth;
                          event.currentTarget.height = configgedHeight;
                          console.log({ scaledWidthRatio, configgedHeight });
                        }
                      } else if (originalHeight > originalWidth) {
                        console.log(`originalHeight > originalWidth`);
                        if (originalHeight > screenHeight) {
                          console.log(
                            `image loaded imageHeight > screenHeight`
                          );
                          let scaledHeightRatio = originalHeight / screenHeight;
                          let configgedWidth =
                            originalWidth / scaledHeightRatio;
                          if (configgedWidth < screenWidth) {
                            console.log(`configgedWidth < screenWidth`);
                            event.currentTarget.width = configgedWidth;
                            event.currentTarget.height = screenHeight;
                            console.log({ scaledHeightRatio, configgedWidth });
                          } else {
                            console.log(`configgedWidth > screenWidth`);
                            let scaledWidthRatio = screenWidth / configgedWidth;
                            let configgedHeight =
                              screenHeight * scaledWidthRatio;
                            event.currentTarget.width = screenWidth;
                            event.currentTarget.height = configgedHeight;
                            console.log({
                              scaledWidthRatio,
                              configgedHeight,
                              configgedWidth,
                              screenHeight,
                              screenWidth,
                            });
                          }
                        } else if (originalHeight < screenHeight) {
                          console.log(
                            `image loaded imageHeight < screenHeight`
                          );
                          let scaledHeightRatio = originalHeight / screenHeight;
                          let configgedWidth =
                            originalWidth / scaledHeightRatio;
                          if (configgedWidth < screenWidth) {
                            console.log(`configgedWidth < screenWidth`);
                            event.currentTarget.width = configgedWidth;
                            event.currentTarget.height = screenHeight;
                            console.log({ scaledHeightRatio, configgedWidth });
                          } else {
                            console.log(`configgedWidth > screenWidth`);
                            let scaledWidthRatio = screenWidth / configgedWidth;
                            let configgedHeight =
                              screenHeight * scaledWidthRatio;
                            event.currentTarget.width = screenWidth;
                            event.currentTarget.height = configgedHeight;
                          }
                        }
                      } else {
                        console.log(`width and height are same size`);
                        event.currentTarget.width = clarifiedScreenWidth;
                        event.currentTarget.height = clarifiedScreenWidth;
                      }
                      console.log(`setting photo view for portrait`);
                    } else if (isPortrait === false) {
                      console.log(`landscape orientation`);
                      if (originalWidth > originalHeight) {
                        console.log(`originalWidth > originalHeight`);
                        if (originalWidth > screenWidth) {
                          console.log(`image loaded imageWidth > screenWidth`);
                          let scaledWidthRatio = screenWidth / originalWidth;
                          let configgedHeight =
                            originalHeight * scaledWidthRatio;
                          if (configgedHeight > screenHeight) {
                            console.log(`configgedHeight > screenHeight`);
                            let scaledHeightRatio =
                              screenHeight / configgedHeight;
                            let reConfiggedWidth =
                              screenWidth * scaledHeightRatio;
                            event.currentTarget.width = reConfiggedWidth;
                            event.currentTarget.height = screenHeight;
                            console.log({
                              scaledHeightRatio,
                              reConfiggedWidth,
                            });
                          } else {
                            console.log(`configgedHeight < screenHeight`);
                            event.currentTarget.width = screenWidth;
                            event.currentTarget.height = configgedHeight;
                            console.log({ scaledWidthRatio, configgedHeight });
                          }
                        } else if (originalWidth < screenWidth) {
                          console.log(`image loaded imageWidth < screenWidth`);
                          let scaledHeightRatio = screenHeight / originalHeight;
                          let configgedWidth =
                            originalWidth * scaledHeightRatio;
                          event.currentTarget.width = configgedWidth;
                          event.currentTarget.height = screenHeight;
                          console.log({ scaledHeightRatio, configgedWidth });
                        }
                      } else if (originalHeight > originalWidth) {
                        console.log(`originalHeight > originalWidth`);
                        if (originalHeight > screenHeight) {
                          console.log(
                            `image loaded imageHeight > screenHeight`
                          );
                          let scaledHeightRatio = screenHeight / originalHeight;
                          let configgedWidth =
                            originalWidth * scaledHeightRatio;
                          if (configgedWidth < screenWidth) {
                            console.log(`configgedWidth < screenWidth`);
                            event.currentTarget.width = configgedWidth;
                            event.currentTarget.height = screenHeight;
                            console.log({ scaledHeightRatio, configgedWidth });
                          } else {
                            console.log(`configgedWidth > screenWidth`);
                            let scaledWidthRatio = screenWidth / configgedWidth;
                            let configgedHeight =
                              screenHeight * scaledWidthRatio;
                            event.currentTarget.width = screenWidth;
                            event.currentTarget.height = configgedHeight;
                          }
                        } else if (originalHeight < screenHeight) {
                          console.log(
                            `image loaded imageHeight < screenHeight`
                          );
                          let scaledHeightRatio = originalHeight / screenHeight;
                          let configgedWidth =
                            originalWidth / scaledHeightRatio;
                          event.currentTarget.width = configgedWidth;
                          event.currentTarget.height = screenHeight;
                          console.log({ scaledHeightRatio, configgedWidth });
                        }
                      } else {
                        console.log(`recipe photo has equal sides`);
                        event.currentTarget.width = screenHeight;
                        event.currentTarget.height = screenHeight;
                      }
                      console.log(`setting up photo view for landscape`);
                    }
                  }}
                />
              </View>
            );
          });
          if (recipePhotoRef.current) {
            recipePhotoRef.current.src = ``;
            recipePhotoRef.current.src = recipes[currentRecipeIndex].photo;
          }
        } else if (whichRecipePage === `ingredients`) {
          setRecipePageView(() => {
            return (
              <View
                ref={recipeIngredientsViewRef}
                style={[
                  styles.recipeIngredientsView,
                  {
                    position: "absolute",
                    left: isPortrait
                      ? `0px`
                      : `${twentyPercScreenHeight + 2}px`,
                    width: clarifiedScreenWidth,
                    height: clarifiedScreenHeight,
                  },
                ]}
              >
                <View style={styles.ingredientsTitleView}>
                  <Text style={styles.ingredientsTitleText}>
                    {"Ingredients"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.ingredientsListView,
                    { paddingBottom: isPortrait ? "0px" : "10px" },
                  ]}
                >
                  {recipes[currentRecipeIndex].ingredients.map((ing, ind) => {
                    return (
                      <Text
                        key={`${ind}`}
                        style={styles.ingredientsListText}
                      >{`\u2022 ${ing}`}</Text>
                    );
                  })}
                </View>
              </View>
            );
          });
        } else if (whichRecipePage === `instructions`) {
          setRecipePageView(() => {
            return (
              <View
                ref={recipeInstructionsViewRef}
                style={[
                  styles.recipeInstructionsView,
                  {
                    position: "absolute",
                    left: isPortrait
                      ? `0px`
                      : `${twentyPercScreenHeight + 2}px`,
                    width: clarifiedScreenWidth,
                    height: clarifiedScreenHeight,
                  },
                ]}
              >
                <View style={styles.instructionsTitleView}>
                  <Text style={styles.instructionsTitleText}>
                    {"Instructions"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.instructionsListView,
                    { paddingBottom: isPortrait ? "0px" : "10px" },
                  ]}
                >
                  {recipes[currentRecipeIndex].instructions.map((ins, ind) => {
                    return (
                      <Text
                        key={`${ind}`}
                        style={styles.ingredientsListText}
                      >{`${ind + 1}. ${ins}`}</Text>
                    );
                  })}
                </View>
              </View>
            );
          });
        }
      } else {
        setInitialPageSetup(true);
      }
    };
    pageSetupInit();
  }, [
    recipesNavDimensions,
    initialPageSetup,
    whichRecipePage,
    currentRecipeIndex,
    isPortrait,
    screenHeight,
    screenWidth,
  ]);

  // Handle recipes navigation bar setup and updates
  React.useEffect(() => {
    let twentyPercScreenWidth = screenWidth * 20 * 0.01;
    let twentyPercScreenHeight = screenHeight * 20 * 0.01;

    let clarifiedButtonSize =
      twentyPercScreenWidth > twentyPercScreenHeight
        ? twentyPercScreenHeight - 15
        : twentyPercScreenWidth - 15;

    setRecipesNavigation(() => {
      return (
        <Swipeable
          ref={recipesNavigationSwiperRef}
          style={
            isPortrait
              ? { width: "100%" }
              : { width: "auto", height: screenHeight }
          }
          onSwiped={() => {
            console.log(`recipes navigation bar swiped.!.`);
          }}
          onSwipedLeft={() => {
            if (isPortrait) {
              let updatedRecipesIndex = [
                navBarRecipesIndex[0] < recipes.length - 1
                  ? navBarRecipesIndex[0] + 1
                  : 0,
                navBarRecipesIndex[1] < recipes.length - 1
                  ? navBarRecipesIndex[1] + 1
                  : 0,
                navBarRecipesIndex[2] < recipes.length - 1
                  ? navBarRecipesIndex[2] + 1
                  : 0,
                navBarRecipesIndex[3] < recipes.length - 1
                  ? navBarRecipesIndex[3] + 1
                  : 0,
                navBarRecipesIndex[4] < recipes.length - 1
                  ? navBarRecipesIndex[4] + 1
                  : 0,
              ];
              setNavBarRecipesIndex(updatedRecipesIndex);
            }
          }}
          onSwipedRight={() => {
            if (isPortrait) {
              let updatedRecipesIndex = [
                navBarRecipesIndex[0] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[0] - 1,
                navBarRecipesIndex[1] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[1] - 1,
                navBarRecipesIndex[2] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[2] - 1,
                navBarRecipesIndex[3] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[3] - 1,
                navBarRecipesIndex[4] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[4] - 1,
              ];
              setNavBarRecipesIndex(updatedRecipesIndex);
            }
          }}
          onSwipedDown={() => {
            if (!isPortrait) {
              let updatedRecipesIndex = [
                navBarRecipesIndex[0] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[0] - 1,
                navBarRecipesIndex[1] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[1] - 1,
                navBarRecipesIndex[2] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[2] - 1,
                navBarRecipesIndex[3] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[3] - 1,
                navBarRecipesIndex[4] <= 0
                  ? recipes.length - 1
                  : navBarRecipesIndex[4] - 1,
              ];
              setNavBarRecipesIndex(updatedRecipesIndex);
            }
          }}
          onSwipedUp={() => {
            if (!isPortrait) {
              let updatedRecipesIndex = [
                navBarRecipesIndex[0] < recipes.length - 1
                  ? navBarRecipesIndex[0] + 1
                  : 0,
                navBarRecipesIndex[1] < recipes.length - 1
                  ? navBarRecipesIndex[1] + 1
                  : 0,
                navBarRecipesIndex[2] < recipes.length - 1
                  ? navBarRecipesIndex[2] + 1
                  : 0,
                navBarRecipesIndex[3] < recipes.length - 1
                  ? navBarRecipesIndex[3] + 1
                  : 0,
                navBarRecipesIndex[4] < recipes.length - 1
                  ? navBarRecipesIndex[4] + 1
                  : 0,
              ];
              setNavBarRecipesIndex(updatedRecipesIndex);
            }
          }}
        >
          <View
            ref={recipesNavigationViewRef}
            style={[
              styles.recipesNavigationView,
              isPortrait
                ? {
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    flexDirection: "row",
                    position: "absolute",
                    justifyContent: "space-evenly",
                    bottom: "0px",
                    width: "100%",
                    borderTopColor: "rgba(112, 128, 144, 1)",
                    borderTopWidth: 2,
                  }
                : {
                    paddingRight: "5px",
                    paddingLeft: "5px",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    position: "absolute",
                    top: "0px",
                    width: "auto",
                    height: screenHeight,
                    borderLeftColor: "rgba(112, 128, 144, 1)",
                    borderLeftWidth: 1,
                    borderRightColor: "rgba(112, 128, 144, 1)",
                    borderRightWidth: 2,
                    overflow: "hidden",
                  },
            ]}
          >
            <View style={styles.firstRecipeButtonView}>
              <button
                className={styles.firstRecipeButton}
                style={{
                  width: clarifiedButtonSize,
                  height: clarifiedButtonSize,
                }}
                onClick={(event) => {
                  setCurrentRecipeIndex(() => {
                    return navBarRecipesIndex[0];
                  });
                }}
              >
                <img
                  className={styles.firstRecipeButtonImage}
                  src={recipes[navBarRecipesIndex[0]].photo}
                  alt={recipes[navBarRecipesIndex[0]].name}
                  width={"100%"}
                  height={"100%"}
                ></img>
              </button>
            </View>
            <View style={styles.secondRecipeButtonView}>
              <button
                className={styles.secondRecipeButton}
                style={{
                  width: clarifiedButtonSize,
                  height: clarifiedButtonSize,
                }}
                onClick={(event) => {
                  setCurrentRecipeIndex(() => {
                    return navBarRecipesIndex[1];
                  });
                }}
              >
                <img
                  className={styles.secondRecipeButtonImage}
                  src={recipes[navBarRecipesIndex[1]].photo}
                  alt={recipes[navBarRecipesIndex[1]].name}
                  width={"100%"}
                  height={"100%"}
                ></img>
              </button>
            </View>
            <View style={styles.thirdRecipeButtonView}>
              <button
                className={styles.thirdRecipeButton}
                style={{
                  width: clarifiedButtonSize,
                  height: clarifiedButtonSize,
                }}
                onClick={(event) => {
                  setCurrentRecipeIndex(() => {
                    return navBarRecipesIndex[2];
                  });
                }}
              >
                <img
                  className={styles.thirdRecipeButtonImage}
                  src={recipes[navBarRecipesIndex[2]].photo}
                  alt={recipes[navBarRecipesIndex[2]].name}
                  width={"100%"}
                  height={"100%"}
                ></img>
              </button>
            </View>
            <View style={styles.fourthRecipeButtonView}>
              <button
                className={styles.fourthRecipeButton}
                style={{
                  width: clarifiedButtonSize,
                  height: clarifiedButtonSize,
                }}
                onClick={(event) => {
                  setCurrentRecipeIndex(() => {
                    return navBarRecipesIndex[3];
                  });
                }}
              >
                <img
                  className={styles.fourthRecipeButtonImage}
                  src={recipes[navBarRecipesIndex[3]].photo}
                  alt={recipes[navBarRecipesIndex[3]].name}
                  width={"100%"}
                  height={"100%"}
                ></img>
              </button>
            </View>
            <View style={styles.fifthRecipeButtonView}>
              <button
                className={styles.fifthRecipeButton}
                style={{
                  width: clarifiedButtonSize,
                  height: clarifiedButtonSize,
                }}
                onClick={(event) => {
                  setCurrentRecipeIndex(() => {
                    return navBarRecipesIndex[4];
                  });
                }}
              >
                <img
                  className={styles.fifthRecipeButtonImage}
                  src={recipes[navBarRecipesIndex[4]].photo}
                  alt={recipes[navBarRecipesIndex[4]].name}
                  width={"100%"}
                  height={"100%"}
                ></img>
              </button>
            </View>
          </View>
        </Swipeable>
      );
    });
  }, [isPortrait, screenHeight, screenWidth, navBarRecipesIndex]);

  // Handle updating current recipe navigation dimensions
  React.useEffect(() => {
    if (recipesNavigationViewRef.current) {
      setRecipesNavDimensions({
        width: recipesNavigationViewRef.current?.offsetWidth,
        height: recipesNavigationViewRef.current?.offsetHeight,
      });
    }
  }, [
    recipesNavigationViewRef.current?.offsetWidth,
    recipesNavigationViewRef.current?.offsetHeight,
  ]);

  // Handle component return view
  return (
    <ImageBackground
      source={{
        uri:
          "https://cdn.shopify.com/s/files/1/0399/6233/products/TIM_20190129113706_1024x1024.JPG?v=1564716284",
      }}
      imageStyle={{ resizeMode: "cover" }}
      style={styles.backgroundImage}
    >
      <View
        ref={mainDisplayRef}
        style={[styles.mainDisplay, styles.mainDisplaySupport]}
      >
        <Swipeable
          className={styles.swipeContainer}
          style={styles.swipeContainerSupport}
          onSwipedLeft={(event) => {
            if (whichRecipePage === `photo`) {
              setWhichRecipePage(`ingredients`);
            } else if (whichRecipePage === `ingredients`) {
              setWhichRecipePage(`instructions`);
            } else if (whichRecipePage === `instructions`) {
              setWhichRecipePage(`photo`);
            }
          }}
          onSwipedRight={(event) => {
            if (whichRecipePage === `photo`) {
              setWhichRecipePage(`instructions`);
            } else if (whichRecipePage === `ingredients`) {
              setWhichRecipePage(`photo`);
            } else if (whichRecipePage === `instructions`) {
              setWhichRecipePage(`ingredients`);
            }
          }}
        >
          {recipePageView}
        </Swipeable>
        {recipesNavigation}
      </View>
    </ImageBackground>
  );
};

// Declare stylesheet for react-native components
const styles2 = StyleSheet.create({
  mainDisplay: {},
  recipeNavigationView: {
    backgroundColor: "black",
  },
  firstRecipeButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  secondRecipeButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  thirdRecipeButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  fourthRecipeButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  fifthRecipeButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  recipePhotoView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 253, 208, 0.75)",
  },
  recipePhotoTitleView: {
    paddingTop: "2%",
    paddingBottom: "2%",
    position: "absolute",
    top: "0%",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "black",
  },
  recipeIngredientsView: {
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientsTitleView: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    backgroundColor: "rgba(255, 253, 208, 0.75)",
  },
  ingredientsListView: {
    width: "100%",
    height: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "black",
  },
  instructionsTitleView: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    backgroundColor: "rgba(255, 253, 208, 0.75)",
  },
  instructionsListView: {
    width: "100%",
    height: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "black",
  },
  recipeInstructionsView: {
    width: "100%",
    height: "100%",
  },
  recipePhotoTitleText: {
    color: "slategrey",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "800",
  },
  ingredientsTitleText: {
    color: "slategrey",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "800",
  },
  ingredientsListText: {
    color: "slategrey",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  instructionsTitleText: {
    color: "slategrey",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "800",
  },
  instructionsListText: {
    color: "slategrey",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  genericText: {
    color: "slategrey",
    textAlign: "center",
  },
});

export default MobileCookbook;
