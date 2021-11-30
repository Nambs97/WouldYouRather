import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { MdHome, MdAdd, MdLeaderboard } from "react-icons/md";

function Nav(props) {
  const { authedUser, user } = props;
  return (
    <nav>
      <div className="ns-navbar-brand">
        <Link className="ns-navbar-brand-links" to="/">
          <h5>Would You Rather</h5>
        </Link>
      </div>
      <ul className="ns-navbar-links">
        <li className="ns-navbar-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "ns-navbar-item-link" + (isActive ? " active" : "")
            }
          >
            <MdHome className="ns-navbar-item-icon" />
            <span className="ns-navbar-item-text">Home</span>
          </NavLink>
        </li>
        <li className="ns-navbar-item">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              "ns-navbar-item-link" + (isActive ? " active" : "")
            }
          >
            <MdAdd className="ns-navbar-item-icon" />
            <span className="ns-navbar-item-text">New Question</span>
          </NavLink>
        </li>
        <li className="ns-navbar-item">
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              "ns-navbar-item-link" + (isActive ? " active" : "")
            }
          >
            <MdLeaderboard className="ns-navbar-item-icon" />
            <span className="ns-navbar-item-text">Leader Board</span>
          </NavLink>
        </li>
      </ul>
      <div className="ns-navbar-usermenu">
        {authedUser !== null && (
          <div>
            <span className="ns-navbar-usermenu-text">Hello, {user.name}</span>
            <img
              src={user.avatarURL}
              alt={`Avatar of ${user.id}`}
              className="signin-select-avatar ns-navbar-usermenu-avatar"
            />
            <span className="ns-navbar-usermenu-separator"> | </span>
            <Link className="ns-navbar-usermenu-link logout" to="/logout">
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    user: users[authedUser]
  };
};

export default connect(mapStateToProps)(Nav);
