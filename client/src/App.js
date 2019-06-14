import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt,Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Signup from './Signup';
import Login from './UserLogin';
import AdminLogin from "./AdminLogin";
import User from "./User";


class App extends Component {
  state = {
    loggedIn:false
  }
  loginHandle = () => {
    this.setState(prevState => ({
     loggedIn: !prevState.loggedIn  
    }))
  }
  render() {
    return (
      <Router>
   <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">Task</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <NavLink className="nav-link" to="/" exact >User</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link"  to="/AdminLogin" exact >Admin</NavLink>
          </li>
            </ul>
        </div>
        </nav>
      
        {/* <input type="button" value={this.state.loggedIn ? 'log out': 'log in'} onClick={this.loginHandle.bind(this)}/> */}
      <Switch>
        <Route path="/" exact strict component={Signup} />
        <Route path="/AdminLogin" exact strict component={AdminLogin} />
        <Route path="/UserLogin" exact strict component={Login} />
        <Route path="/:id" exact strict component={User} />
        </Switch>
  </div>
      </Router>
    );
  }
}

export default App;
