<template>
  <div class="columns is-centered">

    <div class=" center section mt-6 mb-6 ">
      <div class="has-text-centered mb-2">
        <h1 class="title">Signup</h1>
      </div>
      <div class="box mt-4">

        <b-steps
            v-model="activeStep"
            :has-navigation='navigation'
            label-position="bottom"
            mobile-mode="minimalist">
          <b-step-item step="1" label="Create Account">
            <div class="column mx-2">
              <div class="">
                <section>
                  <b-field
                      label="Email"
                      :type="emailType"
                      :message="emailMsg"
                  >
                    <b-input type="email" v-model.trim="$v.email.$model" value="" maxlength="30"></b-input>
                  </b-field>

                  <b-field
                      label="Password"
                      :type="pwdType"
                      :message="pwdMsg"
                  >
                    <b-input type="password" v-model.trim="$v.password.$model" value="" password-reveal></b-input>
                  </b-field>
                  <b-field label="Confirm Password"
                           :type="rPwdType"
                           :message="rPwdMsg"
                  >
                    <b-input type="password" v-model.trim="$v.repeatPassword.$model" value="" password-reveal></b-input>
                  </b-field>
                </section>
                <div class="has-text-right mt-6">
                  <b-button type="is-success" @click="submit">Submit</b-button>
                </div>
              </div>
            </div>

          </b-step-item>

          <b-step-item step="2" label="Confirm Account">
            <b-field label="Confirm Code">
              <b-input  v-model="otp" value="" ></b-input>
            </b-field>
            <div class="has-text-right mt-6">
              <b-button type="is-success" @click="submitOtp">Submit</b-button>
            </div>
          </b-step-item>


          <b-step-item step="3" label="Finish" disabled>
            <h1 class="title has-text-centered">Thank you for joining into our family</h1>
            <div class="has-text-centered mt-6">
              <b-button outlined type="is-success" @click="$router.push('/login')">Go to Login</b-button>
            </div>
          </b-step-item>

        </b-steps>
      </div>
    </div>
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
import User from '../models/user'
import {SnackbarProgrammatic as Snackbar} from 'buefy'

export default {
  data() {
    return {
      name: "",
      activeStep: 0,
      navigation: false,
      emailMsg: "",
      emailType: "",
      pwdMsg: "",
      pwdType: "",
      rPwdMsg: "",
      rPwdType: "",
      email: "",
      password: "",
      repeatPassword: "",
      signup: false,
      otp: ""
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      containsUppercase: function (value) {
        return /[A-Z]/.test(value)
      },
      containsLowercase: function (value) {
        return /[a-z]/.test(value)
      },
      containsNumber: function (value) {
        return /[0-9]/.test(value)
      },
      containsSpecial: function (value) {
        return /[#?!@$%^&*-]/.test(value)
      }
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  watch: {
    email: function () {
      if (this.$v.email.$error) {
        console.log("error")
        this.emailMsg = "Please enter valid email"
        this.emailType = "is-danger"
        this.signup = false
      } else {
        this.emailType = "is-success"
        this.emailMsg = ""
        this.signup = true
      }
    },
    password: function () {
      if (this.$v.password.$error) {
        console.log("error")
        this.pwdMsg = "Must be at least 8 characters and contain a lowercase character, uppercase character, special character, and a number."
        this.pwdType = "is-danger"
        this.signup = false
      } else {
        this.pwdType = "is-success"
        this.pwdMsg = ""
        this.signup = true
      }
    },
    repeatPassword: function () {
      if (this.$v.repeatPassword.$error) {
        console.log("error")
        this.rPwdMsg = "Must be same as password"
        this.rPwdType = "is-danger"
        this.signup = false
      } else {
        this.rPwdType = "is-success"
        this.rPwdMsg = ""
        this.signup = true
      }
    }

  },
  methods: {
    submit() {
      let loader = this.$loading.show({
        // Optional parameters
        container: false,
      });
      if (this.signup) {
        if (this.email && this.repeatPassword) {
          const user = new User(this.email, this.repeatPassword);
          this.$store.dispatch('auth/register', user).then(
              () => {
                loader.hide()
                this.activeStep = 1;
                // this.$router.push('/about');
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
        Snackbar.open('Please enter valid details')

      }
    },
    submitOtp() {
      let loader = this.$loading.show({
        // Optional parameters
        container: false,
      });
      if (this.signup) {
        if (this.email && this.otp) {
          const user = new User(this.email, this.password, this.otp);
          this.$store.dispatch('auth/confirmSignup', user).then(
              () => {
                loader.hide()
                this.activeStep = 2;
                // this.$router.push('/about');
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
        Snackbar.open('Please enter valid details')

      }
    }
  }
};
</script>
