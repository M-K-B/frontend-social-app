import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./components/register";
import Login from "./components/login";
import { UserProvider, UserContext } from './Contexts/UserContext';
import Home from "./components/Home";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/Login">
              <Login />
            </Route>

            <Route path="/Signup">
              <RegisterForm />
            </Route>

            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}
