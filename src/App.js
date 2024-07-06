// App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./components/register";
import Login from "./components/login";

import Home from "./components/Home";





export default function App() {
  return (
    
      <Router>
        <div>
        
          <Switch>

          
          
           
            <Route path="/Login">
              <Login />
            </Route>

            <Route path="/Signup">
              <RegisterForm />
            </Route>
           


            <Route path="/" >
              <Home />
            </Route>

            
            
            
          </Switch>
        </div>
      </Router>
   
  );
}


