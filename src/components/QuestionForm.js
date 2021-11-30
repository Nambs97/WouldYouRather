import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  handleReceiveAnswer,
  handleReceiveQuestions
} from "../actions/questions";
import { answerQuestion } from "../actions/users";
import { useParams, Navigate } from "react-router-dom";
import QuestionResult from "./QuestionResult";
import SignIn from "./SignIn";
import Page404 from "./404";

function QuestionForm(props) {
  const { authedUser, users, questions } = props;
  const { qid } = useParams();
  const question = questions[qid];
  let questionVoteUsers;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    props.dispatch(handleReceiveQuestions());
  }, []);

  if (question !== undefined) {
    questionVoteUsers = question.optionOne.votes.concat(
      question.optionTwo.votes
    );
    if (questionVoteUsers.includes(authedUser)) {
      return <QuestionResult qid={qid} />;
    }
  }

  const handleOnChangeOption = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleOnSubmitAnswer = (e) => {
    e.preventDefault();
    props.dispatch(handleReceiveAnswer(authedUser, qid, selectedAnswer));
    props.dispatch(answerQuestion(authedUser, qid, selectedAnswer));
  };

  /*if (question === undefined && authedUser === null) {
    return <SignIn />;
  }*/

  return (
    <div className="question-form-container">
      {authedUser === null ? (
        <SignIn />
      ) : (
        <div>
          {question !== undefined ? (
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
                  <h6 className="question-card-main-content-title">
                    Would You Rather ...
                  </h6>
                  <form>
                    <input
                      type="radio"
                      name="answer-options"
                      id="optionOne"
                      value="optionOne"
                      checked={selectedAnswer === "optionOne"}
                      onChange={handleOnChangeOption}
                    />
                    <label
                      className="question-form-radio-label"
                      htmlFor="optionOne"
                    >
                      {question.optionOne.text}
                    </label>
                    <br />
                    <input
                      type="radio"
                      name="answer-options"
                      id="optionTwo"
                      value="optionTwo"
                      checked={selectedAnswer === "optionTwo"}
                      onChange={handleOnChangeOption}
                    />
                    <label
                      className="question-form-radio-label"
                      htmlFor="optionTwo"
                    >
                      {question.optionTwo.text}
                    </label>
                    <br />
                    <button
                      className="question-form-submit-button"
                      disabled={selectedAnswer === ""}
                      onClick={handleOnSubmitAnswer}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <Page404 />
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    users,
    questions
  };
};

export default connect(mapStateToProps)(QuestionForm);
