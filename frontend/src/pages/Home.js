import React from "react";
import { Link } from "react-router-dom";

const Home = props => {
  const handleJoinClicked = () => {
    window.location.href =
      "/" + document.querySelector("#session-code-input").value;
  };
  return (
    <>
      <section className="hero is-small">
        <div className="container hero-body">
          <p className="title">Class Questions</p>
          <p className="subtitle">Ask away</p>
        </div>
      </section>
      <section className="hero is-small">
        <div className="container hero-body">
          <p className="title">Join an active class session</p>
          <input
            style={{ width: "75%" }}
            id="session-code-input"
            className="input"
            type="text"
            placeholder="ABD142 - your six digit class code"
          />
          <button className="button" onClick={handleJoinClicked}>
            Join
          </button>
        </div>
      </section>
      <section className="hero is-small ">
        <div className="container hero-body">
          <Link to="/instructor-home" className="button is-primary is-large">
            {props.isSignedIn ? "Go to Dashboard" : "Sign In"}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
