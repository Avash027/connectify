import axios from "axios";
import baseUrl from "../../utils/client/baseUrl";
import cookie from "js-cookie";
import Router from "next/router";

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
    console.log(err);
    setError(true);
  }
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else Router.push("/");
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.reload();
};

export const logoutUser = () => {
  cookie.remove("token");
  Router.reload();
};
