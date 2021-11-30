import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Question(props) {
  const { users, question } = props;
  return (
    <div className="question-card">
      <div className="question-card-header">
        <h5>{users[question.author].name} asks:</h5>
      </div>
      <div className="question-card-main">
        <div className="question-card-main-avatar">
          <img
            src={users[question.author].avatarURL}
            alt={`Avatar of ${question.author}`}
          />
        </div>
        <div className="question-card-main-content">
          <h6 className="question-card-main-content-title">Would you rather</h6>
          <p>...{question.optionOne.text.substring(0, 15)}...</p>
          <Link
            className="question-card-main-content-link"
            to={`/questions/${question.id}`}
          >
            View Poll
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users, questions }, { qid }) => {
  const question = questions[qid];
  return {
    users,
    question
  };
};

export default connect(mapStateToProps)(Question);
