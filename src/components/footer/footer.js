import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Created by{" "}
        <a href="https://bukulele.site" target="_blank" rel="noreferrer">
          {" "}
          bukulele
        </a>
        &copy; 2021
      </p>
    </footer>
  );
}

export default Footer;
