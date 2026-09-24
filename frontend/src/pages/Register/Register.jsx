import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  BookOpen, 
  UserPlus, 
  AlertCircle 
} from "lucide-react";
import styles from "./Register.module.css";
import { CreateAccount } from "../../services/AuthServices";

const Register = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
   
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validations
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // if (!formData.agreeToTerms) {
    //   setError("Please accept the Terms & Conditions to proceed.");
    //   return;
    // }

    setLoading(true);

    try {
     
      const data = {
      username: formData.username,
      password: formData.password,
    };
      CreateAccount(data)
      .then((response)=>{
         setFormData({
            username: "",
            password: "",
            confirmPassword: "",
         })
         setLoading(false)
       navigate("/login");

      })
      
      .catch((response)=>{
        console.log("catch is excecuted: ",response.status)

        if(response.status == 400){
          setError("Username already exits!")
          console.log("error is setted")
        }
        //  setFormData(
        //     username:"",
        //     password:"",
        //     confirmPassword:""
        // )
       
      })
      .finally(()=>{
        setLoading(false)
      })
      // Simulate API call success
      // navigate("/login");
    }
     catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } 
   
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Header / Brand Banner */}
        <div className={styles.header}>
          <Link to="/" className={styles.brand}>
            <div className={styles.logoWrapper}>
              <BookOpen size={24} className={styles.logoIcon} />
            </div>
            <span className={styles.brandText}>
              Study<span className={styles.brandHighlight}>Hub</span>
            </span>
          </Link>
          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>
            Join thousands of students and share study resources
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={styles.errorAlert} role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Full Name / Username */}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
           Username
            </label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          {/* <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={styles.input}
                required
              />
            </div>
          </div> */}

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          {/* <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span>
                I agree to the <Link to="/terms" className={styles.inlineLink}>Terms of Service</Link> and <Link to="/privacy" className={styles.inlineLink}>Privacy Policy</Link>
              </span>
            </label>
          </div> */}

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className={styles.footer}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;