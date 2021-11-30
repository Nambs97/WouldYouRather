import "../styles.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionForm from "./QuestionForm";
import LeaderBoard from "./LeaderBoard";
import Nav from "./Nav";
import Logout from "./Logout";
import LoadingBar from "react-redux-loading";

function App(props) {
  const { authedUser } = props;
  return (
    <Router>
      <LoadingBar />
      <Nav />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={authedUser === null ? <SignIn /> : <Dashboard />}
          />
          <Route path="/add" element={<NewQuestion />} />
          <Route path="/questions/:qid" element={<QuestionForm />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(App);
