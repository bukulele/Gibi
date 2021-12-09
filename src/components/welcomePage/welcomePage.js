import { Routes, Route, Link, Outlet } from "react-router-dom";
import SigninForm from "../../components/signinForm/signinForm";
import SignupForm from "../../components/signupForm/signupForm";
import styles from "./welcomePage.module.css";

function WelcomePage({ setUser }) {
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
        <Route path="signup" element={<SignupForm onSuccess={setUser} />} />
        <Route path="signin" element={<SigninForm onSuccess={setUser} />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default WelcomePage;
