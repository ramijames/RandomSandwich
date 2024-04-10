<template>
  <section id="footer">
    <section class="links">
      <p>With ♥ by <a href="https://www.ramijames.com">Rami James</a></p>
      <p>Star on <a href="https://github.com/ramijames/RandomSandwich">Github</a></p>
    </section>
  </section>
</template>

<style scoped>

.links {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1rem;
  padding:1rem 2rem 0 2rem;
  color: #000;
}

@media only screen and (min-width: 1600px) {
  .links {
    font-size:1vw;
  }
}

.links a {
  font-weight: 600;
}

</style>