import { useMutation } from "@tanstack/react-query";
/* import { useNavigate } from "react-router-dom"; */
/* import React, { useState } from "react"; */
import React from "react";
import apiClient from "../../../helpers/httpCommon/httpCommon";

/* interface RegistrationProps { */
/*   username: string; */
/*   email: string; */
/*   password1: string; */
/*   password2: string; */
/* } */

const RegistrationPage: React.FC = () => {
  /* const history = useNavigate(); */
  /* const initialFormData: RegistrationProps = Object.freeze({ */
  /*   username: "", */
  /*   email: "", */
  /*   password1: "", */
  /*   password2: "", */
  /* }); */
  /* const [formData, updateFormData] = */
  /*   useState<RegistrationProps>(initialFormData); */

  const handleChange = () => null;

  const { mutate, error, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (formData) => apiClient.post(`/auth/registration`, formData),
  });

  if (isError) {
    console.log(error);
  }

  console.log(mutate);

  return (
    <>
      <h2>Registration</h2>
      <form>
        {isLoading && <p>Loading..</p>}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password1">Password</label>
        <input
          id="password1"
          name="password1"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password2">Confirm password</label>
        <input
          id="password2"
          name="password2"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {isSuccess && <p>User created...</p>}
    </>
  );
};

export default RegistrationPage;
