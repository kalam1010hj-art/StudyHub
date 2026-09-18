import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BookOpen, Menu, X, Upload, Plus } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Elevate navbar shadow/border on page scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link to="/" className={styles.brand}>
          <div className={styles.logoIconWrapper}>
            <BookOpen size={20} className={styles.logoIcon} />
          </div>
          <span className={styles.brandText}>
            Study<span className={styles.brandHighlight}>Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/universities"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            Universities
          </NavLink>
          <NavLink
            to="/colleges"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            Colleges
          </NavLink>
          <NavLink
            to="/programs"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            Programs
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            Resources
          </NavLink>
        </nav>

        {/* Action CTAs (Desktop) */}
        <div className={styles.actionGroup}>
          <Link to="/upload" className={styles.uploadBtn}>
            <Upload size={15} />
            <span>Upload</span>
          </Link>

          <div className={styles.divider} />

          <Link to="/login" className={styles.loginBtn}>
            Log in
          </Link>
          <Link to="/register" className={styles.registerBtn}>
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileActive}` : styles.mobileNavLink
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/universities"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileActive}` : styles.mobileNavLink
              }
            >
              Universities
            </NavLink>
            <NavLink
              to="/colleges"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileActive}` : styles.mobileNavLink
              }
            >
              Colleges
            </NavLink>
            <NavLink
              to="/programs"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileActive}` : styles.mobileNavLink
              }
            >
              Programs
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileActive}` : styles.mobileNavLink
              }
            >
              Resources
            </NavLink>
            <NavLink to="/upload" className={styles.mobileUploadBtn}>
              <Plus size={16} />
              <span>Upload Material</span>
            </NavLink>
          </nav>

          <div className={styles.mobileAuthGroup}>
            <Link to="/login" className={styles.mobileLoginBtn}>
              Log in
            </Link>
            <Link to="/register" className={styles.mobileRegisterBtn}>
              Create an Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;