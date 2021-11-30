import { showLoading, hideLoading } from "react-redux-loading";
import { _getUsers } from "../utils/_DATA";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function handleReceiveUsers() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getUsers()
      .then((users) => {
        dispatch(receiveUsers(users));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
}

export function addQuestion(authedUser, qid) {
  return {
    type: ADD_QUESTION,
    authedUser,
    qid
  };
}
