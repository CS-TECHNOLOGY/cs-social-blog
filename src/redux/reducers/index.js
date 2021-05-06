import {handleActions} from 'redux-actions';
import { loadingAction, playIntroAction, setAuthAction, setSDataAction, setTokenAction } from '../actions';
const initialState = {
  isLoading: false,
  playIntro: false,
  isAuth: false,
  useInfo: {},
  token: "",
  sample:{},
};
export default handleActions(
  {
    [loadingAction.toString()]: (state, {payload})=>({
      ...state,
      isLoading: payload
    }),
    [playIntroAction.toString()]: (state, {payload})=>({
      ...state,
      playIntro: payload
    }),
    [setTokenAction.toString()]: (state, {payload})=>({
      ...state,
      token: payload,
      isAuth: true,
    }),
    [setAuthAction.toString()]: (state, {payload})=>({
      ...state,
      useInfo: payload.useInfo,
    }),
    [setSDataAction.toString()]: (state, {payload})=>({
      ...state,
      sample: payload,
    }),
  },
  initialState,
);