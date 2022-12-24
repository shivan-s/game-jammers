import { useMutation } from "@tanstack/react-query";
/* import { useNavigate } from "react-router-dom"; */
import apiClient from "../../../helpers/httpCommon/httpCommon";
import React from "react";

/* interface LoginFormProps { */
/*   email: string; */
/*   password: string; */
/* } */

const LoginPage: React.FC = () => {
  /* const history = useNavigate(); */
  /* const initialFormData: LoginFormProps = Object.freeze({ */
  /*   email: "", */
  /*   password: "", */
  /* }); */

  const { mutate, error, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (formData) => apiClient.post(`/auth/registration`, formData),
  });

  if (isError) {
    console.log(error);
  }

  console.log(mutate);

  return (
    <>
      <h2>LoginPage</h2>
      <form>
        {isLoading && <p>Loading..</p>}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        <br />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
        <br />
        <button type="submit">Submit</button>
      </form>
      {isSuccess && <p>User created...</p>}
    </>
  );
};

export default LoginPage;
