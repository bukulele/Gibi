const ChangeSubscriptionsReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ADD":
      newState[action.sub] = action.url;
      return { ...newState };
    case "REMOVE":
      delete newState[action.sub];
      return { ...newState };
    case "CLEAR":
      return {};
    default:
      return { ...newState };
  }
};

export default ChangeSubscriptionsReducer;
