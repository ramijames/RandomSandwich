<script>
import { ref, onMounted } from 'vue';
import RandomSandwich from './components/RandomSandwich.vue'
import Title from './components/Title.vue'

export default {
  data() {
    return {
      
    }
  },
  setup() {
    const selectedColor = ref(null);

    onMounted(() => {
      const colors = [
        { label: "Pickle", hex: "#3E9C13", image: "/backgrounds/bg-pickle.png" },
        { label: "Tomato", hex: "#DB6548", image: "/backgrounds/bg-tomato.png" },
        { label: "Carrot", hex: "#D1AC2A", image: "/backgrounds/bg-carrot.png" },
        { label: "Eggplant", hex: "#7844AA", image: "/backgrounds/bg-eggplant.png" },
        { label: "Mushroom", hex: "#BD9B8E", image: "/backgrounds/bg-mushroom.png" },
      ];
      const randomIndex = Math.floor(Math.random() * colors.length);
      selectedColor.value = colors[randomIndex];
      document.body.style.backgroundImage = `url(${selectedColor.value.image})`;
      document.body.style.backgroundColor = selectedColor.value.hex;
    });

    return {
      selectedColor
    };
  },
  components: {
    RandomSandwich,
    Title,
  }
}

</script>

<template>
  <main class="container">
    <Title />
    <RandomSandwich />
  </main>
</template>

<style scoped>

</style>
