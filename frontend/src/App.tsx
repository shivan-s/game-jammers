import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import UsersListPage from "./views/Users/UsersListPage";
import UsersDetailPage from "./views/Users/UsersDetailPage";
import RegistrationPage from "./views/Auth/RegistrationPage";
import LoginPage from "./views/Auth/LoginPage";
import LogoutPage from "./views/Auth/LogoutPage";
import NotFoundPage from "./views/NotFoundPage";
import useStore from "./helpers/store";
import useApiClient from "./helpers/httpCommon";

const App: React.FC = () => {
  const isAuth = useStore((state) => state.isAuthenticated);
  const setIsAuth = useStore((state) => state.setIsAuthenticated);
  const apiClient = useApiClient();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      setIsAuth(false);
    } else {
      apiClient.get("/index/");
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:userReferenceId" element={<UsersDetailPage />} />
        <Route
          path="/registration"
          element={isAuth ? null : <RegistrationPage />}
        />
        <Route path="/login" element={isAuth ? null : <LoginPage />} />
        <Route path="/logout" element={isAuth ? <LogoutPage /> : null} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
