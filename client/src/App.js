import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Main from "./containers/Main";
import "./App.css";
import Jumbotron from './components/Jumbotron';
import HomeImages from './HomeImages.json';
import HomeCards from './components/HomeCards';
//import Dashboard from "./containers/Dashboard";

import Navbar from "./components/Navbar";

const App = () => (
  <Router>
    <div className="background">
      <Navbar/>
      <div>
 
 <Jumbotron />

<div className="row">
 <div className="col">
   <div className="card-group">
     {this.state.HomeImages.map(image => (
       <Popover
         isOpen={this.state.isOpen}
         position={'top'}
         content = {(<div>{image.body}</div>)}
       >
       <HomeCards
         onClick = {() => this.setState({ isOpen: true})}
         key={image.name}
         image={image.image}
         name={image.name}
       />
       </Popover>
     ))}
   </div>
 </div>
</div>

<div className="row">

</div>

</div>
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
