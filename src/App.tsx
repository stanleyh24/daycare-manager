import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import RegistrationModule from "./components/registration/RegistrationModule";
import BillingModule from "./components/billing/BillingModule";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<RegistrationModule />} />
      <Route path="/billing" element={<BillingModule />} />
    </Routes>
  );
}

export default App;
