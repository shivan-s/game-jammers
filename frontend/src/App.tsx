import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import UsersListPage from "./views/Users/UsersListPage";
import UsersDetailPage from "./views/Users/UsersDetailPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:userReferenceId" element={<UsersDetailPage />} />
        {/* <Route path="/signin" element={<SignUp />} /> */}
        {/* <Route path="/login" element={<LogIn />} /> */}
      </Routes>
    </>
  );
};

export default App;
