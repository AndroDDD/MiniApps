import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import configureStore from "../app/configureStore";
import history from "../history/history";
import { ConnectedRouter } from "connected-react-router";

import IndexPage from "../features/Interfaces/Default/IndexPage/IndexPage";
import CountdownTimer from "../features/Interfaces/Default/CountdownTimer/CountdownTimer";
import RandomQuiz from "../features/Interfaces/Default/RandomQuiz/RandomQuiz";
import Cookbook from "../features/Interfaces/Default/Cookbook/Cookbook";
import Notepad from "../features/Interfaces/Default/Notepad/Notepad";
import TodoList from "../features/Interfaces/Default/TodoList/TodoList";
import MoviesLibrary from "../features/Interfaces/Default/MoviesLibrary/MoviesLibrary";
import GitHubProfiles from "../features/Interfaces/Default/GitHubProfiles/GitHubProfiles";
import ArtPage from "../features/Interfaces/Default/ArtPage/ArtPage";
import PasswordGenerator from "../features/Interfaces/Default/PasswordGenerator/PasswordGenerator";
import WeatherDetector from "../features/Interfaces/Default/WeatherDetector/WeatherDetector";
import HamburgerExpansion from "../features/Interfaces/Default/HamburgerExpansion/HamburgerExpansion";
import ToastNotification from "../features/Interfaces/Default/ToastNotification/ToastNotification";
import AutoTextWriter from "../features/Interfaces/Default/AutoTextWriter/AutotextWriter"
import Popup from "../features/Interfaces/Default/Popup/Popup";
import RainingHearts from "../features/Interfaces/Default/RainingHearts/RainingHearts";
import BackgroundChanger from "../features/Interfaces/Default/BackgroundChanger/BackgroundChanger"
import DarkModeToggler from "../features/Interfaces/Default/DarkModeToggler/DarkModeToggler"
import Carousel from "../features/Interfaces/Default/Carousel/Carousel";
import SoundBoard from "../features/Interfaces/Default/SoundBoard/SoundBoard";
import Magnify from "../features/Interfaces/Default/Magnify/Magnify"
import HoldPage from "../features/Interfaces/Default/HoldPage/HoldPage";

import MobileIndexPage from "../features/Interfaces/Mobile/IndexPage/IndexPage";
import MobileArtPage from "../features/Interfaces/Mobile/ArtPage/ArtPage";
import MobileCookbook from "../features/Interfaces/Mobile/Cookbook/Cookbook";
import MobileCountdownTimer from "../features/Interfaces/Mobile/CountdownTimer/CountdownTimer";
import MobileGitHubProfiles from "../features/Interfaces/Mobile/GitHubProfiles/GitHubProfiles";
import {MobileNotePad} from "../features/Interfaces/Mobile/NotePad/NotePad";
import MobilePasswordGenerator from "../features/Interfaces/Mobile/PasswordGenerator/PasswordGenerator";
import MobileRandomQuiz from "../features/Interfaces/Mobile/RandomQuiz/RandomQuiz";
import MobileTodoList from "../features/Interfaces/Mobile/TodoList/TodoList";
import GenericPage from "../features/Interfaces/Mobile/GenericPage/GenericPage";

export const store = configureStore();

export const dataBaseUrl = ``;

function checkIfMobileBrowser() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

export const isMobile = checkIfMobileBrowser();

export const localUrl = isMobile ? `http://192.168.1.144:3000/`: `http://localhost:3000/`;


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

const RoutesComposed = () => {
  const token = localStorage.getItem("token");
  const expirationDate = Number(localStorage.getItem("expirationDate"));
  const currentTime = new Date().getTime();
  const authorized = token !== null && expirationDate >= currentTime;

  // Listening for Authorization of Session
  React.useEffect(() => {
    if (authorized) {
      console.log("Authorized");
    } else {
      console.log("UnAuthorized");
    }
  }, [authorized]);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              component={isMobile ? MobileIndexPage : IndexPage}
            />
            <Route
              exact
              path="/countdown-timer"
              component={isMobile ? MobileCountdownTimer : CountdownTimer}
            />
            <Route
              exact
              path="/random-quiz"
              component={isMobile ? MobileRandomQuiz : RandomQuiz}
            />
            <Route
              exact
              path="/cookbook"
              component={isMobile ? MobileCookbook : Cookbook}
            />
            <Route
              exact
              path="/notepad"
              component={isMobile ? MobileNotePad : Notepad}
            />
            <Route
              exact
              path="/todo-list"
              component={isMobile ? MobileTodoList : TodoList}
            />
            <Route
              exact
              path="/movies-library"
              component={isMobile ? MoviesLibrary : MoviesLibrary}
            />
            <Route
              exact
              path="/github-profiles"
              component={isMobile ? MobileGitHubProfiles : GitHubProfiles}
            />
            <Route
              exact
              path="/art-board"
              component={isMobile ? MobileArtPage : ArtPage}
            />
            <Route
              exact
              path="/password-generator"
              component={isMobile ? MobilePasswordGenerator : PasswordGenerator}
            />
            <Route
              exact
              path="/weather-detector"
              component={isMobile ? WeatherDetector : WeatherDetector}
            />
            <Route
              exact
              path="/hamburger-expansion"
              component={isMobile ? HamburgerExpansion : HamburgerExpansion}
            />
            <Route
              exact
              path="/toast-notification"
              component={isMobile ? ToastNotification : ToastNotification}
            />
            <Route
              exact
              path="/auto-text-writer"
              component={isMobile ? AutoTextWriter : AutoTextWriter}
            />
            <Route
              exact
              path="/popup"
              component={isMobile ? Popup: Popup}
            />
            <Route
              exact
              path="/raining-hearts"
              component={isMobile ? RainingHearts: RainingHearts}
            />
            <Route
              exact
              path="/background-changer"
              component={isMobile ? BackgroundChanger: BackgroundChanger}
            />
            <Route
              exact
              path="/dark-mode-toggler"
              component={isMobile ? DarkModeToggler:DarkModeToggler}
            />
            <Route
              exact
              path="/carousel"
              component={isMobile ? Carousel: Carousel}
            />
            <Route
              exact
              path="/sound-board"
              component={isMobile ? SoundBoard: SoundBoard}
            />
            <Route
              exact
              path="/magnify"
              component={isMobile ? Magnify: Magnify}
            />
            <ProtectedRoute
              path="/protected"
              component={isMobile ? GenericPage : HoldPage}
            />
          </Switch>
        </Router>
      </ConnectedRouter>
    </Provider>
  );
};

export default class RouterBlock extends React.Component {
  render() {
    return <RoutesComposed />;
  }
}
