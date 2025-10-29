const CartReducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case "Add":
      return [...state, action.product];

    case "Remove":
      return [...action.updatedCart];

    case "Increase":
      return [...action.updatedCart];

    case "Decrease":
      return [...action.updatedCart];

    default:
      state;
  }
};

export default CartReducer;
