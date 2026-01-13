import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import BookRepair from "./pages/BookRepair";
import MyRequests from "./pages/MyRequests";
import RequestDetail from "./pages/RequestDetail";
import Support from "./pages/Support";

// PUBLIC_INTERFACE
function App() {
  /** Customer portal entrypoint: booking + tracking UI with Ocean Professional styling. */
  useEffect(() => {
    // Apply a default light theme token if the template set a data-theme previously.
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <div className="App appShell">
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/book" element={<BookRepair />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/requests/:requestId" element={<RequestDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="footer">
          <div className="footer__inner">
            <span className="muted small">Mobile Repair Service Platform • Customer</span>
            <span className="muted small">Ocean Professional theme</span>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
