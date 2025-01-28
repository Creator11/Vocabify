import s from "@/shared/assets/styles/App.module.scss";
import { Outlet } from "react-router";
import "@/shared/assets/styles/index.scss";

export const App = () => {
  return (
    <div className={s.App}>
      <Outlet />
    </div>
  );
};

export default App;
