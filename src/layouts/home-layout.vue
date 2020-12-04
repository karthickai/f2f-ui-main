<template>
  <div>
    <b-navbar
        class="navbar header is-primary"
        role="navigation"
        aria-label="main navigation"
    >
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="@/assets/logo.png" alt="LDimensions" height="36"/>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="/"> Home</b-navbar-item>
        <b-navbar-item href="/about"> About Us</b-navbar-item>
        <b-navbar-dropdown label="Products">
          <b-navbar-item href="/"> AI Movie Assistant</b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item href="/pricing"> Pricing</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" v-if="!$store.state.auth.user">
          <div class="buttons">
            <a class="button is-primary" href="/signup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/login"> Log in </a>
          </div>
        </b-navbar-item>
        <b-navbar-dropdown v-if="$store.state.auth.user" :label="$store.state.auth.user.email">
          <b-navbar-item href="/settings"> Settings</b-navbar-item>
          <b-navbar-item @click="logOut"> Logout</b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <div class="container">
      <slot />
      <!--    <div>-->
      <!--      <footer class="footer">-->
      <!--        <div class="content has-text-centered">-->
      <!--          <p>-->
      <!--            <strong>L4Dimensions</strong>-->
      <!--            The website content is licensed-->
      <!--            <a>@2020 L4D</a>.-->
      <!--          </p>-->
      <!--        </div>-->
      <!--      </footer>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: {name: "index"},
        },
      ],
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }  }
};
</script>

<style scoped>

</style> s