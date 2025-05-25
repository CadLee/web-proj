<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const processing = ref(false)
const error = ref('')
const success = ref(false)
let elements, card

const props = defineProps({
  amount: { type: Number, required: true } // amount in cents
})

const emit = defineEmits(['payment-success'])

onMounted(async () => {
  const stripe = await stripePromise
  elements = stripe.elements()
  card = elements.create('card')
  card.mount('#card-element')
})

onBeforeUnmount(() => {
  if (card) card.unmount()
})

async function handleSubmit() {
  processing.value = true
  error.value = ''
  success.value = false

  try {
    // Call backend with fetch (no Axios)
    const response = await fetch(
      `${import.meta.env.VITE_STRIPE_BACKEND_URL}/create-payment-intent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: props.amount })
      }
    )
    const data = await response.json()

    const stripe = await stripePromise
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card }
    })

    if (stripeError) {
      error.value = stripeError.message
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      success.value = true
      emit('payment-success')
    }
  } catch (err) {
    error.value = 'Payment failed. Please try again.'
  }
  processing.value = false
}
</script>
