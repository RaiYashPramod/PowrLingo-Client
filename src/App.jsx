import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./components/Login";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import Quiz from "./pages/Quiz";
import AddQuestion from "./pages/AddQuestion";
import LeadearBoard from "./pages/LeadearBoard";
import PropTypes from "prop-types";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

const App = () => {
  // State variables
  const [loggedIn, setLoggedIn] = useState(false); // To track user login status
  const [userEmail, setUserEmail] = useState(""); // To store user email input
  const [userPassword, setUserPassword] = useState(""); // To store user password input
  const [loading, setLoading] = useState(true); // To handle loading state
  const [loginLoading, setLoginLoading] = useState(false)

  // Get the user's token from local storage
  const token = JSON.parse(localStorage.getItem("token"));

  // Function to verify the user's token on component mount
  const verifyToken = async () => {
    
    if (!token) {
      setLoading(false); // Set loading to false when there's no token
      return setLoggedIn(false); // Set loggedIn to false when there's no token
    }

    try {
      // Set the Authorization header with the token
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `https://pear-lucky-panda.cyclic.cloud/api/users/verify`
      );

      // If the token is valid, log the user in; otherwise, log them out
      response.data.ok ? login(token) : logout();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    // Function to verify user token and set login status
    verifyToken();
  }, []); // Run this effect only on component mount

  // Function to log in the user
  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setLoggedIn(true);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  // Function to handle user sign-in
  const signIn = async (email, password) => {
    setLoginLoading(true)
    try {
      const res = await axios.post(
        `https://pear-lucky-panda.cyclic.cloud/api/users/login`,
        {
          email,
          password,
        }
      );

      // If a valid token is received, display a success toast and log in the user
      if (res.data.token) {
        login(res.data.token);
        // setLoginLoading(true)
        toast.success("Welcome Back!");
      } else {
        // If no valid token, display an error toast'
        toast(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setLoginLoading(true)
      toast.error("An error occurred during login.");
    } finally {
      setLoginLoading(false)
    }
  };

  // Function to handle email input
  const enterEmail = (e) => {
    setUserEmail(e.target.value);
  };

  // Function to handle password input
  const enterPassword = (e) => {
    setUserPassword(e.target.value);
  };

  // Function to handle email submission
  const formSubmit = (e) => {
    e.preventDefault();
    signIn(userEmail, userPassword);
    setUserEmail("");
    setUserPassword("");
  };

  // While loading, display a loading message
  if (loading) {
    return (
      <Loading />
    );
  }

  // Define a protected route component to handle user authentication
  const ProtectedRoute = ({ element }) => {
    return loggedIn ? element : <Navigate to="/login" replace={true} />;
  };

  ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
  };

  return (
    <>
      {loggedIn && <Navbar />}
      {/* Render the Navbar component when logged in */}
      <Routes>
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Login
                onEmailChange={enterEmail}
                onPasswordChange={enterPassword}
                onSubmit={formSubmit}
                email={userEmail}
                password={userPassword}
                loading={loginLoading}
              />
            )
          }
        />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} exact />
        <Route
          path="/user"
          element={<ProtectedRoute element={<UserProfile />} />}
          exact
        />
        <Route
          path="/quiz"
          element={<ProtectedRoute element={<Quiz />} />}
          exact
        />
        <Route
          path="/add-question"
          element={<ProtectedRoute element={<AddQuestion />} />}
          exact
        />
        <Route
          path="/leaderboard"
          element={<ProtectedRoute element={<LeadearBoard />} />}
          exact
        />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </>
  );
};

export default App;
