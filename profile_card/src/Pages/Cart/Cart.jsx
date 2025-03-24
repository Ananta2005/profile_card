import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, clearCart } from '../../Slice/cartSlice'

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const dispatch = useDispatch()

  return (
    <div>
        <h1>Shopping Cart</h1>
        
            {cartItems.length === 0 ? (
              <p>Your Cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ${item.totalPrice}</p>
                        <button onClick={() => dispatch(removeItem(item.id))}>
                          Remove Item
                        </button>
                    </li>
                ))}
              </ul>
            )}
        
        {cartItems.length > 0 && (
          <>
            <h2>Total Amount: ${totalAmount}</h2>
            <button onClick={() => dispatch(clearCart())}>Clear cart</button>
          </>
        )}
        
    </div>
  )
}

export default Cart