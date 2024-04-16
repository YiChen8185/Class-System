import { useState, useEffect } from "react";
import GenerateNewCode from "./GenerateNewCode";

const ShowClass = props => {
  
  const [currentlySelectedCode, setCurrentlySelectedCode] = useState(
    props.classInfo.sessionCodes[0]
  );

  useEffect(() => {
    const sessionCodes = props.classInfo.sessionCodes;
    if (sessionCodes && sessionCodes.length > 0) {
      setCurrentlySelectedCode(sessionCodes[0]);
    }
    
  }, [props.classInfo]);

  const getSessionCodeById = id => {
    return props.classInfo.sessionCodes.find(code => code.id === id);
  };

  return (
    <div
      style={{
        borderTop: "1px solid darkgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <div className="content">
        <h2>Class: {props.classInfo.name}</h2>
        {props.classInfo.sessionCodes.length > 0 && (
          <div>
            {currentlySelectedCode && (
              <div>
                {/* Original will go to class id. I believe it should go to sessionID */}
                <a href={`/${currentlySelectedCode.id}`}>
                  View questions for {currentlySelectedCode.id}
                </a>
                <p>
                  Created at:{" "}
                  {new Date(currentlySelectedCode.createdAt).toString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {props.classInfo.sessionCodes.length > 0 && currentlySelectedCode && (
        <div>
          <div>Previous Sessions</div>
          <div className="select">
            <select
              value={currentlySelectedCode.id}
              onChange={e => {
                console.log(e);
                setCurrentlySelectedCode(getSessionCodeById(e.target.value));
              }}
            >
              {props.classInfo.sessionCodes
                .sort((a, b) => b.createdAt - a.createdAt)
                .map(sessionCode => (
                  <option key={sessionCode.id} value={sessionCode.id}>
                    {sessionCode.id}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
      <GenerateNewCode
        classId={props.classInfo.id}
        onCodeGenerated={props.onCodeGenerated}
      />
    </div>
  );
};
export default ShowClass;
