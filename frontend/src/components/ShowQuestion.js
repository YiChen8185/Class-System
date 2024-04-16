/**
 * CS-5356-TODO
 * Show a question and upvote/dismiss it
 *
 * When a user clicks on the Upvote button,
 * make a PUT /api/class-session/:session-code/question/:question-id
 * to upvote the question.
 *
 * Only signed-in users should be able to dismiss the question
 *
 * If it completes successfully, call `props.onQuestionUpvoted()`
 * to tell the parent component to refresh the view
 */
const ShowQuestion = props => {
  const handleUpvote = questionId => {
    console.log("Upvoting questionId", questionId);
    fetch(`/api/class-session/${props.sessionCode}/question/${questionId}/upvote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        upvote: true
      })
    }).then(response => {
      if (response.ok) {
        console.log("ShowQuestion: Ok");
        props.onQuestionUpvoted();
      } else {
        console.log("ShowQuestion: Failed");
      }
    }
    );
  };

  return (
    <div
      style={{
        borderTop: "1px solid darkgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
      }}
    >
      <div>
        {!props.isSignedIn && (
          <button
          className="button"
          onClick={() => handleUpvote(props.question.id)}
          >
          <i className="material-icons">recommend</i>
        </button>
        )}
        {/* Instructor cannot upvote */}
        {/* <button
          className="button"
          onClick={() => handleUpvote(props.question.id)}
        >
          <i className="material-icons">recommend</i>
        </button> */}
      </div>
      <div style={{ marginLeft: "15px" }}>
        {props.question.question}
        
        {/* by {props.question.name}{" "} */}
        {props.question.name && (
        <span>
          <br />
          by {props.question.name} 
        </span>
        )}
        {/* Easier to See Vote. */}
        <br/>
        {props.question.upvotes ? `Votes: (${props.question.upvotes})` : ""}
      </div>
      {/* Does not need! */}
      {/* {props.isSignedIn && (
        <div style={{ marginLeft: "auto" }}>
          <button className="button is-danger">Dismiss</button>
        </div>
      )} */}
    </div>
  );
};

export default ShowQuestion;
