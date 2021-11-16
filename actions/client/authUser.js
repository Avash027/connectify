import axios from "axios";
import baseUrl from "../../utils/client/baseUrl";
import Router from "next/router";
import cookie from "js-cookie";

//TODO Set proper error message
export const registerUser = async (user, setError, setLoading) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/auth/signup`, {
      user,
    });
    setToken(data);
  } catch (err) {
    setError(true);
  }
  setLoading(false);
};

export const loginUser = async (user, setError) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/auth/login`, {
      user,
    });
    setToken(data);
  } catch (err) {
    setError(true);
  }
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location }); // if ctx is in backend
    ctx.res.end();
  } else Router.push("/");
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};
