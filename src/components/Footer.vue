<template>
  <section id="footer">
    <section class="links">
      <p>With ♥ by <a href="https://www.ramijames.com">Rami James</a></p>
      <p>Star on <a href="https://github.com/ramijames/RandomSandwich">Github</a></p>
    </section>
  </section>
</template>

<style scoped>

#footer {
  background-color: #000000;
}

.links {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1rem;
  padding:2rem;
  color: #fff;
}

.links a {
  font-weight: 600;
  color:#fff;
}

</style>