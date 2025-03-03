import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./components/home";
import RegistrationModule from "./components/registration/RegistrationModule";
import BillingModule from "./components/billing/BillingModule";
import routes from "tempo-routes";

function App() {
  // Use tempo routes if in tempo environment
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {tempoRoutes}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationModule />} />
        <Route path="/billing" element={<BillingModule />} />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
