import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import $ from "jquery";

import { localUrl } from "../../../../routes/routerBlock";

import "./CookbookStyles.scss";

const recipes = [
  {
    name: `Spaghetti Carbonara`,
    image: `http://ukcdn.ar-cdn.com/recipes/port250/953b5d85-97cd-41c5-a54a-457c00b2443f.jpg`,
    ingredients: [
      `1 (500g) packet spaghetti`,
      `1 tablespoon olive oil`,
      `8 rashers pancetta or streaky bacon, chopped (about 200g)`,
      `1 tablespoon olive oil`,
      `1 onion, chopped`,
      `1 clove garlic, minced`,
      `4 tablespoons dry white wine (optional)`,
      `4 eggs, beaten`,
      `50g (2 oz) grated Parmesan cheese`,
      `salt and freshly ground black pepper to taste`,
      `handful chopped fresh parsley`,
      `grated Parmesan cheese to serve`,
    ],
    instructions: `
    1. In a large pot of boiling salted water, cook spaghetti until just al dente. Drain well. Toss with 1 tablespoon of olive oil and set aside.
    
    2. Meanwhile in a large frying pan, cook chopped pancetta until slightly crisp; remove and drain onto kitchen roll. Reserve 2 tablespoons of dripping; add remaining 1 tablespoon olive oil and heat in the same frying pan. Add chopped onion and cook over medium heat until onion is translucent. Add minced garlic and cook 1 minute more. Add wine if desired; cook one more minute.
    
    3. Return cooked pancetta to pan; add cooked and drained spaghetti. Toss to coat and heat through, adding more olive oil if it seems dry or is sticking together. Add beaten eggs and cook, tossing constantly with tongs or large fork until eggs are barely set. Quickly add 50g Parmesan cheese and toss again. Add salt and pepper to taste (remember that bacon and Parmesan are very salty).
    
    4. Serve immediately with chopped parsley sprinkled on top and extra Parmesan cheese at the table.
    
    Here's an Idea!
    Try adding fresh peas or pre-cooked frozen garden peas to give your carbonara added flavour and colour! Simply add along with the pancetta or bacon.`,
    reference: `http://allrecipes.co.uk/recipe/4575/spaghetti-carbonara.aspx`,
  },
  {
    name: `Gorditas con Camarones`,
    image: `https://assets.bonappetit.com/photos/5f32b10b639eabe5280faa15/1:1/w_414,h_414,c_limit/Gorditas-con-Camarones.jpg`,
    ingredients: [
      `1⅓ cups instant corn masa flour (such as Maseca)`,
      `5 Tbsp. lard, melted, or vegetable oil, divided`,
      `2½ tsp. Diamond Crystal or 1½ tsp. Morton kosher salt, divided, plus more`,
      `4 guajillo or dried New Mexico chiles, stems and seeds removed`,
      `2 morita chiles, stems removed, or 2 canned chipotle chiles in adobo`,
      `1 tsp. ground coriander or cumin`,
      `1½ lb. medium shrimp, peeled, deveined`,
      `4 garlic cloves, thinly sliced`,
      `2 sprigs thyme`,
      `1 Tbsp. apple cider vinegar`,
      `1 tsp. agave syrup or honey`,
      `3 Tbsp. unsalted butter, cut into pieces`,
      `Sliced onion, sliced avocado, cilantro leaves with tender stems, and lime wedges (for serving)`,
    ],
    instructions: `
    1. Stir masa, 1 Tbsp. lard, 1 tsp. Diamond Crystal or ½ tsp. Morton salt, and 1 cup water in a medium bowl until a soft and slightly sticky dough forms. If dry, mix in another 1 Tbsp. water. Cover and let sit at least 30 minutes and up to 3 hours.
    
    2. Meanwhile, bring guajillo chiles, morita chiles, coriander, and 1½ cups water to a boil in a small saucepan. Cover, remove from heat, and let sit, stirring occasionally, 30 minutes to allow chiles to soften. Transfer to a blender and purée until smooth; set aside.
    
    3. Place rack in lowest position in oven; preheat to 500°. Brush a rimmed baking sheet with 2 Tbsp. lard. Divide dough into 4 pieces and form into balls. Set on work surface and cover with a damp kitchen towel. Place 1 ball between 2 sheets of parchment or wax paper. Using a small skillet or saucepan, gently press ball into a 5"-diameter disk. Carefully peel away parchment; place on prepared baking sheet. Repeat with remaining balls.
    
    4. Bake gorditas until outer edges are lightly golden, 10–12 minutes. Turn over and bake until golden brown and crisp, 10–12 minutes. Transfer to plates and let cool 10 minutes. Insert a paring knife into side of gordita and, using a slow sawing motion, cut open along one side (keep other side intact).
    
    5. Heat remaining 2 Tbsp. lard in a large skillet over high. Cook shrimp until lightly browned and just cooked through, about 1 minute per side. Transfer to a medium bowl. Reduce heat to medium and cook garlic in same skillet, tossing often, until beginning to brown, about 1 minute. Add thyme sprigs, vinegar, agave, 1½ tsp. Diamond Crystal or 1 tsp. Morton kosher salt, and reserved chile purée. Cook, stirring occasionally, until brick red and the consistency of a thick sauce, 6–8 minutes. Add shrimp and any juices and cook 1 minute. Remove from heat; add butter and stir constantly until melted and sauce is glossy. Season with more salt if needed. Remove and discard thyme.
    
    6. Fill gorditas with shrimp mixture, onion, avocado, and cilantro. Serve with lime wedges for squeezing over.`,
    reference: `https://www.bonappetit.com/recipe/gorditas-con-camarones`,
  },
  {
    name: `Authentic Mexican Menudo`,
    image: `https://www.mylatinatable.com/wp-content/uploads/2018/07/Menudo-1.jpg`,
    ingredients: [
      `2 Pounds of Rumba Meats Honeycomb Tripe`,
      `1 Liter of Water`,
      `½ White Onion`,
      `1 head of garlic about 4-5 cloves`,
      `1 Branch of Fresh Oregano`,
      `1 Branch of Fresh Rosemary`,
      `Salt`,
      `Guajillo Sauce: 2 pasilla peppers, 2 guajillo peppers, salt, pepper, cumin, clove of garlic`,
      `1 Can of Beef Stock`,
      `1 Can of Hominy`,
      `2 Potatoes cut into medium sized cubes`,
    ],
    instructions: `
    1. Clean the Tripe with water and vinegar, and then rinse.
    
    2. Trim the fat around the edges of the tripe.
    
    3. Cut the Tripe into small chunks and add it to a pot with boiling water and cook for about 25 minutes.
    
    4. Drain the water and rinse the Tripe again. Set aside.
    
    5. In a large, clean pot add a liter of water, the garlic, onion, salt, fresh herbs, beef stock, potatoes, and tripe.
    
    6. Bring to a boil and let cook for 20 minutes.
    
    7. Make the guajillo sauce by removing the seeds and stem from the pasilla and guajillo peppers, and boiling them for 15 minutes in water. Drain the water and blend the softened peppers with one clove of garlic, salt, pepper, onion, and cumin. Strain the mixture with a strainer.
    
    8. Add the guajillo sauce and the hominy to the pot with the rest of the ingredients and let cook for an additional 10 minutes.
    
    9. Serve with lime, onion, and cilantro.`,
    reference: `https://www.mylatinatable.com/authentic-mexican-menudo-recipe/`,
  },
  {
    name: `Chicken Noodle Soup`,
    image: `https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_655,h_368/v1/img/recipes/20/75/5/mY7dl3tS2e5QLwBMsCsT_20171223_180908.jpg`,
    ingredients: [
      `2 teaspoons butter`,
      `1 cup sliced celery`,
      `1 cup chopped carrot`,
      `1/2 cup chopped onion`,
      `1/2 teaspoon thyme`,
      `1 teaspoon poultry seasoning`,
      `2 (32 ounce) containers and 1 can chicken broth (14 ounce)`,
      `2 teaspoons chicken bouillon`,
      `8 ounces egg noodles`,
      `2 cups cooked chicken (3 frozen breasts)`,
    ],
    instructions: `
    1. Melt butter in large pot.
    
    2. Sauté the celery, carrot and onion for 5 to 10 minutes.
    
    3. Add thyme, poultry seasoning, chicken broth and bouilion.
    
    4. Bring to a boil.
    
    5. Add noodles and chicken and cook on low for 20 minutes.
    
    6. Sprinkle with parsley.`,
    reference: `https://www.food.com/recipe/chicken-noodle-soup-20755?photo=7194`,
  },
  {
    name: `Beef Chimichangas`,
    image: `https://www.tasteofhome.com/wp-content/uploads/2018/01/Beef-Chimichangas_EXPS_FT20_8535_F_0522_1_home-696x696.jpg`,
    ingredients: [
      `1 pound ground beef`,
      `1 can (16 ounces) refried beans`,
      `1/2 cup finely chopped onion`,
      `3 cans (8 ounces each) tomato sauce, divided`,
      `2 teaspoons chili powder`,
      `1 teaspoon minced garlic`,
      `1/2 teaspoon ground cumin`,
      `12 flour tortillas (10 inches), warmed`,
      `1 can (4 ounces) chopped green chilies`,
    ],
    instructions: `
    1. In a large skillet, cook beef over medium heat until no longer pink; drain. Stir in the beans, onion, 1/2 cup tomato sauce, chili powder, garlic and cumin.
    
    2. Spoon about 1/3 cup of beef mixture off-center on each tortilla. Fold edge nearest filling up and over to cover. Fold in both sides and roll up. Fasten with toothpicks. In a large saucepan, combine the chilies, peppers and remaining tomato sauce; heat through.
    
    3. In an electric skillet or deep-fat fryer, heat 1 in. of oil to 375°. Fry the chimichangas for 1-1/2 to 2 minutes on each side or until browned. Drain on paper towels. Sprinkle with cheese. Serve with sauce.

    Nutrition Facts:
    1 chimichanga: 626 calories, 41g fat (9g saturated fat), 37mg cholesterol, 1094mg sodium, 46g carbohydrate (5g sugars, 6g fiber), 19g protein.
    `,
    reference: `https://www.tasteofhome.com/recipes/beef-chimichangas/`,
  },
  {
    name: `Mac and Cheese Casserole`,
    image: `https://sweetandsavorymeals.com/wp-content/uploads/2018/11/Mac-and-Cheese-Casserole-Recipe-3pin.jpg`,
    ingredients: [
      `1 pound elbows macaroni  (cooked per box directions, aim for al dente)`,
      `1 tablespoon olive oil`,
      `4 tablespoons butter  (unsalted)`,
      `1/4 cup all-purpose flour`,
      `3 cups milk`,
      `1 cup heavy whipping cream  (or light cream)`,
      `1 can of 14 oz. evaporated milk`,
      `2 tablespoons cornstarch`,
      `2 tablespoons cornstarch`,
      `1/4 teaspoon salt`,
      `1 teaspoon garlic powder`,
      `1 teaspoon onion powder`,
      `1 teaspoon ground thyme  (optional)`,
      `1 teaspoon paprika  (optional)`,
      `1 teaspoon mustard powder`,
      `1/4 teaspoon red pepper flakes  (optional)`,
      `1/2 cup sour cream`,
      `4 oz. cream cheese  (cubed and at room temperature)`,
      `3 cups cheddar cheese  (freshly grated or buy pre-shredded)`,
      `1 cup mozzarella cheese  (freshly grated or buy pre-shredded)`,
      `1 1/2 cups cracker crumbs  (I used Ritz crackers)`,
      `6  tablespoons  (unsalted butter melted)`,
      `1 cup mozzarella cheese  (shredded)`,
      `1 cup cheddar cheese  (shredded)`,
      `
      10  bacon slices  (cooked)`,
    ],
    instructions: `
    1. Preheat oven to 350 degrees F.
    
    2. Lightly grease a 9x13 baking dish with butter or with non-stick cooking spray. Set aside.
    
    3. Cook pasta per box directions, aim for al dente. Drain, mix with olive oil and set aside.
    Cheese Sauce:
    
    1. Place a large sauce pan over medium heat and once its hot add the butter. Stir and melt the butter, carefully not to burn it.
    
    2. Add the flour and whisk until fully combined with the melted butter.
    
    3. While still whisking, little by little add the milk, stirring to combine. Take your time and don't rush through this step.
    
    4. In a small bowl, whisk cream and cornstarch until fully combined and cornstarch is fully dissolved. Add the mixture to the pan. Stir to combine.
    
    5. Add the evaporated milk and stir to combine. Add onion powder, garlic powder, ground thyme, paprika, mustard, red pepper flakes and salt.
    
    6. Still over medium heat, bring the mixture to a boil and let it simmer for about 2 minutes.
    
    7. Stir in sour cream and cream cheese until fully combined. If the sauce is too thick you can add more milk or some chicken broth. Taste and adjust for salt and pepper.
    
    8. Reduce heat to low and add 3 cups of cheddar cheese and 1 cup of mozzarella cheese, freshly grated or pre-shredded. Stir to combine, until the cheese is fully melted.
    
    9. Remove pan from heat and add the cooked elbows macaroni. Stir to combine.
    
    10 .Transfer the mixture to the prepared casserole dish.
    
    Buttery Cracker Topping:
    
    1. In a medium bowl combine cracker crumbs with melted butter and stir using a fork until fully combined.
    
    Other Toppings:
    1. Level the top with a spatula and sprinkle 1 cup of mozzarella cheese and 1 cup of cheddar cheese evenly over the surface of the casserole.
    
    2. Sprinkle the Buttery Cracker Topping evenly over the surface and top with chopped cooked bacon if using.
    
    Bake:
    1. Bake the casserole uncovered in the preheated oven for 25-30 minutes. Until the top is golden brown and bubbly.
    
    2. Remove from oven and let it rest for 15 minutes before serving.
    
    3. Serve topped with extra bacon and if desired chopped parsley.`,
    reference: `https://sweetandsavorymeals.com/mac-and-cheese-casserole-recipe/`,
  },
  {
    name: `White Queso Dip`,
    image: `https://www.eatingonadime.com/wp-content/uploads/2016/12/the-best-mexican-white-cheese-dip.jpg.webp`,
    ingredients: [
      `1/2 pound of white american cheese`,
      `1/4 cup of milk (maybe more if you want it thinner)`,
      `1 tablespoon of butter`,
      `1 (4 oz) can of green chili’s`,
      `1/4 teaspoon of cumin`,
      `1/4 teaspoon of garlic salt`,
      `cayenne pepper – a pinch`,
    ],
    instructions: `
    1.Place cheese, milk, and butter in a sauce pan over low heat.
    
    2. Heat until melted – stirring frequently.
    
    3. Stir in the green chillis, cumin, garlic salt, and the cayenne pepper. Remember, it doesn’t take much cayenne.
    
    4. Add more milk if you want it thinner.
    
    5. Serve immediately with chips, tortillas, and your favorite mexican dish.`,
    reference: `https://www.eatingonadime.com/mexican-white-cheese-dip/`,
  },
  {
    name: `Classic Southern Fried Chicken`,
    image: `https://www.thespruceeats.com/thmb/vC6pIi1UimOptSL5wMkhfwi2l6M=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-southern-fried-chicken-3056867-hero-01-f3114f52f67b4dfe8da551cc6b623b73.jpg`,
    ingredients: [
      `1 1/2 cups milk`,
      `2 large eggs`,
      `2 1/2 cups all-purpose flour`,
      `2 tablespoons salt (plus additional for sprinkling)`,
      `2 teaspoons black pepper`,
      `4 pounds chicken (bone-in, skin-on pieces)`,
      `3 cups vegetable oil`,
    ],
    instructions: `
    1. Gather the ingredients.
    
    2. Preheat the oven to 200 F and place a rack in a large baking pan.
    
    3. Combine milk and eggs in a bowl. Whisk to blend well.
    
    4. In a large heavy-duty resealable plastic food storage bag, combine the flour, 2 tablespoons salt, and pepper. Seal and shake to combine.
    
    5. Dip the chicken pieces in the milk and egg mixture and let excess drip off into the bowl. Set already dipped pieces aside on a plate until you have three or four.
    
    6. Add the dipped chicken pieces to the food storage bag filled with flour. Close it and shake well to coat the chicken pieces thoroughly.
    
    7. Remove to a plate and repeat with the remaining chicken pieces.
    
    8. Heat the oil in a deep, heavy skillet to 350 F. While it's heating up, set aside a large serving plate lined with paper towels.
    
    9. Fry the chicken, a few pieces at a time, for about 10 minutes on each side, or until golden brown and thoroughly cooked. Be careful not to put too many chicken pieces in at once—even if they can comfortably fit—since this will dramatically drop the temperature of the oil, affecting the crispness of the final product. Note that chicken breasts will take a little less time than dark meat pieces.
    
    10. With a slotted spoon, move the done chicken pieces onto the paper towel-lined platter to drain. Sprinkle immediately with salt.
    
    11. Transfer the drained and seasoned chicken to the prepared pan with a rack, in the oven, to keep warm while frying subsequent batches. Depending on the size of your pan, this recipe will produce about 3 to 4 batches.
    
    12. Serve and enjoy!`,
    reference: `https://www.thespruceeats.com/classic-southern-fried-chicken-3056867`,
  },
  {
    name: `Corn Dogs`,
    image: `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190514-corn-dogs-045-portrait-pf-1558551862.jpg?crop=0.966xw:0.645xh;0.0153xw,0.178xh&resize=640:*`,
    ingredients: [
      `12 hot dogs`,
      `1 c. all-purpose flour`,
      `3/4 c. cornmeal`,
      `3 tbsp. granulated sugar`,
      `1 tsp. baking powder`,
      `1 tsp. kosher salt`,
      `1/2 tsp. baking soda`,
      `1/4 tsp. freshly ground black pepper`,
      `1/4 tsp. cayenne pepper`,
      `1 c. buttermilk`,
      `2 large eggs`,
      `Vegetable oil`,
      `Ketchup, for serving`,
      `Mustard, for serving`,
    ],
    instructions: `
    1. Pat hot dogs completely dry with paper towels, then skewer with long wooden skewers. In a large bowl, whisk together flour, cornmeal, sugar, baking powder, salt, baking soda, black pepper, and cayenne.
    
    2. In a small bowl, combine buttermilk and eggs, then pour into dry ingredients and mix until just combined. Pour batter into a tall glass and let sit while oil heats.
    
    3. In a large pot over medium heat, add enough oil to come halfway up the sides and heat to 375°. Dip hot dogs into batter and coat evenly. Fry hot dogs, 4 to 5 at a time, until golden, 5 minutes, turning as necessary. Use tongs to remove from oil and place on a paper towel–lined plate. Fry remaining hot dogs, letting oil come back to temperature between batches.
    
    4. Serve with ketchup and mustard.`,
    reference: `https://www.delish.com/cooking/recipe-ideas/a27470888/classic-corn-dog-recipe/`,
  },
  {
    name: `Old Fashioned Chocolate Chip Cookies Recipe`,
    image: `https://chocolateland.net/wp-content/uploads/2019/05/caffeine-chocolate-chip-coffee-189537-768x576.jpg`,
    ingredients: [
      `Softened salted butter- 150g`,
      `Light brown muscovado sugar- 80g`,
      `Granulated sugar-80g`,
      `Vanilla extract- 2 teaspoon`,
      `Large egg- 1 piece`,
      `Plain flour- 225g`,
      `Bicarbonate of soda- ½ teaspoon`,
      `Salt- ¼ teaspoon`,
      `Plain chocolate chips or chunks- 200g`,
    ],
    instructions: `
    1. First, heat the oven to 190C/fan170C/gas 5. Then line two baking sheets along with the non-stick baking paper.
    
    2. Then pour the softened salted butter (150g), light brown muscovado sugar (80g), and granulated sugar (80g) into a bowl. Mix them together until they get creamy.
    
    3. Then beat the vanilla extract 2 teaspoons and the 1 large size egg.
    
    4. Size the 225g of plain flour and a ½ teaspoon of bicarbonate of soda along with ¼ tsp salt into the bowl.
    
    5. Mix the ingredients together with a wooden spoon.
    
    6. Now, add 200g plain chocolate chips or chunks and then stir it well.
    
    7. Bring a teaspoon to make small scoops of the mixture and pour them well with keeping some spaces between them on the baking tray.
    
    8. Now you have to bake them for 8 to 10 minutes until they get brown on the edges.
    
    9. Bake them well so that you don’t feel any softness in the center when you press them with your spoon.
    
    10.The ingredients I have mentioned here will make up to 30 cookies, so bake them according to the amount.
    
    11. Leave them on the tray for a couple of minutes to set.
    
    12. Then lift them on to a cooling rack.
    
    Recipe Tips:
    
    After freezing the biscuits, you need to take them out from the freezer and then place them on a lined baking sheet to defrost them. And once they are defrosted, heat them on a medium oven with 190C/ 170 fan/ gas mark 5 for 2-3 minutes to crisp them up. Make sure not to leave them for too long or else they will dry out. Moreover, you can also keep the uncooked dough within a sealed container on your freezer to make it last for up to 2-3 weeks. Then simply take them out and place on a lined baking tray and keep them on the room temperature for 5 mins before baking again.`,
    reference: `https://chocolateland.net/easy-old-fashioned-chocolate-chip-cookies-recipe/?utm_source=ForeshopBi&utm_medium=ForeshopBi`,
  },
];

