import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/">Go Home</Link>
    </>
  );
};

export default NotFoundPage;
