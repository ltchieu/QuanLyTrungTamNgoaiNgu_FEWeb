import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main_layout";
import HomePage from "../pages/home";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}
export default AppRoutes;
