import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LoadingBar from "container/layout/loadingbar";
import { useSelector } from "react-redux";
import AuthScreen from "container/screens/Auth";
import ChatZone from "container/screens/Chat";
// import ChatScreen from "container/screens/Chats";

export const PRIVATE_ROUTER = [];
export const PUBLIC_ROUTER = [
  { exact: true, path: "/", component: ChatZone },
];
function FadingRoute({ component: Component, myprops = null, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => <Component {...routeProps} myprops={myprops} />}
    />
  );
}
const publicRouter = PUBLIC_ROUTER.map(({ exact, path, component }, key) => (
  <FadingRoute
    exact={exact}
    path={path}
    component={component}
    key={key}
  ></FadingRoute>
));

const RouterCenter = () => {
  // const path = window.location.pathname;
  // const inAuthScreen = path.includes("/auth");
  const loading = useSelector((state) => state.isLoading);
  const isAuth = useSelector((state) => state.isAuth);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <LoadingBar load={loading} />
      <div className="cs-main-body">
        <Switch>
          {/* {!isAuth ? (
            <Redirect exact from="/" to="/auth/sign-in" />
          ) : (
            <Redirect exact from="/" to="/chatroom" />
          )} */}
          {publicRouter}
          {!isAuth && (
            <FadingRoute
              exact={true}
              path="/auth/:type?/:from?"
              component={AuthScreen}
            ></FadingRoute>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default RouterCenter;
