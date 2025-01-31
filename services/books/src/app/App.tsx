import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <h1 style={{ color: "white" }}>books MODULE</h1>
      <Outlet />
    </div>
  );
};
