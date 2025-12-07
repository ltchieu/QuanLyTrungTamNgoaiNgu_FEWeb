import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main_layout";
import HomePage from "../pages/home";
import Course from "../pages/course";
import Login from "../auth/auth";
import CategoryPage from "../pages/category_page";
import RegisterPage from "../pages/register_course";
import WeeklySchedule from "../pages/schedule";
import ManageAccountPage from "../pages/profile_page";
import RegisteredCoursePage from "../pages/registered_course_page";
import StudentDocumentPage from "../pages/student_document_page";
import ReviewHistoryPage from "../pages/review_history_page";
import PaymentResultPage from "../pages/payment_result_page";
import PersistLogin from "../componets/persist_login";
import RequireAuth from "../model/require_auth";
import ForgotPasswordPage from "../pages/forgot_password_page";
import ResetPasswordPage from "../pages/reset_password_page";



function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route element={<PersistLogin />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/course" element={<Course />}></Route>
            <Route path="/course/:id" element={<Course />} />
            <Route path="/course/category/:id" element={<CategoryPage />} />

            <Route element={<RequireAuth />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/payment/result" element={<PaymentResultPage />} />
              <Route
                path="/student/schedule"
                element={<WeeklySchedule />}
              ></Route>
              <Route
                path="/student/registered-courses"
                element={<RegisteredCoursePage />}
              ></Route>
              <Route
                path="/student/documents"
                element={<StudentDocumentPage />}
              ></Route>
              <Route
                path="/student/review-history"
                element={<ReviewHistoryPage />}
              ></Route>
              <Route
                path="/account/profile"
                element={<ManageAccountPage />}
              ></Route>

            </Route>


          </Route>
        </Route>
      </Routes>
    </div >
  );
}
export default AppRoutes;
