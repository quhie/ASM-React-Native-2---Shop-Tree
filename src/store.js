import { createStore } from 'redux';
import userReducer from './reducers/userReducer';

const store = createStore(userReducer);


const initialState = {
  user: null,
  cart: [],
};
export default store;
