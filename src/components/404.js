import React from "react";
import { Link } from "react-router-dom";

export default function Page404(props) {
  return (
    <div className="not-found-container">
      <h1>404 Error : Not Found</h1>
      <p>
        Try to create <Link to="/add">New question</Link> or go to the{" "}
        <Link to="/">Homepage</Link>
      </p>
    </div>
  );
}
