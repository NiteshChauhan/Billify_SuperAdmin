import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import AuthLayout from "@/layouts/AuthLayout.vue";
import SuperAdminLayout from "@/layouts/SuperAdminLayout.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", name: "login", component: Login }],
  },
  {
    path: "/",
    component: SuperAdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "dashboard", component: Dashboard },
      { path: "dashboard", redirect: "/" },
      { path: "admins", name: "admins", component: () => import("@/views/AdminList.vue") },
      { path: "admins/create", name: "admin-create", component: () => import("@/views/AdminForm.vue") },
      { path: "admins/:id", name: "admin-detail", component: () => import("@/views/AdminDetail.vue") },
      { path: "admins/:id/edit", name: "admin-edit", component: () => import("@/views/AdminForm.vue") },
      { path: "admins/:id/subscription", name: "admin-subscription", component: () => import("@/views/AdminSubscription.vue") },
      { path: "plans", name: "plans", component: () => import("@/views/PlanList.vue") },
      { path: "plans/create", name: "plan-create", component: () => import("@/views/PlanForm.vue") },
      { path: "plans/:id/edit", name: "plan-edit", component: () => import("@/views/PlanForm.vue") },
      { path: "settings", name: "settings", component: () => import("@/views/Settings.vue") },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) return "/login";
  if (to.path === "/login" && auth.token) return "/";
});

export default router;
