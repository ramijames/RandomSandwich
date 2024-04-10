<script setup>

</script>

<template>
  <section id="title">
    <h1 class="sammitch-header center">Random Sandwich</h1>
    <!-- <small class="sammitch-intro center">(Don't know what to eat? We do.)</small> -->
  </section>
</template>

<style scoped>

#title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem;
  background-color: white;
}

.sammitch-header {
  font-size:5dvw;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  color:black;
  margin:0;
}

.sammitch-intro {
  font-size:2dvw;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  color:black;
}

@media only screen and (min-width: 1600px) {
  .sammitch-header {
    font-size:5dvw;
  }
}

</style>