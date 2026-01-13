import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Top navigation for the customer portal.
 */
export default function TopNav() {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <div className="brandmark" aria-hidden="true" />
        <div className="topbar__titles">
          <div className="topbar__name">Mobile Repair</div>
          <div className="topbar__tagline">Customer Portal</div>
        </div>
      </div>

      <nav className="topbar__nav" aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "navlink navlink--active" : "navlink")}>
          Dashboard
        </NavLink>
        <NavLink to="/book" className={({ isActive }) => (isActive ? "navlink navlink--active" : "navlink")}>
          Book Repair
        </NavLink>
        <NavLink to="/requests" className={({ isActive }) => (isActive ? "navlink navlink--active" : "navlink")}>
          My Requests
        </NavLink>
        <NavLink to="/support" className={({ isActive }) => (isActive ? "navlink navlink--active" : "navlink")}>
          Support
        </NavLink>
      </nav>
    </header>
  );
}
