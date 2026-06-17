<template>
  <div class="shell">
    <aside class="sidebar">
      <h2>Super Admin</h2>
      <nav>
        <router-link v-for="item in navItems" :key="item.path" :to="item.path">
          <span>{{ item.icon }}</span>{{ item.label }}
        </router-link>
      </nav>
      <button class="danger block" @click="logout">Logout</button>
    </aside>

    <section class="workspace">
      <header class="topbar">
        <div>
          <p class="eyebrow">Platform console</p>
          <h1>{{ routeTitle }}</h1>
        </div>
        <div class="profile-chip">{{ auth.user?.name || "Owner" }}</div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const navItems = [
  { label: "Dashboard", path: "/", icon: "D" },
  { label: "Admins", path: "/admins", icon: "A" },
  { label: "Plans", path: "/plans", icon: "P" },
  { label: "Settings", path: "/settings", icon: "S" },
];

const routeTitle = computed(() => route.meta.title || route.name || "Dashboard");

const logout = () => {
  auth.logout();
  router.replace("/login");
};
</script>
