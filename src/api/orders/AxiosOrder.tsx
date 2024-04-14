import axios from 'axios';
import { useSelector } from 'react-redux';

const AxiosOrder = () => {
  // @ts-ignore
  const user = useSelector((state) => state.user);
  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((total: number, item: { price: number; amount: number; }) => total + (item.price * item.amount), 0) + 25000;

  axios.post('http://localhost:3000/orders', {
    user: user,
    cart: cart,
    total: totalPrice // Add total price to the request
  })
    .then(response => {
      // Handle response here
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export default AxiosOrder;
