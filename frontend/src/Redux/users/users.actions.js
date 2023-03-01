import axios from "axios";
import {
  GET_USERS_ERROR,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  PATCH_USERS_ERROR,
  PATCH_USERS_LOADING,
  PATCH_USERS_SUCCESS,
} from "./users.types";

const port = import.meta.env.VITE_PORT;

export const getAllUsers = (token) => async (dispatch) => {
  dispatch({ type: GET_USERS_LOADING });
  try {
    let response = await axios.get(`${port}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
    console.log(response.data);
    return response.data;
  } catch (e) {
    dispatch({ type: GET_USERS_ERROR });
  }
};

export const updateUser = (userId, user) => async (dispatch) => {
  dispatch({ type: PATCH_USERS_LOADING });
  try {
    await axios.patch(`${port}/edit/${userId}`, user, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    });
    dispatch({ type: PATCH_USERS_SUCCESS });
  } catch (e) {
    dispatch({ type: PATCH_USERS_ERROR });
  }
};

export const searchUsers = (r) => async (dispatch) => {
  dispatch({ type: GET_USERS_LOADING });
  try {
    let response = await axios.get(
      `${port}/search?q=${r}`
    );
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
    console.log(response);
    return response.data;
  } catch (e) {
    dispatch({ type: GET_USERS_ERROR });
  }
};
