<template>
  <div>
    <h1 class="title">Subscription page </h1>
    <div class="box mt-6">
      <h4 class="title is-4">Plane Name : <a
          class="subtitle has-text-weight-bold has-text-primary		">{{ planName }}</a></h4>
      <h4 class="title is-4">Plane Start : <a class="subtitle  is-primary">{{ planeStart }}</a></h4>
      <h4 class="title is-4">Plane End : <a class="subtitle  is-primary">{{ planeEnd }}</a></h4>
      <h4 class="title is-4">Status : <a class="subtitle has-text-weight-bold has-text-success	">{{ status }}</a></h4>

      <h4  v-if="noTrail" class="title is-4">Invoice :
        <b-button type="is-primary is-small" outlined @click="btnClick">  Download Here</b-button>
      </h4>
    </div>
    <div v-if="noTrail" class="is-justify-content-right">
      <div v-if="!cancelled" class="level-right">
        <b-button type="is-danger" @click="confirm">Cancel Subscription</b-button>
      </div>
    </div>

  </div>
</template>

<script>
import UserService from "@/http/user-service";

export default {
  created() {
    let loader = this.$loading.show({
      // Optional parameters
    });
    UserService.getUserDetails().then(
        response => {
          loader.hide()
          console.log(response.data)
          this.planName = response.data['subscription']['id'] ? "Family Pack" : "7 Days free trail"
          this.noTrail = response.data['subscription']['id']
          this.cancelled = (response.data["subscription"]["status"] !== "active")
          this.pdf = response.data['latest_invoice_pdf']
          let end = new Date(0); // The 0 there is the key, which sets the date to the epoch
          end.setUTCSeconds(response.data['subscription']['current_period_end']);
          this.planeEnd = end
          let start = new Date(0); // The 0 there is the key, which sets the date to the epoch
          start.setUTCSeconds(response.data['subscription']['current_period_start']);
          this.planeStart = start
          this.status = response.data['subscription']['status']
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
  data() {
    return {
      planName: "",
      planeStart: "",
      planeEnd: "",
      status: "",
      noTrail: false,
      cancelled: false,
      pdf: ""
    }
  },
  methods : {
    btnClick() {
      window.open(this.pdf);
    },
    confirm() {
      this.$buefy.dialog.confirm({
        message: 'Are you Sure ?',
        onConfirm: () => {
          let loader = this.$loading.show({
            // Optional parameters
          });
          UserService.cancelSubscription().then(
              () => {
                loader.hide()
                this.$router.go(this.$router.currentRoute)
              },
              error =>{
                loader.hide()
                this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
              },
          )
        }
      })
    },
  }
};
</script>

<style>
</style>