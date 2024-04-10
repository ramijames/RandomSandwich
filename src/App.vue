<script>
import { ref, watchEffect, onMounted } from 'vue'
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Title from './components/Title.vue'
import Footer from './components/Footer.vue'

export default {
  data() {
    return {
    }
  },
  setup() {
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
      isLoggedIn,
      handleSignOut
    };
  },
  methods: {
  },
  components: {
    Title,
    Footer
  }
}

</script>

<template>
  <main>
    <Title />
    <nav class="nav-links">
      <section class="routes">
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add</router-link>
      </section>
      <section class="actions">
        <button v-if="isLoggedIn" @click="handleSignOut">Logout</button> 
        <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
        <router-link v-if="!isLoggedIn" to="/sign-in">Login</router-link>
      </section>
    </nav>
    <router-view />
    <Footer />
  </main>
</template>

<style scoped>

nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin:0 auto;
  padding:0 2rem;
  gap:2rem;
  align-items: center;
  padding: 0 1rem 1rem 1rem;
  background-color: rgba(255,255,255,1);
}

nav a {
  text-decoration: none;
  color: black;
}

.routes {
  display: flex;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

</style>
