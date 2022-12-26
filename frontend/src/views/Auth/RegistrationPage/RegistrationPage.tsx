import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React from "react";
import apiClient from "../../../helpers/httpCommon";

interface RegistrationFormProps {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: (formData) => apiClient.post(`auth/registration/`, formData),
  });

  const { values, handleChange, handleSubmit } =
    useFormik<RegistrationFormProps>({
      initialValues: {
        username: "",
        email: "",
        password1: "",
        password2: "",
      },
      onSubmit: (values) =>
        mutate(values, {
          onSuccess: (data, variables, context) => {
            console.log("data", data);
            console.log("variable", variables);
            console.log("context", context);
            navigate("/login");
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

  console.log(error);

  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        {isLoading && <p>Loading..</p>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password1">Password</label>
          <input
            id="password1"
            name="password1"
            type="password"
            value={values.password1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm password</label>
          <input
            id="password2"
            name="password2"
            type="password"
            value={values.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RegistrationPage;
