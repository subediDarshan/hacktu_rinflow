import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import LandPage from "./LandPage.jsx";
import LoginPage from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import ApplicationForm from "./LoanApplicationForm.jsx";
import Signup from "./signup.jsx";
import Loan from "./Loan.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/loan/:id" element={<Loan />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
