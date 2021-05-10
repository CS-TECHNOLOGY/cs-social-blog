import { getService, postService } from "container/common/callApi";
import { loadingAction } from "redux/actions";

export const getUserService = ({ callback }) => {
  return async (dispatch) => {
    dispatch(loadingAction(true));
    await getService(`/users`)
      .then((result) => {
        callback(result, null);
      })
      .catch((err) => {
        callback(null, err.toString());
      })
      .finally(() => {
        dispatch(loadingAction(false));
      });
  };
};
export const sendMessService = ({ to, text, callback }) => {
  return async (dispatch) => {
    await postService(`/v1/conversations`, { to, text })
      .then((result) => {
        callback(result, null);
      })
      .catch((err) => {
        callback(null, err.toString());
      });
  };
};
export const getMessService = ({ id, callback }) => {
  return async (dispatch) => {
    dispatch(loadingAction(true));
    await getService(`/v1/conversations/chat/${id}`)
      .then((result) => {
        debugger;
        callback(result, null);
      })
      .catch((err) => {
        debugger;
        callback(null, err.toString());
      })
      .finally(() => {
        dispatch(loadingAction(false));
      });
  };
};
