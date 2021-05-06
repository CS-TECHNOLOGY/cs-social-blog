import { LinearProgress } from "@material-ui/core";
import React from "react";

const Loading = ({ load = false }) => {
  return load ? (
    <div className="cs-loading-bar">
      <LinearProgress />
    </div>
  ) : null;
};

const LoadingBar = React.memo(
  Loading,
  (prevProps, nextProps) => prevProps === nextProps
);
export default LoadingBar;
