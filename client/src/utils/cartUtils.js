export const addDecimals = (num) => {
  return(Math.round(num*100) / 100).toFixed(2)
}

export const updateCart = (state)=>{
  //Calculate items price
  state.itemsPrice= addDecimals(state.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0))

  //Calculate shipping price (If order is over $100 then free else $10 shipping)
  state.shippingPrice= addDecimals(state.itemsPrice > 100000 ? 0 : 10000)

  //Calculate taxes price
  state.taxPrice= addDecimals(Number((0.19*state.itemsPrice).toFixed(2)))

  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) + 
    Number(state.shippingPrice) +
    Number(state.taxPrice) 
  ).toFixed(2)

  localStorage.setItem('cart', JSON.stringify(state))

  return state
}