import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import UsersListPage from "./views/Users/UsersListPage";
import UsersDetailPage from "./views/Users/UsersDetailPage";
import RegistrationPage from "./views/Auth/RegistrationPage";
import LoginPage from "./views/Auth/LoginPage";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:userReferenceId" element={<UsersDetailPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
