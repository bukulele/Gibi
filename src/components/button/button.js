function Button({ id, content, clickHandler, buttonStyle, type }) {
  return (
    <button id={id} onClick={clickHandler} type={type} className={buttonStyle}>
      {content}
    </button>
  );
}

export default Button;
