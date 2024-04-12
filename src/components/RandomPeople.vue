<script>

import { ref, onMounted } from 'vue'

export default {
  name: 'RandomPeople',
  setup() {
    const selectedPerson = ref(null);
    
    onMounted(() => {
      const people = [
        { image: "/people/people-0.png" },
        { image: "/people/people-1.png" },
        { image: "/people/people-2.png" },
        { image: "/people/people-3.png" },
        { image: "/people/people-4.png" },
        { image: "/people/people-5.png" },
        { image: "/people/people-6.png" },
        { image: "/people/people-7.png" },
        { image: "/people/people-8.png" },
        { image: "/people/people-9.png" }
      ];
      const randomIndex = Math.floor(Math.random() * people.length);
      selectedPerson.value = people[randomIndex];
    });

    return {
      selectedPerson
    }
  }
}

</script>

<template>
  <section id="random-people">
    <img v-if="selectedPerson" :src="selectedPerson.image" class="people" alt="Random person" />
  </section>
</template>

<style scoped>

#random-people {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.people {
  width: 100%;
  height: auto;
}

</style>