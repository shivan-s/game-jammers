import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8888/api/v1/";

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/* apiClient.interceptors.response.use( */
/*   (response) => { */
/*     return response; */
/*   }, */
/**/
/*   async (error) => { */
/*     const originalRequest = error.config; */
/**/
/*     if (typeof error.response === "undefined") { */
/*       console.log("A server/network error occurred."); */
/*       return Promise.reject(error); */
/*     } */
/**/
/*     if ( */
/*       error.response.status === 401 && */
/*       originalRequest.url === baseURL + "auth/token/refresh/" */
/*     ) { */
/*       window.location.href = "/login/"; */
/*       return Promise.reject(error); */
/*     } */
/**/
/*     if ( */
/*       error.response.data.code === "token_not_valid" && */
/*       error.response.status === 401 && */
/*       error.response.statusText === "Unauthorized" */
/*     ) { */
/*       const refreshToken = localStorage.getItem("refresh_token"); */
/**/
/*       if (refreshToken) { */
/*         const tokenParts = jwtDecode<JwtPayload>(refreshToken); */
/*         const now = Math.ceil(Date.now() / 1000); */
/*         if (tokenParts.exp < now) { */
/*           return apiClient */
/*             .post("auth/token/refresh/", { refresh: refreshToken }) */
/*             .then((response) => { */
/**/
/*               apiClient.defaults.headers[ */
/*                 "Authorization" */
/*               ] = `Bearer ${response.data.access}`; */
/*               originalRequest.headers[ */
/*                 "Authorization" */
/*               ] = `Bearer ${response.data.access}`; */
/*               return apiClient(originalRequest); */
/*             }) */
/*             .catch((err) => { */
/*               console.log(err); */
/*             }); */
/*         } else { */
/*           console.log("Refresh token is expired", tokenParts.exp, now); */
/*           window.location.href = "/login/"; */
/*         } */
/*       } else { */
/*         console.log("Refresh token not available"); */
/*         window.location.href = "/login/"; */
/*       } */
/*     } */
/*     return Promise.reject(error); */
/*   } */
/* ); */

export default apiClient;
