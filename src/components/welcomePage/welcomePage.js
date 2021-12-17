import { useContext } from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import SigninForm from "../../components/signinForm/signinForm";
import SignupForm from "../../components/signupForm/signupForm";
import UserIdContext from "../../context/UserIdContext";
import styles from "./welcomePage.module.css";

function WelcomePage({ setUid }) {
  const uid = useContext(UserIdContext);

  if (uid) {
    return <Navigate to="/home" />;
  }

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
        <Route path="signup" element={<SignupForm onSuccess={setUid} />} />
        <Route path="signin" element={<SigninForm onSuccess={setUid} />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default WelcomePage;
