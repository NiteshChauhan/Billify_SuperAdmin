<template>
  <section v-if="admin" class="page-stack">
    <div class="toolbar">
      <router-link to="/admins">Back</router-link>
      <router-link class="primary" :to="`/admins/${admin._id}/edit`">Edit</router-link>
      <router-link :to="`/admins/${admin._id}/subscription`">Subscription</router-link>
      <button :class="admin.isActive ? 'danger' : 'primary'" @click="toggleStatus">
        {{ admin.isActive ? "Deactivate" : "Activate" }}
      </button>
    </div>

    <section class="panel detail-grid">
      <div>
        <span class="eyebrow">Admin</span>
        <h2>{{ admin.name }}</h2>
        <p>{{ admin.email }}</p>
      </div>
      <div>
        <span class="eyebrow">Company</span>
        <h2>{{ admin.companyId?.name || "-" }}</h2>
        <p>{{ admin.companyId?.companyCode || "-" }}</p>
      </div>
      <div>
        <span class="eyebrow">Account</span>
        <h2>{{ admin.isActive ? "Active" : "Inactive" }}</h2>
        <p>{{ admin.companyId?.subscriptionStatus || admin.subscriptionStatus || "-" }}</p>
      </div>
    </section>

    <section class="metric-grid">
      <article v-for="item in usageCards" :key="item.label" class="metric-card">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getAdminApi, updateAdminStatusApi } from "@/api/superAdminApi";

const route = useRoute();
const admin = ref(null);

const usageCards = computed(() => [
  { label: "Branches", value: admin.value?.usage?.branches || 0 },
  { label: "Users", value: admin.value?.usage?.users || 0 },
  { label: "Invoices This Month", value: admin.value?.usage?.invoicesThisMonth || 0 },
  { label: "Customers", value: admin.value?.usage?.customers || 0 },
  { label: "Payments", value: admin.value?.usage?.payments || 0 },
  { label: "Sales Amount", value: admin.value?.totals?.salesAmount || 0 },
]);

const load = async () => {
  admin.value = await getAdminApi(route.params.id);
};

const toggleStatus = async () => {
  await updateAdminStatusApi(admin.value._id, { isActive: !admin.value.isActive });
  await load();
};

onMounted(load);
</script>
