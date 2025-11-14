import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main_layout";
import HomePage from "../pages/home";
import Course from "../pages/course";
import Login from "../auth/auth";
import RegisterCoursePage from "../pages/register_course";
import CategoryPage from "../pages/category_page";
import RegisterPage from "../pages/register_course";
import WeeklySchedule from "../pages/schedule";
import ManageAccountPage from "../pages/profile_page";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/course" element={<Course />}></Route>
          <Route path="/course/:id" element={<Course />} />
          <Route path="/register-course" element={<RegisterCoursePage />} />
          <Route path="/course/category/:id" element={<CategoryPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/student/schedule" element={<WeeklySchedule />}></Route>
          <Route path="/account/profile" element={<ManageAccountPage/>}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}
export default AppRoutes;
