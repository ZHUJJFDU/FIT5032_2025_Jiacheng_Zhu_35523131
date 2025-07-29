<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <li class="nav-item"><a href="#" class="nav-link">Contact us</a></li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <button @click="logout" class="nav-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isAuthenticated = ref(false);

function checkAuth() {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
}

onMounted(checkAuth);
window.addEventListener('storage', checkAuth);

function logout() {
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
  router.push('/login');
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>

注销功能已经在 BHeader.vue 中实现：登录后，导航栏会显示 'Logout' 按钮，点击时会移除 localStorage 中的认证状态，更新 isAuthenticated，并跳转到登录页。

当前代码片段（确认注销逻辑）：
