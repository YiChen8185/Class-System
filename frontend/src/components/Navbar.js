import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <nav className="navbar" style={{ paddingTop: "5px" }}>
      <div
        className="container"
        style={{ paddingLeft: "32px", paddingRight: "32px" }}
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <figure className="image">
              <img
                className="is-rounded"
                src="https://bulma.io/images/placeholders/64x64.png"
                alt="Logo"
              />
            </figure>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {props.isSignedIn && (
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link to="/instructor-home" className="navbar-item">
                <i className="material-icons">person_outline</i>
                <div>{props.username}</div>
              </Link>
              <a className="button mt" href="/logout">
                Logout
              </a>
            </div>
          </div>
        )}
        {!props.isSignedIn && (
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <a href="/instructor-home" className="button is-primary">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
