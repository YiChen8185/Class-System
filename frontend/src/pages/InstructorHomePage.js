import React, { useEffect, useState } from "react";
import ListClasses from "../components/ListClasses";
import CreateClass from "../components/CreateClass";
// import GenerateNewCode from "../components/GenerateNewCode";

/**
 * CS-5356-TODO
 * Show classes on the Instructor Home Page
 *
 * When this component loads for the first time,
 * load the users classes with a GET /api/classes.
 * Save it to the component state.
 *
 * Users can create new class codes, and classes from this page.
 * When a class code is generated or a new class is created,
 * reload and display the updated list of the user's classes.
 */
const InstructorHomePage = props => {
  const [classes, setClasses] = useState([]);

  const onCodeGenerated = () => {
    fetch("/api/classes")
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("onClassCreated() Success:", data);
          setClasses(data["classes"]);
        })  
      } else {
        console.log("InstructorHomePage.js: Reloading failed");
      }
    })    
  };

  useEffect(() => {
    fetch("/api/classes")
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("onClassCreated() Success:", data);
          setClasses(data["classes"]);
        })  
      } else {
        console.log("InstructorHomePage.js: Reloading failed");
      }
    })    
  }, []);


  const onClassCreated = () => {
    fetch("/api/classes")
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("onClassCreated() Success:", data);
          setClasses(data["classes"]);
        })  
      } else {
        console.log("InstructorHomePage.js: Reloading failed");
      }
    })    
  };

  // const onSessionCreated = () => {};

  // useEffect(() => {
  //   fetch('/api/classes')
  //     .then(response => {
  //       if (response.ok) {
  //         response.json().then(data => {
  //           setClasses(data);
  //           console.log("useEffect() Success:", data);
  //           console.log("classes info", classes);
  //         });
  //       } else {
  //         console.log('InstructorHomePage.js: Loading failed');
  //       }
  //     });
  // }, []);

  return (
    <>
      <section>
        <div className="container">
          <ListClasses classes={classes} onCodeGenerated={onCodeGenerated} />
        </div>
      </section>
      <section>
        <div className="container">
          <CreateClass onClassCreated={onClassCreated} />
        </div>
      </section>
      {/* Set Up Create Sessions */}
      {/* <section>
        <div className="container">
          <GenerateNewCode onSessionCreated={onSessionCreated} />
        </div>
      </section> */}
    </>
  );
};

export default InstructorHomePage;
