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
    <nav class="nav-links">
      <section class="routes">
        <router-link to="/" class="logo"><img src="/logo.png" alt="Logo" /></router-link>
        <router-link to="/">Generator</router-link>
        <!-- <router-link v-if="isLoggedIn" to="/add">Add</router-link> -->
      </section>
      <section class="actions">
        <button v-if="isLoggedIn" @click="handleSignOut">Logout</button> 
        <router-link class="button" v-if="!isLoggedIn" to="/register">Register</router-link>
        <router-link class="button" v-if="!isLoggedIn" to="/sign-in">Login</router-link>
      </section>
    </nav>
    <router-view />
    <Footer />
  </main>
</template>

<style scoped>

.logo {
  border: none !important;
}

    .logo img {
      width:100px;
      height: auto;
    }

nav {
  display: flex;
  justify-content: space-between;
  padding:1rem 2rem;
  gap:2rem;
  align-items: center;
  background-color: rgba(255,255,255,1);
}

nav a {
  text-decoration: none;
  color: black;
  font-size: 1rem;
  align-self: center;
}

.router-link-active, 
.router-link-exact-active {
  border-bottom: 2px solid black;
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
