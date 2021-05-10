import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
const middleware = [thunk];
const pertistedReducer = persistReducer(
  {
    key: "root",
    storage: storage,
    blacklist: ["listApi", "isLoading"],
    // whitelist:
    // transforms: []
  },
  reducers
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  pertistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
