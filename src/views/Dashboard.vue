<template>
  <section class="page-stack">
    <div class="metric-grid">
      <article v-for="card in cards" :key="card.label" class="metric-card">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </article>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h2>Subscription Attention</h2>
        <router-link class="text-link" to="/admins">View admins</router-link>
      </div>
      <div class="empty-row">
        {{ stats.expiringSoon || 0 }} accounts expire within 10 days and {{ stats.expiredSubscriptions || 0 }} are expired.
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { dashboardStatsApi } from "@/api/superAdminApi";

const stats = ref({});

const cards = computed(() => [
  { label: "Total Admins", value: stats.value.totalAdmins || 0 },
  { label: "Active Admins", value: stats.value.activeAdmins || 0 },
  { label: "Inactive Admins", value: stats.value.inactiveAdmins || 0 },
  { label: "Expired Subscriptions", value: stats.value.expiredSubscriptions || 0 },
  { label: "Expiring in 10 Days", value: stats.value.expiringSoon || 0 },
  { label: "Total Branches", value: stats.value.totalBranches || 0 },
  { label: "Revenue This Month", value: stats.value.totalRevenue || 0 },
]);

onMounted(async () => {
  stats.value = await dashboardStatsApi();
});
</script>
