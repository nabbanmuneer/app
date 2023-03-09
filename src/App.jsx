import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import EmployeeRegisterform from "./pages/employee/employeeRegisterform";
import Login from "./pages/login";
import Choice from "./pages/choice";
import Banner from "./components/banner";
import Home from "./pages/home";
import EmployerProfile from "./pages/employer/EmployerProfile";
import EmployerRegisterform from "./pages/employer/employerRegisterform";
import EmployeeProfile from "./pages/employee/employeeProfile";
import Layout from "./components/layout";
import FiltersJobs from "./pages/FilterJobs"
import JobDetail from "./pages/employer/jobDetail";
import DetailJob from "./pages/employee/detailJob";
import JobPage from "./pages/jobPage";
import EmployeeRequireAuth from "./features/requiredAuth/employeeRequireAuth"
import EmployerRequireAuth from "./features/requiredAuth/employerRequiredAuth";
import RequiredAuth from "./features/requiredAuth/requiredAuth"
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route element={<RequiredAuth />}>
      <Route path="/employee/profile/:user"
          element={
            <>
              <NavBar />
              <EmployeeProfile />
            </>
          }
        />
      <Route path="/employer/profile/:user"
          element={
            <>
              <NavBar />
              <EmployerProfile />
            </>
          }
        />
      </Route>
      <Route element={<EmployeeRequireAuth />}>
        <Route path="/employee/jobs/:id"
          element={
            <>
              <NavBar />
              <DetailJob />
            </>
          }
        />
        </Route>
        <Route element={<EmployerRequireAuth />}>
       
        
        <Route path="/employer/jobs/:id"
          element={
            <>
              <NavBar />
              <JobDetail />
            </>
          }
        />
        </Route>
        <Route path="/employee/register"
          element={
            <>
              <NavBar />
              <EmployeeRegisterform />
            </>
          }
        />
        <Route path="/employer/register"
          element={
            <>
              <NavBar />
              <EmployerRegisterform />
            </>
          }
        />
        <Route path="/choice"
          element={
            <>
              <Choice />
            </>
          }
        />
        <Route path="/login"
          element={
            <>
              <NavBar />
              <Login />
            </>
          }
        />
        
        <Route path="/"
          element={
            <>
              <NavBar />
              <Banner />
              <Home />
            </>
          }
        />
       
        <Route path="/jobs/:role/:id"
          element={
            <>
              <NavBar />
              <FiltersJobs />
            </>
          }
        />
        
        
        <Route path="/job"
          element={
            <>
              <NavBar />
              <JobPage />
            </>
          }
        />

      </Route>

    </Routes>
  );
}

export default App;
