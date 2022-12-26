import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useApiClient from "../../../helpers/httpCommon";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const apiClient = useApiClient();
  const navigate = useNavigate();

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: (formData) => {
      return apiClient.post(`auth/token/`, formData);
    },
  });

  const { values, handleChange, handleSubmit } = useFormik<ILoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) =>
      mutate(values, {
        onSuccess: (data) => {
          localStorage.setItem("access_token", data.data.access);
          localStorage.setItem("refresh_token", data.data.refresh);
          navigate("/");
        },
        onError: (error, variables, context) => {
          console.log("error", error);
          console.log("variable", variables);
          console.log("context", context);
        },
      }),
  });

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <h2>LoginPage</h2>
      <form onSubmit={handleSubmit}>
        {isLoading && <p>Loading..</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
