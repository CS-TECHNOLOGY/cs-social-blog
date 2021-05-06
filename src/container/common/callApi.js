import axios from "axios";
import { store } from "redux/store";

export const HOST_API = "https://quoc-am-server.herokuapp.com";

export const postService = async (url, body) => { debugger
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const token = store.getState().token;

    if (token) {
      headers["x-auth-token"] = token;
    }

    const response = await axios.post(
      `${HOST_API + url}`,
      JSON.stringify(body),
      { headers }
    );
    if (response.status >= 200 && response.status <= 210) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      const res =  error.response.data.message;
      throw res;
    } else {
      throw error;
    }
  }
};
export const getService = async (url, params = "") => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const token = store.getState().token;
    if (token) {
      headers["x-auth-token"] = token;
    }

    let queryString = "";
    if (params) {
      queryString = `?${Object.keys(params)
        .map((key) => `${key}=${params[key] || ""}`)
        .join("&")}`;
    }
    const response = await axios.get(`${HOST_API}${url}${queryString}`, {
      headers,
    });
    if (response.status >= 200 && response.status <= 210) {
      return response.data;
    }
  } catch (error) {debugger
    if (error.response) {
      const res =  error.response.data.message;
      throw res;
    } else {
      throw error;
    }
  }
};
export const putService = async (url, body) => {
  try {
    const headers = {
      Accept: "application/json ",
      "Content-Type": "application/json",
    };
    const token = store.getState().token;
    if (token) {
      headers["x-auth-token"] = token;
    }

    const response = await axios.put(
      `${HOST_API + url}`,
      JSON.stringify(body),
      {
        headers: headers,
        withCredentials: true,
      }
    );

    if (response.status >= 200 && response.status <= 210) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error.split(":");
      const res = {
        status: error.response.status,
        errorMessage: errorMessage[errorMessage.length - 1],
        data: error.response.data,
      };
      throw res;
    } else {
      throw error;
    }
  }
};
export const deleteService = async (url, params) => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const token = store.getState().token;
    if (token) {
      headers["x-auth-token"] = token;
    }

    let queryString = "";
    if (params) {
      queryString = `?${Object.keys(params)
        .map((key) => `${key}=${params[key] || ""}`)
        .join("&")}`;
    }
    const response = await axios.get(`${HOST_API}${url}${queryString}`, {
      headers,
    });
    if (response.status >= 200 && response.status <= 210) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error.split(":");
      const res = {
        status: error.response.status,
        errorMessage: errorMessage[errorMessage.length - 1],
        data: error.response.data,
      };
      throw res;
    } else {
      throw error;
    }
  }
};
export async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
