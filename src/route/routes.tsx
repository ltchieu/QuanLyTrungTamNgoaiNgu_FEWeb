import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main_layout";
import HomePage from "../pages/home";
import Course from "../pages/course";
import Login from "../auth/auth";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/course" element={<Course />}></Route>
          <Route path="/course/:id" element={<Course />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      
    </div>
  );
}
export default AppRoutes;
