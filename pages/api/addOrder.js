const { connectToDatabaseUsingCache, findNotDeleted } = require('../../services/db')
const stripe = require('../../services/stripe')
let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  // 1. get order
  const orderCount = await db.collection('orders_counter')
  const currentCounter = await orderCount.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    { returnOriginal: true, new: false }
  )
    // add prefix
    const orderNumber = (currentCounter.value.count % 100) + 1
    const paddedOrderNum = orderNumber < 10 ? '00' + orderNumber : (orderNumber < 100 ? '0' + orderNumber : orderNumber)

  const cart = req.body.cart
  const order = {
    status: 'open',
    createdDate: new Date(),
    // source: cart.token,
    items: cart.items,
    totalInCents: cart.cartTotal,
    surchargeInCents: cart.cartSurcharge,
    subTotalInCents: cart.cartSubTotal,
    email: cart.email,
    pickupName: cart.pickupName,
    pickupTime: cart.pickupTime,
    phone: cart.phone,
    orderNumber: paddedOrderNum
  }
  // 2. recalculate the total of the price
  const amount = order.items.reduce(
    (tally, item) => tally + item.totalPrice * item.quantity,
    0
  )
  console.log(`Going to charge for total amount of ${amount}`)
  // 3. create stripe charge
  // const charge = await stripe.charges.create({
  //   amount: amount + 100,
  //   currency: 'AUD',
  //   source: cart.token
  // })
  // 4. save order to db
  const { insertedId } = await db.collection('orders').insertOne(order)
  // 5. create stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'meals'
          },
          unit_amount: amount
        },
        quantity: 1
      }
    ],
    customer_email: cart.email,
    mode: 'payment',
    success_url: `${process.env.NEXT_CLIENT_BASE_URL}/checkout-success?orderId=${insertedId}`,
    cancel_url: `${process.env.NEXT_CLIENT_BASE_URL}/checkout`
  })
  // 6. update order session id
  await db
    .collection('orders')
    .updateOne({ _id: insertedId }, { $set: { sessionId: session.id, successUrl: `${process.env.NEXT_CLIENT_BASE_URL}/checkout-success?orderId=${insertedId}` } })
  res.status(200).json(session)
}
