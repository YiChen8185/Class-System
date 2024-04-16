import ShowClass from "./ShowClass";

const ListClasses = props => {
  console.log("ListClasses Called: classes = ", props.classes);
  return (
    <>
      <div className="has-text-centered mb-5">
        <h1 className="title">Classes</h1>
      </div>
      <div
        style={{
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        {props.classes.length === 0 && <div>No Classes</div>}
        {props.classes.length > 0 &&
          props.classes.map((classInfo, index) => {
            return (
              <ShowClass
                key={index}
                classInfo={classInfo}
                onCodeGenerated={props.onCodeGenerated}
              />
            );
          })}
      </div>
    </>
  );
};

export default ListClasses;
