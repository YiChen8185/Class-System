import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListQuestions from "./../components/ListQuestions";
import CreateQuestion from "./../components/CreateQuestion";


console.log("ClassSessionPage component is being executed");
/**
 * CS-5356-TODO
 * Allow users to ask questions, and view
 * other questions in the class session.
 *
 * When this component first loads, grab the questions
 * for this session code by making a
 * GET /api/class-session/:session-code request
 *
 * If it is successful, save the questions from the request
 * into the state.
 *
 * If a user submits a question or a question on the list
 * is upvoted, reload the latest questions from the server
 */
const ClassSessionPage = props => {
  const [questions, setQuestions] = useState([]);
  // get the session code from the URL
  const { sessionCode } = useParams();

  const onQuestionCreated = () => {
    console.log("[CS5356] On question created. questionsData" + questions);
    reloadPage();
  };

  const onQuestionUpvoted = () => {
    console.log("[CS5356] On question upvoted");
    reloadPage();
  };

  useEffect(() => {
    reloadPage();
  }, []);

  const reloadPage = () => {
    fetch(`/api/class-session/${sessionCode}`)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("ClassSessionPage Load Success:", data);
          setQuestions(data["questions"]);
        })
      } else {
        console.log("ClassSessionPage Load Failed");
      }
    })
  };


  return (
    <section>
      <div className="container">
        {/* <CreateQuestion
          sessionCode={sessionCode}
          onQuestionCreated={onQuestionCreated}
        /> */}
        {/* Instructor cannot ask question. */}
        {!props.isSignedIn && (
          <CreateQuestion
          sessionCode={sessionCode}
          onQuestionCreated={onQuestionCreated}
          />
        )}
        {props.isSignedIn && (
          <p>Instructor version<br />logout to ask question</p>
        )}  
      </div>
      <div className="container">
        <ListQuestions
          sessionCode={sessionCode}
          questions={questions}
          isSignedIn={props.isSignedIn}
          onQuestionUpvoted={onQuestionUpvoted}
        />
      </div>
    </section>
  );
};

export default ClassSessionPage;
