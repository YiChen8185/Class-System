import React, { useState } from "react";
/**
 * CS-5356-TODO
 * Create a question for a class session
 *
 * A user can provide the content of their question,
 * and their name. When they submit the form, make a
 * POST /api/class-session/:session-code/question
 * with the value of their inputs in the body of
 * the request.
 *
 * If it is successful, call `props.onQuestionCreated()`
 * to tell the parent component to refresh the view
 */
const CreateQuestion = props => {
  //8185
  const [question, setQuestion] = useState([]);
  const [name, setName] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("CreateQuestion handleSubmit");
    fetch(`/api/class-session/${props.sessionCode}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question,
        name: name
      })
    }).then(response => {
      if (response.ok) {
        console.log("CreateQuestion: Ok");
        props.onQuestionCreated();
      } else {
        console.log("CreateQuestion: Failed");
      }
    });
  };
  return (
    <>
      <div className="has-text-centered">
        <h1 className="title">Ask a Question</h1>
      </div>
      <form
        className="is-flex is-flex-direction-column is-align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="field" style={{ width: "50%" }}>
          <label className="label" htmlFor="question">
            Type your question
          </label>
          <div className="control">
            {/* Add an input for the user to type in text */}
            <input 
              className="question" 
              name="input" 
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>
        </div>
        <div className="field" style={{ width: "50%" }}>
          <label className="label" htmlFor="name">
            Name (optional)
          </label>
          {/* Add an input for the user's name */}
          <input 
            className="name" 
            name="input" 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <div className="control">
            {/* Add an input to submit the form  */}
            <input type="submit" className="button is-primary" />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateQuestion;
