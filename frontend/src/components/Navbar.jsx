import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/assess", label: "Assessments" },
    { to: "/#how-it-works", label: "How It Works", hashLink: true },
    { to: "/models", label: "Model Info" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav-inner">
        <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30">
              <rect width="32" height="32" rx="9" fill="var(--ink)" />
              <path d="M6 18h4l1.6-3.4 2.6 6.8 2.4-9.6 1.8 6.2H26" fill="none" stroke="var(--signal-glow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="nav-brand-text">MediSense<span className="nav-brand-accent">AI</span></span>
        </NavLink>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) =>
            l.hashLink ? (
              <a key={l.to} href={l.to} className="nav-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            )
          )}
          <Link to="/assess" className="btn btn-primary btn-sm nav-cta" onClick={() => setOpen(false)}>
            Start Assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
