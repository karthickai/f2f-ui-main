<template>
  <div>
    <h1 class="title">Feedback</h1>

    <section>
      <b-field
          label="Email"
          :type="emailType"
          :message="emailMsg"
      >
        <b-input type="email" v-model.trim="$v.email.$model" value=""></b-input>
      </b-field>

      <b-field label="Message" :type="MessageType" :message="MessageMsg">
        <b-input maxlength="200" type="textarea" v-model.trim="$v.message.$model" value=""></b-input>
      </b-field>
    </section>
    <div class="has-text-right mt-6" v-if="submit">
      <b-button type="is-success" disabled>Submit</b-button>
    </div>
    <div class="has-text-right mt-6" v-if="!submit">
      <b-button type="is-success" @click="send">Submit</b-button>
    </div>
  </div>
</template>

<script>
import {required, email, minLength, maxLength} from 'vuelidate/lib/validators'
import UserService from "@/http/user-service";
import {SnackbarProgrammatic as Snackbar} from 'buefy'

export default {
  name: "feedback",
  data() {
    return {
      emailMsg: "",
      emailType: "",
      MessageMsg: "",
      MessageType: "",
      submit: false,

    }
  },
  validations: {
    email: {
      required,
      email,
    },
    message: {
      required,
      minLength: minLength(16),
      maxlength: maxLength(200)
    }
  },
  watch: {
    email: function () {
      if (this.$v.email.$error) {
        this.emailMsg = "Please enter valid email"
        this.emailType = "is-danger"
        this.submit = false
      } else {
        this.emailType = "is-success"
        this.emailMsg = ""
        this.submit = true
      }
    },
    message: function () {
      if (this.$v.message.$error) {
        this.MessageMsg = "Min Length 16, Max Length 200"
        this.MessageType = "is-danger"
        this.submit = false

      } else {
        this.MessageMsg = "is-success"
        this.MessageType = ""
        this.submit = true
      }
    }
  },
  methods: {
    send() {
      let loader = this.$loading.show({
        // Optional parameters
      });
     UserService.createFeedback({
       email: this.email,
       message: this.message
     }).then(
         () => {
           loader.hide()
           Snackbar.open("Successfully Submitted")

         },
         error => {
           loader.hide()
           this.message =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString();
         }
     )
    }
  }
}
</script>

<style scoped>

</style>