<template>
  <div>
    <div class="bg mb-6">
      <section>
        <b-carousel :arrow="false">
          <b-carousel-item>
            <section :class="`hero is-medium`">
              <span class="image">
                <div class="hero-body has-text-centered">
                  <h1 class="title has-text-white">Your AI Movie Assistant</h1>
                  <h2 class="subtitle has-text-grey">
                    Enjoy Movie With Your Family
                  </h2>
                </div>
              </span>
            </section>
          </b-carousel-item>
        </b-carousel>
      </section>
    </div>
    <div class="box">
      <div class="has-text-centered">
        <h1 class="title mt-6">How does it works ?</h1>
        <h2 class="subtitle mt-1 mx-2">
          Convert your unsafe movie into safe movie with our unique AI powered
          Smart Movie Censor Engine. Upload your movie get blurred all the NSFW
          content. Download or Watch live in our web app. Enjoy movie with your
          family.
        </h2>
        <img src="../assets/tmp.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: relative;
  top: 100;
  left: 0;
  background: url("../assets/bg.png") no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}
</style>
