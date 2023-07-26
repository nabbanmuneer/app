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
import Footer from "./components/footer";
import EmployeeRequireAuth from "./features/requiredAuth/employeeRequireAuth";
import EmployerRequireAuth from "./features/requiredAuth/employerRequiredAuth";
import RequiredAuth from "./features/requiredAuth/requiredAuth";
import AdminLogin from "./pages/admin/adminLogin";
import AdminMain from "./pages/admin/adminMain";
import Error from "./components/error";
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
                <Footer />
              </>
            }
          />
          <Route path="/employer/profile/:user"
            element={
              <>
                <NavBar />
                <EmployerProfile />
                <Footer />
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
              <Footer />
            </>
          }
        />
        <Route path="/employer/register"
          element={
            <>
              <NavBar />
              <EmployerRegisterform />
              <Footer />
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
              <Footer />
            </>
          }
        />

        <Route path="/"
          element={
            <>
              <NavBar />
              <Banner />
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/jobs/:role/:id"
          element={
            <>
              <NavBar />
              <FiltersJobs />
              <Footer />
            </>
          }
        />


        <Route path="/job"
          element={
            <>
              <NavBar />
              <JobPage />
              <Footer />
            </>
          }
        />
        <Route path="/404"
          element={
            <>
              <Error />
            </>
          }
        />
        <Route path="/admin/login"
          element={
            <>
              <AdminLogin />
            </>
          } />
          <Route path="/admin"
          element={
            <>
              <AdminMain />
              
            </>
          } />
      </Route>

    </Routes>
  );
}

export default App;
