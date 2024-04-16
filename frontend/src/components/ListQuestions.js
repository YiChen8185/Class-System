import ShowQuestion from "./ShowQuestion";

const ListQuestions = props => {
  return (
    <section className="mt-5">
      <div className="container">
        <div className="has-text-centered columns">
          <div className="column">
            <h1 className="title">Current Questions</h1>
          </div>
        </div>
        <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
          {props.questions.length === 0 && <div>No questions yet</div>}
          {props.questions.length > 0 &&
            props.questions
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((question, index) => (
                <ShowQuestion
                  key={index}
                  question={question}
                  sessionCode={props.sessionCode}
                  isSignedIn={props.isSignedIn}
                  onQuestionUpvoted={props.onQuestionUpvoted}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ListQuestions;
