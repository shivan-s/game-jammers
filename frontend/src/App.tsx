import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import UserListPage from "./views/UserListPage";
import UserDetailPage from "./views/UserDetailPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:UserReferenceId" element={<UserDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
