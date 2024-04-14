export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: {...item, selected: true},
});

export const removeFromCart = (itemId) => ({
  type: 'REMOVE_FROM_CART',
  payload: itemId,
});


export const addToCartNotification = (item) => ({
  type: 'ADD_TO_CART_NOTIFICATION',
  payload: item,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
