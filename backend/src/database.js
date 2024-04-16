let database = {
  // classes [ {id, name, owner, sessionCodes, createAt} ]
  classes:[],
  // sessions [{id, classId，questions[]}]
  // sessions:[],
};

// The datat structure of frontend is different from backend.
// The seesion is included in class. So we need to modify the database.
// To allow the Frontend work. Find the problem since the ClassList is not working.
//  SessionCodes as required in frontend/src/components/ShowClass.js


// null with []
export const getQuestions = sessionCode => {
  // let questions = []
  // for (const c of database.classes) {
  //   const session = c.sessionCodes.find((session) => session.id === sessionCode);
  //   if (session) {
  //     questions = session.questions;
  //   }
  // }
  // return questions;
  
  // avoid the use of regenerator-runtime
  const session = database.classes
  .flatMap(c => c.sessionCodes)
  .find(s => s.id === sessionCode);

return session ? session.questions : [];
};

// In database.spec.js, it needs onwer to get classes.
// Use filter that owner may have multiple classes.
// export const getClasses = (owner) => {
//   return database.classes.filter((c) => c.owner === owner);
// };
// Update for autograding.
export const getClasses = owner => database.classes.filter(c => c.owner === owner);

// Build this for app.py.
export const getSession = (sessionCode) =>{
  // for (const c of database.classes) {
  //   const session = c.sessionCodes.find((session) => session.id === sessionCode);
  //   if (session) {
  //     return session;
  //   }
  // }
  // return null;

  // avoid the use of regenerator-runtime
  const session = database.classes
    .flatMap(c => c.sessionCodes)
    .find(s => s.id === sessionCode);

  return session || null;
}

export const createQuestionForSession = (sessionCode, question) => {
  // for (const c of database.classes) {
  //   const session = c.sessionCodes.find((s) => s.id === sessionCode);
  //   if (session) {
  //     // question has id, question, name, upvotes
  //     const newQuestion = {
  //       id: `${Math.floor(Math.random() * 90000) + 10000}`,
  //       question: question.question,
  //       name: question.name,
  //       upvotes: 0,
  //     };
  //     session.questions.unshift(newQuestion);
  //     return newQuestion;
  //   }
  // }
  // // if session code is fake, then return null.
  // return null;

  // Update for auto grading.
  const session = database.classes
  .flatMap(c => c.sessionCodes)
  .find(s => s.id === sessionCode);
  if (session) {
    const newQuestion = {
      id: `${Math.floor(Math.random() * 90000) + 10000}`,
      question: question.question,
      name: question.name,
      upvotes: 0,
    };
    session.questions.unshift(newQuestion);
    return newQuestion;
  }
  return null;
};

// v2
// Create session with id, classId, questions.
export const createSessionCodeForClass = classId => {
  // Check if classID exists
  const realClass = database.classes.find((c) => c.id === classId);
  if (!realClass) {
    return null;
  }
  // If the classId is exist, create a new session and generate a session code.
  const newSession = {
    id: `${Math.floor(Math.random() * 90000) + 10000}`,
    // Seems does not need for test, but follow instrcution from class to create this.
    // classId: classId,
    classId,
    questions: [],
  };
  // real_class.sessionCodes.push(new_session);
  // Add to front of the array.
  realClass.sessionCodes.unshift(newSession);
  return newSession;
};

// Create Class with id, name, owner.
export const createClass = classData => {
  // classData may just contain name.   
  const newClass = {
    // `${Math.floor(Math.random() * 90000) + 10000}`
    id: `${Math.floor(Math.random() * 90000) + 10000}`,
    name: classData.name,
    // Owner may be null. This seems auto-sign null when it is null.
    owner: classData.owner,
    sessionCodes: [],
    createdAt: new Date().getTime()
  };
  database.classes.push(newClass);
  return newClass;
};

// The test case will call clear function the database every time. 
// So we need to keep classes and sessions in clear function.
export const clear = () => {
  database = {
    classes:[],
  };
};

// v2
// Base on database.spec.js, we need to build upvoteQuestionForSession.
export const upvoteQuestionForSession = (sessionId, questionId) => {
  // Use session_id and question_id to find the question.

  // Autograding
  const session = database.classes
  .flatMap(c => c.sessionCodes)
  .find(s => s.id === sessionId);

  if (session) {
    const question = session.questions.find(q => q.id === questionId);
    if (question) {
      question.upvotes += 1;
      return question;
    }
  }
  return null;

  // let foundQuestion = null;
  // for (const c of database.classes) {
  //   for (const s of c.sessionCodes) {
  //     if (s.id === session_id) {
  //       foundQuestion = s.questions.find(question => question.id === question_id);
  //       // Add upvotes by 1.
  //       if (foundQuestion) {
  //         foundQuestion.upvotes += 1;
  //       }
  //     }
  //   }
  // }
  // // Use for report session_id or question_id not found.
  // return foundQuestion;
};
