import { uuid } from 'uuidv4'

export const isBrowser = () => typeof window !== 'undefined'

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (window.localStorage.getItem('cart')) {
      return JSON.parse(window.localStorage.getItem('cart'))
    } else {
      clearCart()
      return JSON.parse(window.localStorage.getItem('cart'))
    }
  }
}

export const setCart = (cart) =>
  isBrowser() && window.localStorage.setItem('cart', JSON.stringify(cart))

export const clearCart = () =>
  typeof window !== 'undefined' &&
  window.localStorage.setItem(
    'cart',
    JSON.stringify({
      cartTotal: 0,
      cartSurcharge: 0,
      cartSubTotal: 0,
      items: []
    })
  )

export const addItemToCart = (item, totalPrice, option, note, quantity) => {
  const cart = getCart()
  const cartTotal = cart.cartTotal + (totalPrice * quantity)
  console.log(`cartTotal = ${cartTotal}, totalPrice = ${totalPrice}, quantity = ${quantity}`)
  const cartSurcharge = 0
  setCart({
    cartTotal,
    cartSurcharge,
    cartSubTotal: cartTotal + cartSurcharge,
    items: [
      ...cart.items,
      {
        title: item.title,
        option,
        basePrice: item.priceInCents,
        item,
        totalPrice,
        note,
        id: uuid(),
        quantity
      }
    ]
  })
}

export const removeItemFromCart = (item) => {
  const cart = getCart()
  const cartTotal = cart.cartTotal - item.totalPrice * item.quantity
  const cartSurcharge = 0
  setCart({
    cartTotal,
    cartSurcharge,
    cartSubTotal: cartTotal + cartSurcharge,
    items: cart.items.filter((olditem) => olditem.id !== item.id)
  })
}
