import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import InstructorHomePage from "./pages/InstructorHomePage";
import ClassSessionPage from "./pages/ClassSessionPage";
import Navbar from "./components/Navbar";

/**
 * CS-5356-TODO
 * App contains all the pages for this web application
 *
 * There are 4 pages
 * - /login
 * - /logout
 * - /instructor-home
 * - /:session-code
 *
 * When the App loads for the first time, make a
 * GET /api/user to see if the user is signed in.
 *
 * If you receive a 401, set the isSignedIn state
 * to false.
 *
 * If you receive a 200, set the isSignedIn state to true
 * and then set the user state to the user object
 * from the response of the request.
 *
 */
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const requiresLogin = Component => {
    return isSignedIn ? Component : <Navigate to="/login" />;
  };

  useEffect(() => {
    console.log("[CS5356] Loading App for the first time");
    fetch("/api/user")
      .then(response => {
        if (response.ok) {
          console.log("App.js: Login successful");
          response.json().then(data => {
            console.log("Success:", data);
            setIsSignedIn(true);
            setUser(data);
          })  
        } else {
          console.log("App.js: Login failed");
        }
      })
  }, []);

  return (
    <div>
      <Router>
        <Navbar isSignedIn={isSignedIn} username={user?.userId ?? null} />
        <Routes>
          <Route
            path="/instructor-home"
            element={requiresLogin(<InstructorHomePage />)}
          />
          <Route
            path="/login"
            element={
              <LoginPage
                onLogin={() => {
                  setIsSignedIn(true);
                }}
              />
            }
          />
          <Route
            path="/:sessionCode"
            element={<ClassSessionPage isSignedIn={isSignedIn} />}
          />
          <Route exact path="/logout" element={<LogoutPage />} />
          <Route exact path="/" element={<Home isSignedIn={isSignedIn} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
