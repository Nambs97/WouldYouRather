import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { handleReceiveUsers } from "../actions/users";
import { setAuthedUser } from "../actions/authedUser";
import reactlogo from "../assets/img/React-icon.svg";

function SignIn(props) {
  const { usersArray } = props;
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    props.dispatch(handleReceiveUsers());
  }, []);

  const userOptions = usersArray.map((user) => {
    return {
      value: user.id,
      label: (
        <div>
          <img
            src={user.avatarURL}
            alt={`Avatar Of ${user.id}`}
            className="signin-select-avatar"
          />{" "}
          {user.name}
        </div>
      )
    };
  });

  const selectCustomStyles = {
    control: (base) => ({
      ...base,
      height: 45,
      minHeight: 45
    })
  };

  const handleOnChange = (e) => {
    setSelectedUser(e.value);
  };

  const handleOnSignIn = (e) => {
    e.preventDefault();
    if (selectedUser && selectedUser !== "") {
      props.dispatch(setAuthedUser(selectedUser));
    }
  };

  return (
    <div className="signin-card">
      <div className="signin-card-header">
        <h4 className="sigin-card-header-title">
          Welcome to the Would You Rather App
        </h4>
        <h6>Please sign in to continue</h6>
      </div>
      <div className="signin-card-main">
        <div className="signin-card-main-img">
          <img src={reactlogo} alt="React-Redux Logo" width="300px" />
        </div>

        <div className="signin-card-footer">
          <div className="signin-card-main-form">
            <form>
              <Select
                options={userOptions}
                placeholder="Select User"
                styles={selectCustomStyles}
                className="signin-form-select"
                onChange={handleOnChange}
              />
              <button
                className="btn btn-success signin-form-button"
                onClick={handleOnSignIn}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users }) => {
  return {
    usersArray: Object.values(users)
  };
};

export default connect(mapStateToProps)(SignIn);
