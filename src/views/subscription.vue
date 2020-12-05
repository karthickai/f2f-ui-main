<template>
  <div>
    <h1 class="title">Subscription page </h1>
    <div class="box mt-6">
      <h4 class="title is-4">Plane Name  : <a class="subtitle has-text-weight-bold has-text-primary		">{{planName}}</a></h4>
      <h4 class="title is-4">Plane Start : <a class="subtitle  is-primary">{{planeStart}}</a> </h4>
      <h4 class="title is-4">Plane End   : <a class="subtitle  is-primary">{{planeEnd}}</a> </h4>
      <h4 class="title is-4">Status      : <a class="subtitle has-text-weight-bold has-text-success	">{{status}}</a> </h4>


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
            this.planName =response.data['subscription']['plan_name']
            let end = new Date(0); // The 0 there is the key, which sets the date to the epoch
            end.setUTCSeconds(response.data['subscription']['plan_end']);
            this.planeEnd = end
            let start = new Date(0); // The 0 there is the key, which sets the date to the epoch
            start.setUTCSeconds(response.data['subscription']['plan_start']);
            this.planeStart = start
            this.status =response.data['subscription']['status']
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
      status: ""
    }
  }
};
</script>

<style>
</style>