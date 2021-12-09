import styles from "./button.module.css";

function Button({ id, content, clickHandler, buttonType }) {
  return (
    <button id={id} onClick={clickHandler} className={styles[buttonType]}>
      {content}
    </button>
  );
}

export default Button;
