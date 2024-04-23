<template>
  <main id="register-form">
    <section class="form-details">
      <h2>Register an account</h2>
      <p>Already have an account? <router-link to="/sign-in">Sign in</router-link></p>
      <!-- Sign in with Google -->
      <button btnType="primary" :onClick="signInWithGoogle" class="google-button">Sign in with Google</button>
      <section class="or-bar">
        <div class="bar"></div>
        <p class="or-text">Or</p>
        <div class="bar"></div>
      </section>
      <p><input type='text' placeholder="Email" v-model='email'/></p>
      <p><input type='password' placeholder="Password" v-model='password'/></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <p><button @click="register">Let's eat!</button></p>
    </section>
    <section class="people-box">
      <RandomPeople />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
import RandomPeople from '../components/RandomPeople.vue'

const email = ref('')
const password = ref('')
const errMsg = ref()

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

// Sign in with Google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Successfully logged in with Google!');
      router.push('/')
    })
    .catch((error) => {
      errMsg.value = 'Failed to log in with Google';
    });
};

</script>

<style scoped>

#register-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  background-color: #ffffff;
}

#register-form h2, #register-form p {
  text-align: center;
}

.google-button {
  align-self: start;
  margin: 0 auto;
}

.or-bar {
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem 0;
}

.or-text {
  margin: 0 1rem;
}

.bar {
  flex: 1;
  height: 1px;
  background-color: rgba(0,0,0,0.1);
  align-self: center;
}

.form-details {
  width:40%;
  margin-left:10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:2rem;
}

.people-box {
  width:40%;
  margin-right:10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.form-details h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 0
}

.form-details p {
  margin-bottom: 0rem;
}

.form-details input {
  padding: 0.5rem;
  margin-bottom: 0rem;
}

.form-details button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  margin-top:2rem;
}

</style>