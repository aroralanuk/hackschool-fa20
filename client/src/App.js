import "./App.css";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import CreatePokemon from "./pages/CreatePokemon";
import ViewPokemon from "./pages/ViewPokemon";
import Landing from "./pages/landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            {/* <Redirect from="/" to="/create" exact></Redirect> */}
            <Route path="/" exact component={Landing}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <PrivateRoute
              path="/create"
              exact
              component={CreatePokemon}
            ></PrivateRoute>
            <PrivateRoute
              path="/view"
              exact
              component={ViewPokemon}
            ></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
