import { createActions } from "redux-actions";

const actions = createActions({
  LOADING_ACTION: null,
  PLAY_INTRO_ACTION: null,
  SET_TOKEN_ACTION: null,
  SET_AUTH_ACTION: null,
  SET_S_DATA_ACTION: null,
});
export const {
  loadingAction,
  playIntroAction,
  setTokenAction,
  setAuthAction,
  setSDataAction,
} = actions;