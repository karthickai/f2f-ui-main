<template>
  <div class="columns mt-6 mb-6 vld-parent">
    <div class="column"></div>

    <div class="column mx-6">
      <div class="has-text-centered mb-2">
        <h1 class="title">Login</h1>
      </div>

      <div class="box">
        <section>
          <b-field
              label="Email"
              :type="emailType"
              :message="emailMsg"
          >
            <b-input type="email" v-model.trim="$v.email.$model" value="" maxlength="30"></b-input>
          </b-field>

          <b-field label="Password">
            <b-input type="password"
                     v-model="password"
                     password-reveal>
            </b-input>
          </b-field>
          <div class="has-text-right mt-1">
            <b-button
                type="is-success"
                @click="login"
            >Login
            </b-button
            >
          </div>
        </section>
      </div>
      <div class="has-text-centered">
        <a class="subtitle-2" href="/forgot"> Forgot Password</a>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import User  from '../models/user'

export default {
  data() {
    return {
      email: "",
      emailMsg: "",
      emailType: "",
      password: "",
      isLogin: false,
      isLoading: false,
      fullPage: true
    };
  },
  watch: {
    email: function () {
      if (this.$v.email.$error) {
        console.log("error")
        this.emailMsg = "Please enter valid email"
        this.emailType = "is-danger"
        this.isLogin=false
      } else {
        this.emailType = "is-success"
        this.emailMsg = ""
        this.isLogin = true
      }
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    login() {
      let loader = this.$loading.show({
        // Optional parameters
        container: false,
      });      if (this.isLogin) {
        if (this.email && this.password) {
          const user = new User(this.email, this.password);
          this.$store.dispatch('auth/login', user).then(
              () => {
                loader.hide()
                this.$router.push('/about');
              },
              error => {
                loader.hide()
                this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
              }
          );
        }

      } else {
        Snackbar.open('Please enter valid email')

      }
    }
  }
};
</script>
