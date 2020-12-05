<template>

</template>

<script>
import { StripeCheckout } from 'vue-stripe-checkout';
export default {
  components: {
    StripeCheckout
  },
  created() {
    this.checkout();
  },
  data: () => ({
    loading: false,
    publishableKey: "pk_test_51HtbqBDbq61XtTMumFRzwnKyqSh6KWQjNGrgG3aWlpz6trnOZJxiBPsTCtbHT2j8uPivrNlZcoFDe9QWC9TuvKHo00khYibIEC",
    items: [
      {
        plan: 'price_1Hv7dBDbq61XtTMulRSiu6L9',
        quantity: 1
      }
    ],
    successUrl: 'http://localhost:8080/',
    cancelUrl: 'http://localhost:8080/checkout',
  }),
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  }
}
</script>