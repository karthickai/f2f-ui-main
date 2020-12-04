<template>
  <div class="columns mt-6 mb-6">
    <div class="column"></div>

    <div class="column mx-6">
      <div class="has-text-centered mb-2">
        <h1 class="title">Signup</h1>
      </div>

      <div class="box">
        <section>
          <b-field label="First Name">
            <b-input v-model="name"></b-input>
          </b-field>
          <b-field label="Last Name">
            <b-input v-model="name"></b-input>
          </b-field>
          <b-field
            label="Email"
            type="is-danger"
            message="This email is invalid"
          >
            <b-input type="email" value="" maxlength="30"> </b-input>
          </b-field>

          <b-field label="Password">
            <b-input type="password" value="" password-reveal> </b-input>
          </b-field>
          <b-field label="Confirm Password">
            <b-input type="password" value="" password-reveal> </b-input>
          </b-field>
          <div class="has-text-right mt-1">
            <b-button size="is-small" type="is-success">Submit</b-button>
          </div>
        </section>
      </div>
      <div class="has-text-centered">
        <a class="subtitle-2" href="/login"> Login</a>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
};
</script>
