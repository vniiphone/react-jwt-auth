import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { withRouter } from 'react-router-dom';

import AuthService from "./services/auth.service";

import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Home from "./components/home.component";
import Profile from "./components/users/profile.component";
import BoardUser from "./components/users/board-user.component";
import BoardModerator from "./components/users/board-moderator.component";
import BoardAdmin from "./components/users/board-admin.component";
import EventBus from "./common/EventBus";
import authVerify from "./common/auth-verify";
import Navbar from "./layout/Navbar"
import TourList from "./pages/Tour";
import Category from "./pages/Category";
import ThemTour from "./components/tours/ThemTour";
import UpdateTour from "./components/tours/UpdateTour";



class App extends Component {
  constructor (props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user)
    {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const { match } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark p-md-1">
          <Navbar />
          <Link to={"/"} className="navbar-brand">
            Booking Tour
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

        </nav>

        <div className="container mt-3">

          <Routes >

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/tour" element={<TourList />} />
            <Route path="/category" element={<Category />} />
            <Route path="/ThemTour" element={<ThemTour />} />
            <Route path="/EditTour/:id" element={<UpdateTour />} />
          </Routes>
        </div>

        {/* <authVerify logOut={this.logOut} /> */}
      </div>
    );
  }
}

export default (App);
