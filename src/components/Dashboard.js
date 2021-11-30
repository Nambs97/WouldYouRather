import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleReceiveQuestions } from "../actions/questions";
import Question from "./Question";

function Dashboard(props) {
  const { questionsArray, answeredQuestions } = props;

  const [unansweredView, setUnansweredView] = useState(true);

  const handleOnViewChange = (e) => {
    if (e.target.value === "unanswered") {
      setUnansweredView(true);
    } else {
      setUnansweredView(false);
    }
  };

  useEffect(() => {
    props.dispatch(handleReceiveQuestions());
  }, []);

  return (
    <div className="dashboard-card">
      <div className="dashboard-view-toggle-container">
        <input
          className="dashboard-view-toggle-radio"
          type="radio"
          name="question-view"
          id="unanswered"
          value="unanswered"
          checked={unansweredView}
          onChange={handleOnViewChange}
        />
        <label
          className={`dashboard-view-toggle-label${
            unansweredView ? " selected" : ""
          }`}
          htmlFor="unanswered"
        >
          Unanswered Questions
        </label>
        <input
          className="dashboard-view-toggle-radio"
          type="radio"
          name="question-view"
          id="answered"
          value="answered"
          checked={!unansweredView}
          onChange={handleOnViewChange}
        />
        <label
          className={`dashboard-view-toggle-label${
            !unansweredView ? " selected" : ""
          }`}
          htmlFor="answered"
        >
          Answered Questions
        </label>
      </div>
      {questionsArray
        .filter((question) =>
          unansweredView
            ? !answeredQuestions.includes(question.id)
            : answeredQuestions.includes(question.id)
        )
        .map((question) => (
          <Question key={question.id} qid={question.id} />
        ))}
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    questionsArray: Object.values(questions).sort(
      (a, b) => questions[b.id].timestamp - questions[a.id].timestamp
    ),
    answeredQuestions: Object.keys(users[authedUser].answers)
  };
};

export default connect(mapStateToProps)(Dashboard);
