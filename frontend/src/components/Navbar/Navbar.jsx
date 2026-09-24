import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Menu, 
  X, 
  Upload, 
  Plus, 
  LogOut, 
  User, 
  ChevronDown, 
  FileText, 
  LayoutDashboard, 
  Mail 
} from "lucide-react";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const location = useLocation();

  // Destructure auth data from AuthContext (including user details if available)
  const { token, isAuthenticated, Logout, userdata } = useContext(AuthContext);
  const user = userdata;

  const isAuth = Boolean(isAuthenticated && token);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  // Handle click outside to auto-close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    if (Logout) {
      Logout();
      navigate('/login')
    }
    setIsProfileOpen(false);
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
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/universities"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Universities
          </NavLink>
          <NavLink
            to="/colleges"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Colleges
          </NavLink>
          <NavLink
            to="/resourceHub"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Resources
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Action CTAs & Profile (Desktop) */}
        <div className={styles.actionGroup}>
          <Link
            to={isAuth ? "/upload" : "/login"}
            className={styles.uploadBtn}
          >
            <Upload size={15} />
            <span>Upload</span>
          </Link>

          <div className={styles.divider} />

          {/* Conditional Profile / Auth Display */}
          {isAuth ? (
            <div className={styles.profileWrapper} ref={profileRef}>
              <button
                type="button"
                className={styles.profileBtn}
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-expanded={isProfileOpen}
                aria-label="User account menu"
              >
                <div className={styles.avatar}>
                  {user?.username ? (
                    user.username.charAt(0).toUpperCase()
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <span className={styles.profileName}>
                  {user?.username || "Account"}
                </span>
                <ChevronDown
                  size={14}
                  className={`${styles.chevron} ${
                    isProfileOpen ? styles.chevronRotated : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.userName}>{user?.username || "User Account"}</p>
                    <p className={styles.userEmail}>{user?.email || "Logged in"}</p>
                  </div>

                  <div className={styles.dropdownDivider} />

                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/my-uploads"
                    className={styles.dropdownItem}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FileText size={16} />
                    <span>Uploaded Resources</span>
                  </Link>

                  {user?.is_staff && (
                    <Link
                      to="/academic-management"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      <span>Academic Management</span>
                    </Link>
                  )}

                  <div className={styles.dropdownDivider} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>
                Log in
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={toggleMobileMenu}
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
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
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileActive}`
                  : styles.mobileNavLink
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/universities"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileActive}`
                  : styles.mobileNavLink
              }
            >
              Universities
            </NavLink>
            <NavLink
              to="/colleges"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileActive}`
                  : styles.mobileNavLink
              }
            >
              Colleges
            </NavLink>
            <NavLink
              to="/resourceHub"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileActive}`
                  : styles.mobileNavLink
              }
            >
              Resources
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileActive}`
                  : styles.mobileNavLink
              }
            >
              <Mail size={16} />
              <span>Contact</span>
            </NavLink>

            <NavLink
              to={isAuth ? "/upload" : "/login"}
              className={styles.mobileUploadBtn}
            >
              <Plus size={16} />
              <span>Upload Material</span>
            </NavLink>
          </nav>

          <div className={styles.mobileAuthGroup}>
            {isAuth ? (
              <div className={styles.mobileProfileCard}>
                <div className={styles.mobileUserInfo}>
                  <div className={styles.mobileAvatar}>
                    {user?.username ? (
                      user.username.charAt(0).toUpperCase()
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div>
                    <p className={styles.mobileUserName}>
                      {user?.username || "Student"}
                    </p>
                    <p className={styles.mobileUserEmail}>
                      {user?.email || "Logged in"}
                    </p>
                  </div>
                </div>

                <div className={styles.mobileProfileLinks}>
                  <Link to="/profile" className={styles.mobileProfileLink}>
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/my-uploads" className={styles.mobileProfileLink}>
                    <FileText size={16} />
                    <span>Uploaded Resources</span>
                  </Link>
                  {user?.is_staff && (
                    <Link to="/academic-management" className={styles.mobileProfileLink}>
                      <LayoutDashboard size={16} />
                      <span>Academic Management</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.mobileLogoutBtn}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className={styles.mobileLoginBtn}>
                  Log in
                </Link>
                <Link to="/register" className={styles.mobileRegisterBtn}>
                  Create an Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;