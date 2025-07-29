<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Firebase Authentication</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                v-model="email" 
                placeholder="Enter your email"
              >
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                v-model="password" 
                placeholder="Enter your password"
              >
            </div>
            <div class="d-grid gap-2">
              <button 
                @click="signIn" 
                class="btn btn-primary" 
                :disabled="loading"
              >
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </button>
              <button 
                @click="signUp" 
                class="btn btn-secondary" 
                :disabled="loading"
              >
                {{ loading ? 'Signing up...' : 'Sign Up' }}
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
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const signIn = async () => {
  // TODO: Implement Firebase sign in
  console.log('Sign in with:', email.value, password.value)
}

const signUp = async () => {
  // TODO: Implement Firebase sign up
  console.log('Sign up with:', email.value, password.value)
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> 