<script setup>

</script>

<template>
  <section id="title">
    <h1 class="sammitch-header center">Generate a Random Sandwich</h1>
    <!-- <small class="sammitch-intro center">(Don't know what to eat? We do.)</small> -->
  </section>
</template>

<style scoped>

#title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 1rem;
  background-color: white;
}

.sammitch-header {
  font-size:3rem;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  color:black;
  margin:0;
}

    @media only screen and (min-width: 1600px) {
      .sammitch-header {
        font-size:3dvw;
      }
    }


</style>