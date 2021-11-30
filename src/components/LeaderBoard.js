import React from "react";
import { connect } from "react-redux";
import UserScore from "./UserScore";
import SignIn from "./SignIn";

function LeaderBoard(props) {
  const { authedUser, usersArray } = props;

  return (
    <div className="leaderboard-container">
      {authedUser !== null ? (
        <div>
          {usersArray.map((user) => (
            <UserScore key={user.id} uid={user.id} />
          ))}
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    usersArray: Object.values(users).sort(
      (a, b) =>
        Object.keys(users[b.id].answers).length +
        users[b.id].questions.length -
        (Object.keys(users[a.id].answers).length + users[a.id].questions.length)
    )
  };
};

export default connect(mapStateToProps)(LeaderBoard);
