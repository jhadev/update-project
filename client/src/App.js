import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Main from "./containers/Main";
import "./App.css";
//import Dashboard from "./containers/Dashboard";

import Navbar from "./components/Navbar";

const App = () => (
  <Router>
    <div className="background">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={Main} />
      </Switch>
    </div>
  </Router>
);

export default App;
