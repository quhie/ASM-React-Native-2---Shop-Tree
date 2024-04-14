const initialState = {
  user: null,
  cart: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_TO_CART':
      const existingCartItemIndex = state.cart.findIndex(cartItem => cartItem._id === action.payload._id);
      if (existingCartItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingCartItemIndex].amount = action.payload.amount;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'ADD_TO_CART_NOTIFICATION':
      return {
        ...state,
        lastAddedItem: action.payload,
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};



export default userReducer;
