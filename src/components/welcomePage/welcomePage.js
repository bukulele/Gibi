import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import SigninForm from "../../components/signinForm/signinForm";
import SignupForm from "../../components/signupForm/signupForm";
import styles from "./welcomePage.module.css";

function WelcomePage() {
  return (
    <div className={styles.welcomePage}>
      <nav className={styles.navbar}>
        <div className={styles.menu}>
          <li className={styles.navButton}>
            <Link to="signup">SignUp</Link>
          </li>
          <li className={styles.navButton}>
            <Link to="signin">SignIn</Link>
          </li>
        </div>
      </nav>
      <div className={styles.greetings}>
        Welcome to the only action tracker you should have!
      </div>
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default WelcomePage;
