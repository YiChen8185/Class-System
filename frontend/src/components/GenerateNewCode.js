/**
 * CS-5356-TODO
 * Logged in users can click a button to generate a new
 * session code.
 *
 * When a user clicks the button, send a request to
 * POST /api/class/:classId/session-code. If it returns
 * successfully, call the `props.onCodeGenerated` callback
 * to tell the parent component to refresh the view
 */
const GenerateNewCode = props => {

  //8185
  const handleGenerate = () => {
    fetch("/api/class/" + props.classId + "/session-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("handleGenerate() Success:", data);
        props.onCodeGenerated();
      })
      .catch(err => {
        console.log("handleGenerate() Error:", err);
      });
};


  return (
    <div className="mt-5">
      <button className="button" onClick={handleGenerate}>
        Generate New Code
      </button>
    </div>
  );
};

export default GenerateNewCode;
