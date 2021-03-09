import "./App.css";
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

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            {/* <Redirect from="/" to="/create" exact></Redirect> */}
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/create" exact component={CreatePokemon}></Route>
            <Route path="/view" exact component={ViewPokemon}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
