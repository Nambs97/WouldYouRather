import React, { useState } from "react";
import { connect } from "react-redux";
import { handleCreateQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";

function NewQuestion(props) {
  const { authedUser } = props;
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    switch (e.target.name) {
      case "optionOne":
        setOptionOne(e.target.value);
        break;
      case "optionTwo":
        setOptionTwo(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    props.dispatch(handleCreateQuestion(optionOne, optionTwo, authedUser));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
    <div className="new-question-container">
      {authedUser !== null ? (
        <div className="question-card new-question-card">
          <div className="question-card-header new-question-card-header">
            <h2>Create New Question</h2>
          </div>
          <div className="new-question-card-main">
            <h6>Complete the question:</h6>
            <h5 className="new-question-card-main-pretext">
              Would you rather ...
            </h5>
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="optionOne"
                  placeholder="Enter Option One Text Here"
                  value={optionOne}
                  onChange={handleTextChange}
                />
              </div>

              <div className="new-question-or-separator">OR</div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="optionTwo"
                  placeholder="Enter Option Two Text Here"
                  value={optionTwo}
                  onChange={handleTextChange}
                />
              </div>

              <br />
              <button
                className="question-form-submit-button"
                onClick={handleQuestionSubmit}
                disabled={optionOne === "" || optionTwo === ""}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(NewQuestion);
