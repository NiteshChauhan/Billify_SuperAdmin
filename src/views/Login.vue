<template>
  <form class="form-stack" @submit.prevent="login">
    <label>
      Email
      <input v-model="email" type="email" autocomplete="email" required />
    </label>
    <label>
      Password
      <input v-model="password" type="password" autocomplete="current-password" required />
    </label>
    <p v-if="message" class="error">{{ message }}</p>
    <button class="primary block" :disabled="loading">
      {{ loading ? "Signing in..." : "Sign in" }}
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "@/api/superAdminApi";
import { useAuthStore } from "@/stores/authStore";

const email = ref("");
const password = ref("");
const loading = ref(false);
const message = ref("");
const router = useRouter();
const auth = useAuthStore();

const login = async () => {
  loading.value = true;
  message.value = "";
  try {
    const response = await loginApi({ email: email.value, password: password.value });
    auth.login(response.data);
    router.replace("/");
  } catch (err) {
    message.value = err.response?.data?.message || "Invalid email or password";
  } finally {
    loading.value = false;
  }
};
</script>
