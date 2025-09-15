import { Routes, Route } from "react-router-dom";
import Main from "../components/pages/Main";
import StaffFormPage from "../components/pages/StaffFormPage";
import LearnersFormPage from "../components/pages/LearnersFormPage";
import FacilityForm from "../components/pages/FacilityFormPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/capture-staffs" element={<StaffFormPage />} />
      <Route path="/capture-learners" element={<LearnersFormPage />} />
      <Route path="/capture-facilities" element={<FacilityForm />} />
    </Routes>
  );
}

export default AppRoutes;
