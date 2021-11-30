import React from "react";
import { connect } from "react-redux";

function QuestionResult(props) {
  const { users, question, questionAnswer } = props;

  return (
    <div>
      {question !== undefined && (
        <div className="question-result-container">
          <div className="question-card">
            <div className="question-card-header">
              <h5>Asked by {users[question.author].name}</h5>
            </div>
            <div className="question-card-main">
              <div className="question-card-main-avatar">
                <img
                  src={users[question.author].avatarURL}
                  alt={`Avatar of ${question.author}`}
                />
              </div>
              <div className="question-card-main-content">
                <h6 className="question-card-main-content-title">Results:</h6>
                <div
                  className={
                    "question-card-main-content-result" +
                    (questionAnswer === "optionOne" ? " my-answer" : "")
                  }
                >
                  {questionAnswer === "optionOne" && (
                    <span className="question-card-main-content-result-badge">
                      Your vote
                    </span>
                  )}
                  <h6 className="question-card-main-content-result-title">
                    Would you rather {question.optionOne.text}?
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width:
                          (question.optionOne.votes.length /
                            (question.optionOne.votes.length +
                              question.optionTwo.votes.length)) *
                            100 +
                          "%"
                      }}
                      aria-valuenow={
                        (question.optionOne.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                        100
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="progress-label">
                        {Math.round(
                          (question.optionOne.votes.length /
                            (question.optionOne.votes.length +
                              question.optionTwo.votes.length)) *
                            100 *
                            100
                        ) / 100}
                        %
                      </span>
                    </div>
                  </div>
                  <h6 className="question-card-main-content-result-votes">
                    {`${question.optionOne.votes.length} out of ${
                      question.optionOne.votes.length +
                      question.optionTwo.votes.length
                    } votes`}
                  </h6>
                </div>
                <div
                  className={
                    "question-card-main-content-result" +
                    (questionAnswer === "optionTwo" ? " my-answer" : "")
                  }
                >
                  {questionAnswer === "optionTwo" && (
                    <span className="question-card-main-content-result-badge">
                      Your vote
                    </span>
                  )}
                  <h6 className="question-card-main-content-result-title">
                    Would you rather {question.optionTwo.text}?
                  </h6>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width:
                          (question.optionTwo.votes.length /
                            (question.optionOne.votes.length +
                              question.optionTwo.votes.length)) *
                            100 +
                          "%"
                      }}
                      aria-valuenow={
                        (question.optionTwo.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                        100
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="progress-label">
                        {Math.round(
                          (question.optionTwo.votes.length /
                            (question.optionOne.votes.length +
                              question.optionTwo.votes.length)) *
                            100 *
                            100
                        ) / 100}
                        %
                      </span>
                    </div>
                  </div>
                  <h6 className="question-card-main-content-result-votes">
                    {question.optionTwo.votes.length} out of{" "}
                    {question.optionOne.votes.length +
                      question.optionTwo.votes.length}{" "}
                    votes
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, { qid }) => {
  const question = questions[qid];
  const questionAnswer = users[authedUser]["answers"][qid];
  return {
    authedUser,
    users,
    question,
    questionAnswer
  };
};

export default connect(mapStateToProps)(QuestionResult);
