<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Create an Account</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                v-model="email" 
                placeholder="Email"
              >
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                v-model="password" 
                placeholder="Password"
              >
            </div>
            <div class="d-grid">
              <button 
                @click="register" 
                class="btn btn-primary" 
                :disabled="loading"
              >
                {{ loading ? 'Creating Account...' : 'Save to Firebase' }}
              </button>
            </div>
            <div v-if="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>
            <div v-if="success" class="alert alert-success mt-3">
              {{ success }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const register = () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Firebase Register Successful!')
      success.value = 'Account created successfully!'
      loading.value = false
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
      error.value = error.code
      loading.value = false
    })
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> 