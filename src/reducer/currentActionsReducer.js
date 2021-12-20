const currentActionsReducer = (state, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD":
      newState = [...newState, action.event];
      return [...newState];
    case "REMOVE":
      newState.splice(action.id, 1);
      return [...newState];
    case "CLEAR":
      return [];
    default:
      return [...newState];
  }
};

export default currentActionsReducer;