const Cookbook: React.FC = () => {
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

  // Declare variable tracking options for kind of style
  const [kindOfStyle, setKindOfStyle] = React.useState(() => {
    return `colorful`;
  });

  // Declare stylesheet for manipulation
  const [styles, setStyles] = React.useState({
    mainDisplay: styles2.mainDisplay,
    mainDisplaySupportClass: `cookbookDisplaySupportClass`,
    mainDisplaySupportStyle: { width: "100%", height: `${screenHeight}px` },
    headerBar: `headerBarForCookbook`,
    backToIndexPageButton: `backToIndexPageButtonForCookbook`,
    switchStylesButton: `switchStylesButtonForCookbook`,
    cookbookDisplay: styles2.cookbookDisplay,
    cookbookMenu: styles2.cookbookMenu,
    cookbookMenuItemButton: `cookbookMenuItemButton`,
    cookbookMenuItemButtonSelected: `cookbookMenuItemButtonSelected`,
    cookbookMenuItem: `cookbookMenuItem`,
    cookbookMenuNavigationDisplay: styles2.cookbookMenuNavigationDisplay,
    leftCookbookMenuNavigationButtonDisplay:
      styles2.leftCookbookMenuNavigationButtonDisplay,
    rightCookbookMenuNavigationButtonDisplay:
      styles2.rightCookbookMenuNavigationButtonDisplay,
    leftCookbookMenuNavigationButton: `leftCookbookMenuNavigationButton`,
    rightCookbookMenuNavigationButton: `rightCookbookMenuNavigationButton`,
    leftCookbookMenuNavigationButtonText:
      styles2.leftCookbookMenuNavigationButtonText,
    rightCookbookMenuNavigationButtonText:
      styles2.rightCookbookMenuNavigationButtonText,
    recipeDisplay: styles2.recipeDisplay,
    recipeImageDisplay: styles2.recipeImageDisplay,
    recipeTitleContainer: styles2.recipeTitleContainer,
    recipeTitle: styles2.recipeTitle,
    recipeIngredientsDisplay: styles2.recipeIngredientsDisplay,
    recipeIngredientsContainer: styles2.recipeIngredientsContainer,
    recipeIngredientsText: styles2.recipeIngredientsText,
    recipeInstructionsDisplay: styles2.recipeInstructionsDisplay,
    recipeInstructionsTextDisplay: styles2.recipeInstructionsTextDisplay,
    recipeInstructionsText: styles2.recipeInstructionsText,
    recipeNavView: styles2.recipeNavView,
    leftRecipeNavView: styles2.leftRecipeNavView,
    leftRecipeNavButton: `leftRecipeNavButton`,
    leftRecipeNavText: styles2.leftRecipeNavText,
    rightRecipeNavView: styles2.rightRecipeNavView,
    rightRecipeNavButton: `rightRecipeNavButton`,
    rightRecipeNavText: styles2.rightRecipeNavText,
  });

  // Declare variable tracking current recipe
  const [currentRecipe, setCurrentRecipe] = React.useState(0);

  // Declare variable tracking current set of cookbook menu recipes
  const [
    cookbookMenuItemPosition,
    setCookbookMenuItemPosition,
  ] = React.useState([0, 1, 2, 3, 4]);

  // Declare variables holding various recipe views
  // Recipe Image View
  const [recipeImageView, setRecipeImageView] = React.useState(<></>);
  // Recipe Ingredients View
  const [recipeIngredientsView, setRecipeIngredientsView] = React.useState(
    <></>
  );
  // Recipe Instructions View
  const [recipeInstructionsView, setRecipeInstructionsView] = React.useState(
    <View style={styles.recipeIngredientsDisplay}></View>
  );

  // Declare variable tracking current recipe view
  const [recipeView, setRecipeView] = React.useState(recipeImageView);

  // Declare variable tracking current recipe view
  const [whichRecipeView, setWhichRecipeView] = React.useState(``);

  // Declare variables for manipulating recipe nav button text
  const [leftNavText, setLeftNavText] = React.useState(`instructions`);
  const [rightNavText, setRightNavText] = React.useState(`ingredients`);

  // Declare ref for kind of page style button
  let switchStylesButtonRef = React.useRef<any>(null);

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

  // Handle kind of style for page
  React.useEffect(() => {
    if (kindOfStyle === `colorful`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Plain View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `cookbookDisplaySupportClass`,
          cookbookDisplay: styles2.cookbookDisplay,
          recipeIngredientsText: styles2.recipeIngredientsText,
          recipeInstructionsText: styles2.recipeInstructionsText,
          leftRecipeNavButton: `leftRecipeNavButton`,
          rightRecipeNavButton: `rightRecipeNavButton`,
          recipeIngredientsContainer: styles2.recipeIngredientsContainer,
          recipeInstructionsTextDisplay: styles2.recipeInstructionsTextDisplay,
        };
      });
    } else if (kindOfStyle === `plain`) {
      if (switchStylesButtonRef.current) {
        switchStylesButtonRef.current.innerHTML = `Switch To Colorful View`;
      }
      setStyles((styles) => {
        return {
          ...styles,
          mainDisplaySupportClass: `cookbookDisplaySupportClassv2`,
          cookbookDisplay: styles2.cookbookDisplayv2,
          leftRecipeNavButton: `leftRecipeNavButtonv2`,
          rightRecipeNavButton: `rightRecipeNavButtonv2`,
          recipeIngredientsContainer: styles2.recipeIngredientsContainerv2,
          recipeInstructionsTextDisplay:
            styles2.recipeInstructionsTextDisplayv2,
        };
      });
    }
  }, [kindOfStyle]);

  // Handle current recipe update
  React.useEffect(() => {
    console.log(`Current recipe changed.`);
    setRecipeImageView(
      <View style={styles.recipeImageDisplay}>
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>{recipes[currentRecipe].name}</Text>
        </View>
        <img
          src={recipes[currentRecipe].image}
          alt={"current recipe"}
          height={"80%"}
          style={{ borderTop: "1px solid rgba(0, 0, 0, 0.75)" }}
        />
      </View>
    );
    setRecipeIngredientsView(
      <View style={styles.recipeIngredientsDisplay}>
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>{recipes[currentRecipe].name}</Text>
        </View>
        <View style={styles.recipeIngredientsContainer}>
          {recipes[currentRecipe].ingredients.map((ingredient) => {
            return (
              <Text
                style={styles.recipeIngredientsText}
              >{`• ${ingredient}`}</Text>
            );
          })}
        </View>
      </View>
    );
    setRecipeInstructionsView(
      <View style={styles.recipeInstructionsDisplay}>
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>{recipes[currentRecipe].name}</Text>
        </View>
        <View style={styles.recipeInstructionsTextDisplay}>
          <Text style={styles.recipeInstructionsText}>
            {recipes[currentRecipe].instructions}
          </Text>
        </View>
      </View>
    );
    setWhichRecipeView(`recipeImageView`);
  }, [currentRecipe, styles]);

  // Handle recipe view navigation
  React.useEffect(() => {
    console.log(`Current recipe changed.`);
    if (whichRecipeView === `recipeImageView`) {
      setRecipeView(recipeImageView);
      setLeftNavText(`instructions`);
      setRightNavText(`ingredients`);
    } else if (whichRecipeView === `recipeIngredientsView`) {
      setRecipeView(recipeIngredientsView);
      setLeftNavText(`photo`);
      setRightNavText(`instructions`);
    } else if (whichRecipeView === `recipeInstructionsView`) {
      setRecipeView(recipeInstructionsView);
      setLeftNavText(`ingredients`);
      setRightNavText(`photo`);
    }
  }, [
    whichRecipeView,
    recipeImageView,
    recipeIngredientsView,
    recipeInstructionsView,
  ]);

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
        <View style={styles.cookbookDisplay}>
          <View style={styles.cookbookMenuNavigationDisplay}>
            <View style={styles.leftCookbookMenuNavigationButtonDisplay}>
              <button
                className={styles.leftCookbookMenuNavigationButton}
                onClick={() => {
                  console.log(`clicked`);
                  if (cookbookMenuItemPosition[0] <= 0) {
                    let positionsHold = [recipes.length - 1, 0, 1, 2, 3];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (cookbookMenuItemPosition[1] <= 0) {
                    let positionsHold = [
                      recipes.length - 2,
                      recipes.length - 1,
                      0,
                      1,
                      2,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (cookbookMenuItemPosition[2] <= 0) {
                    let positionsHold = [
                      recipes.length - 3,
                      recipes.length - 2,
                      recipes.length - 1,
                      0,
                      1,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (cookbookMenuItemPosition[3] <= 0) {
                    let positionsHold = [
                      recipes.length - 4,
                      recipes.length - 3,
                      recipes.length - 2,
                      recipes.length - 1,
                      0,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (cookbookMenuItemPosition[4] <= 0) {
                    let positionsHold = [
                      recipes.length - 5,
                      recipes.length - 4,
                      recipes.length - 3,
                      recipes.length - 2,
                      recipes.length - 1,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else {
                    let positionsHold = [
                      cookbookMenuItemPosition[0] - 1,
                      cookbookMenuItemPosition[1] - 1,
                      cookbookMenuItemPosition[2] - 1,
                      cookbookMenuItemPosition[3] - 1,
                      cookbookMenuItemPosition[4] - 1,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  }
                }}
              >
                <Text
                  style={styles.leftCookbookMenuNavigationButtonText}
                >{`<`}</Text>
              </button>
            </View>
            <View style={styles.rightCookbookMenuNavigationButtonDisplay}>
              <button
                className={styles.rightCookbookMenuNavigationButton}
                onClick={() => {
                  if (cookbookMenuItemPosition[4] >= recipes.length - 1) {
                    let positionsHold = [
                      recipes.length - 4,
                      recipes.length - 3,
                      recipes.length - 2,
                      recipes.length - 1,
                      0,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (
                    cookbookMenuItemPosition[3] >=
                    recipes.length - 1
                  ) {
                    let positionsHold = [
                      recipes.length - 3,
                      recipes.length - 2,
                      recipes.length - 1,
                      0,
                      1,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (
                    cookbookMenuItemPosition[2] >=
                    recipes.length - 1
                  ) {
                    let positionsHold = [
                      recipes.length - 2,
                      recipes.length - 1,
                      0,
                      1,
                      2,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (
                    cookbookMenuItemPosition[1] >=
                    recipes.length - 1
                  ) {
                    let positionsHold = [recipes.length - 1, 0, 1, 2, 3];
                    setCookbookMenuItemPosition(positionsHold);
                  } else if (
                    cookbookMenuItemPosition[0] >=
                    recipes.length - 1
                  ) {
                    let positionsHold = [0, 1, 2, 3, 4];
                    setCookbookMenuItemPosition(positionsHold);
                  } else {
                    let positionsHold = [
                      cookbookMenuItemPosition[0] + 1,
                      cookbookMenuItemPosition[1] + 1,
                      cookbookMenuItemPosition[2] + 1,
                      cookbookMenuItemPosition[3] + 1,
                      cookbookMenuItemPosition[4] + 1,
                    ];
                    setCookbookMenuItemPosition(positionsHold);
                  }
                }}
              >
                <Text
                  style={styles.rightCookbookMenuNavigationButtonText}
                >{`>`}</Text>
              </button>
            </View>
          </View>
          <View style={styles.cookbookMenu}>
            <button
              className={
                cookbookMenuItemPosition[0] === currentRecipe
                  ? styles.cookbookMenuItemButtonSelected
                  : styles.cookbookMenuItemButton
              }
              onClick={() => {
                setCurrentRecipe(cookbookMenuItemPosition[0]);
              }}
            >
              <img
                src={recipes[cookbookMenuItemPosition[0]].image}
                alt="Cookbook Menu Item"
                width={"100%"}
              />
            </button>
            <button
              className={
                cookbookMenuItemPosition[1] === currentRecipe
                  ? styles.cookbookMenuItemButtonSelected
                  : styles.cookbookMenuItemButton
              }
              onClick={() => {
                setCurrentRecipe(cookbookMenuItemPosition[1]);
              }}
            >
              <img
                src={recipes[cookbookMenuItemPosition[1]].image}
                alt="Cookbook Menu Item"
                width={"100%"}
              />
            </button>
            <button
              className={
                cookbookMenuItemPosition[2] === currentRecipe
                  ? styles.cookbookMenuItemButtonSelected
                  : styles.cookbookMenuItemButton
              }
              onClick={() => {
                setCurrentRecipe(cookbookMenuItemPosition[2]);
              }}
            >
              <img
                src={recipes[cookbookMenuItemPosition[2]].image}
                alt="Cookbook Menu Item"
                width={"100%"}
              />
            </button>
            <button
              className={
                cookbookMenuItemPosition[3] === currentRecipe
                  ? styles.cookbookMenuItemButtonSelected
                  : styles.cookbookMenuItemButton
              }
              onClick={() => {
                setCurrentRecipe(cookbookMenuItemPosition[3]);
              }}
            >
              <img
                src={recipes[cookbookMenuItemPosition[3]].image}
                alt="Cookbook Menu Item"
                width={"100%"}
              />
            </button>
            <button
              className={
                cookbookMenuItemPosition[4] === currentRecipe
                  ? styles.cookbookMenuItemButtonSelected
                  : styles.cookbookMenuItemButton
              }
              onClick={() => {
                setCurrentRecipe(cookbookMenuItemPosition[4]);
              }}
            >
              <img
                src={recipes[cookbookMenuItemPosition[4]].image}
                alt="Cookbook Menu Item"
                width={"100%"}
              />
            </button>
          </View>
          <View style={styles.recipeDisplay}>
            {recipeView}
            <View style={styles.recipeNavView}>
              <View style={styles.leftRecipeNavView}>
                <button
                  className={styles.leftRecipeNavButton}
                  onClick={() => {
                    if (whichRecipeView === `recipeImageView`) {
                      setWhichRecipeView(`recipeInstructionsView`);
                    } else if (whichRecipeView === `recipeIngredientsView`) {
                      setWhichRecipeView(`recipeImageView`);
                    } else if (whichRecipeView === `recipeInstructionsView`) {
                      setWhichRecipeView(`recipeIngredientsView`);
                    }
                  }}
                >
                  <Text style={styles.leftRecipeNavText}>{leftNavText}</Text>
                </button>
              </View>
              <View style={styles.rightRecipeNavView}>
                <button
                  className={styles.rightRecipeNavButton}
                  onClick={() => {
                    if (whichRecipeView === `recipeImageView`) {
                      setWhichRecipeView(`recipeIngredientsView`);
                    } else if (whichRecipeView === `recipeIngredientsView`) {
                      setWhichRecipeView(`recipeInstructionsView`);
                    } else if (whichRecipeView === `recipeInstructionsView`) {
                      setWhichRecipeView(`recipeImageView`);
                    }
                  }}
                >
                  <Text style={styles.rightRecipeNavText}>{rightNavText}</Text>
                </button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  cookbookDisplay: {
    margin: "auto",
    paddingTop: "1px",
    paddingLeft: "1px",
    alignItems: "center",
    width: "500px",
    height: "650px",
    border: "1px solid rgba(112, 128, 144, 0.75)",
    backgroundColor: "rgba(241, 213, 146, 0.85)",
  },
  cookbookDisplayv2: {
    margin: "auto",
    paddingTop: "1px",
    paddingLeft: "1px",
    alignItems: "center",
    width: "500px",
    height: "650px",
    border: "1px solid rgba(112, 128, 144, 0.75)",
    backgroundColor: "black",
  },
  cookbookMenu: {
    marginTop: "10px",
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
  },
  cookbookMenuNavigationDisplay: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    zIndex: 5,
  },
  leftCookbookMenuNavigationButtonDisplay: {
    position: "relative",
    top: "4px",
    right: "227px",
  },
  rightCookbookMenuNavigationButtonDisplay: {
    position: "relative",
    top: "4px",
    left: "227px",
  },
  leftCookbookMenuNavigationButtonText: {
    position: "relative",
    top: "-30px",
    right: "6px",
    fontWeight: "700",
  },
  rightCookbookMenuNavigationButtonText: {
    position: "relative",
    top: "-30px",
    right: "4px",
    fontWeight: "700",
  },
  recipeDisplay: {
    marginTop: "15px",
    width: "95%",
    height: "80%",
    border: "1px solid black",
  },
  recipeImageDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  recipeTitleContainer: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    border: "1px solid rgba(112, 128, 144, 0.75)",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  recipeTitle: {
    margin: "auto",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: "rgba(112, 128, 144, 0.75)",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },
  recipeIngredientsDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  recipeIngredientsContainer: {
    margin: "auto",
    paddingLeft: 10,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    width: "100%",
    height: "413px",
    border: "2px solid rgba(112, 128, 144, 0.75)",
    transform: [{ translateY: 0 }],
  },
  recipeIngredientsContainerv2: {
    margin: "auto",
    paddingLeft: 10,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    width: "100%",
    height: "413px",
    border: "2px solid rgba(112, 128, 144, 0.75)",
    backgroundColor: `gainsboro`,
    transform: [{ translateY: 0 }],
  },
  recipeIngredientsText: {},
  recipeInstructionsDisplay: {
    margin: "auto",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  recipeInstructionsTextDisplay: {
    margin: "auto",
    paddingBottom: "5px",
    width: "100%",
    height: "413px",
    justifyContent: "flex-start",
    border: "2px solid rgba(112, 128, 144, 0.75)",
    paddingLeft: "10px",
    overflowY: "scroll",
  },
  recipeInstructionsTextDisplayv2: {
    margin: "auto",
    paddingBottom: "5px",
    width: "100%",
    height: "413px",
    justifyContent: "flex-start",
    border: "2px solid rgba(112, 128, 144, 0.75)",
    paddingLeft: "10px",
    backgroundColor: `gainsboro`,
    overflowY: "scroll",
  },
  recipeInstructionsText: {},
  recipeNavView: {
    position: "relative",
    top: "-425px",
    flexDirection: "row",
    alignItems: "stretch",
  },
  leftRecipeNavView: {
    width: "50%",
    transform: [{ rotate: "90deg" }, { translateY: 89 }, { translateX: -2 }],
    alignItems: "flex-start",
  },
  rightRecipeNavView: {
    width: "50%",
    transform: [{ rotate: "-90deg" }, { translateY: 90 }, { translateX: 132 }],
    alignItems: "flex-start",
  },
  leftRecipeNavText: {
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "500",
    letterSpacing: 1,
  },
  rightRecipeNavText: {
    color: "rgba(112, 128, 144, 1)",
    fontWeight: "500",
    letterSpacing: 1,
  },
});

export default Cookbook;
