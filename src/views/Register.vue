<template>
  <main id="register-form">
    <section class="form-details">
      <h2>Register an account</h2>
      <p>Already have an account? <router-link to="/sign-in">Sign in</router-link></p>
      <p><input type='text' placeholder="Email" v-model='email'/></p>
      <p><input type='password' placeholder="Password" v-model='password'/></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <p><button @click="register">Let's eat!</button></p>
    </section>
    <img src="/register-woman.png" alt="Man eating a random sandwich" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')

const router = useRouter() // get a reference to our vue router
const register = () => {
  createUserWithEmailAndPassword(getAuth(),email.value, password.value) // need .value because ref()
  .then((data) => {
    console.log('Successfully registered!');
    router.push('/')
  })
  .catch(error => {
    console.log(error.code)
    alert(error.message);
  });
}

</script>

<style>

#register-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.form-details {
  max-width: 400px;
}

.form-details h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-details p {
  margin-bottom: 1rem;
}

.form-details input {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.form-details button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}

</style>