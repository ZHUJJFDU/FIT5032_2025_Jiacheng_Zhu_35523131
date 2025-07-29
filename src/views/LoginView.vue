<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

function handleLogin() {
  if (username.value === 'admin' && password.value === 'password') {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/about');  // 修改为跳转到 About
  } else {
    alert('Invalid credentials');
  }
}
</script>