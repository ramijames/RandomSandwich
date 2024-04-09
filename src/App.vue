<script>
import { ref, watchEffect, onMounted } from 'vue'
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
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

    const router = useRouter()

    const isLoggedIn = ref(true)

    // runs after firebase is initialized
    onAuthStateChanged(getAuth(),function(user) {
        if (user) {
          isLoggedIn.value = true // if we have a user
        } else {
          isLoggedIn.value = false // if we do not
        }
    })

    const handleSignOut = () => {
      signOut(getAuth())
      router.push('/')
      console.log('Signed out')
    }

    return {
      selectedColor,
      isLoggedIn,
      handleSignOut
    };
  },
  methods: {
  },
  components: {
    RandomSandwich,
    Title,
  }
}

</script>

<template>
  <main class="container">
    <nav>
      <router-link to="/"> Home </router-link> |
      <span> 
        <router-link to="/feed"> Feed </router-link> |
      </span>
      <span v-if="isLoggedIn"> 
        <button @click="handleSignOut"> Logout </button> 
      </span>
      <span v-else>
        <router-link to="/register"> Register </router-link> |
        <router-link to="/sign-in"> Login </router-link>
      </span>
      
    </nav>
    <router-view />
    <!-- <Title /> -->
    <!-- <RandomSandwich /> -->
  </main>
</template>

<style scoped>

</style>
