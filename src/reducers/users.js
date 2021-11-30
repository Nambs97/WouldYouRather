import { RECEIVE_USERS, ANSWER_QUESTION, ADD_QUESTION } from "../actions/users";

export default function receiveUsers(state = {}, action) {
  const { authedUser, qid, answer } = action;
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([qid])
        }
      };
    default:
      return state;
  }
}
