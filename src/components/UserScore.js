import React from "react";
import { connect } from "react-redux";

function UserScore(props) {
  const { user } = props;
  return (
    <div className="leaderboard-card">
      <div className="leaderboard-card-main">
        <div className="leaderboard-card-main-avatar">
          <img src={user.avatarURL} alt={`Avatar of ${user.id}`} />
        </div>

        <div className="leaderboard-card-main-userdetails">
          <h4>{user.name}</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Answered questions</td>
                <td>{Object.keys(user.answers).length}</td>
              </tr>
              <tr>
                <td>Created questions</td>
                <td>{user.questions.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="leaderboard-card-main-userscore">
          <div className="leaderboard-card-main-userscore-header">
            <h5>Score</h5>
          </div>
          <div className="leaderboard-card-main-userscore-content">
            <h3>{Object.keys(user.answers).length + user.questions.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users }, { uid }) => {
  const user = users[uid];
  return {
    user
  };
};

export default connect(mapStateToProps)(UserScore);
