<template>
  <div class="section">
    <div class="container">
      <div class="column">
        <div class="box">
          <div class="has-text-centered">
            <h1 class="title is-1 mb-6"> Pricing </h1>
          </div>
          <div class="pricing-table">
            <div class="pricing-plan is-warning">
              <div class="plan-header">Free Trail</div>
              <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>0</span>/month
              </div>
              <div class="plan-items">
                <div class="plan-item">3 hours</div>
                <div class="plan-item">7 days validity</div>
                <div class="plan-item">-</div>
              </div>
              <div v-if="noTrail" class="plan-footer">
                <button class="button is-fullwidth" @click="trail">Choose</button>
              </div>
            </div>

            <div class="pricing-plan is-active">
              <div class="plan-header">Family Pack</div>
              <div class="plan-price"><span class="plan-price-amount"><span
                  class="plan-price-currency">$</span>10</span>/month
              </div>
              <div class="plan-items">
                <div class="plan-item">60 hours</div>
                <div class="plan-item">30 days Validity</div>
                <div class="plan-item">Customer Support</div>
              </div>
              <stripe-checkout
                  v-if="!status"
                  ref="checkoutRef"
                  :pk="publishableKey"
                  :session-id="sessionID"
              >
                <template slot="checkout-button">
                  <div v-if="noSubscribed" class="plan-footer">
                    <button class="button is-fullwidth" @click="checkout">Choose</button>
                  </div>
                </template>
              </stripe-checkout>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/http/user-service";
import {SnackbarProgrammatic as Snackbar} from "buefy";
import {StripeCheckout} from 'vue-stripe-checkout';

export default {
  created() {
    let loader = this.$loading.show({
      // Optional parameters
    });
    UserService.getUserDetails().then(
        response => {
          loader.hide()
          console.log(response.data)
          this.status = response.data['subscription']['status'] === "active"
        },
        error => {
          loader.hide()
          this.message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
  components: {
    StripeCheckout
  },
  data() {
    return {
      status: false,
      sessionID: "",
      noTrail: !this.$store.state.auth.user['has_trail_ended'],
      noSubscribed: !this.$store.state.auth.user['subscription_status'],
      loading: false,
      publishableKey: "pk_test_51HtbqBDbq61XtTMumFRzwnKyqSh6KWQjNGrgG3aWlpz6trnOZJxiBPsTCtbHT2j8uPivrNlZcoFDe9QWC9TuvKHo00khYibIEC",

    }
  },
  methods: {
    checkout() {
      let loader = this.$loading.show({
        // Optional parameters
        container: false,
      });
      UserService.getCheckoutSessionID().then(
          (data) => {
            loader.hide()
            this.sessionID = data["data"]["id"]
            this.$refs.checkoutRef.redirectToCheckout();
          },
          error => {
            loader.hide()
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            Snackbar.open("Unable to process your purchase")

          }
      );
    },
    trail() {
      let loader = this.$loading.show({
        // Optional parameters
        container: false,
      });
      UserService.CreateFreeTrail().then(
          () => {
            loader.hide()
            Snackbar.open('Your 7 Days Trial Activated')
            this.noTrail = false
          },
          error => {
            loader.hide()
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            Snackbar.open("Unable to activate your trial")

          }
      );
    }
  }
};
</script>

<style lang="sass">
//@import "../assets/css/pricing.sass"

</style>