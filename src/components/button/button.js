import styles from "./button.module.css";

function Button({ id, content, clickHandler, buttonStyle, type }) {
  return (
    <button
      id={id}
      onClick={clickHandler}
      type={type}
      className={styles[buttonStyle]}
    >
      {content}
    </button>
  );
}

export default Button;
