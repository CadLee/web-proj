require('dotenv').config()
const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body // amount in cents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'aud',
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(4242, () => console.log('Stripe server running on port 4242'))
