import { showLoading, hideLoading } from "react-redux-loading";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "../utils/_DATA";
import { addQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const RECEIVE_ANSWER = "RECEIVE_ANSWER";

function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function handleReceiveQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getQuestions()
      .then((questions) => {
        dispatch(receiveQuestions(questions));
      })
      .then(() => dispatch(hideLoading()));
  };
}

function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question
  };
}

export function handleCreateQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(createQuestion(question));
        dispatch(addQuestion(author, question.id));
      })
      .then(() => dispatch(hideLoading()));
  };
}

function receiveAnswer(authedUser, qid, answer) {
  return {
    type: RECEIVE_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleReceiveAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(receiveAnswer(authedUser, qid, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}
