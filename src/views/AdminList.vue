<template>
  <section class="page-stack">
    <div class="toolbar">
      <input v-model="search" placeholder="Search admins" @keyup.enter="loadAdmins" />
      <button @click="loadAdmins">Search</button>
      <router-link class="primary" to="/admins/create">Create Admin</router-link>
    </div>

    <section class="panel">
      <table>
        <thead>
          <tr>
            <th>Admin</th>
            <th>Company</th>
            <th>Status</th>
            <th>Subscription</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin._id">
            <td>
              <strong>{{ admin.name }}</strong>
              <small>{{ admin.email }}</small>
            </td>
            <td>{{ admin.companyId?.name || "-" }}</td>
            <td><span :class="['badge', admin.isActive ? 'ok' : 'off']">{{ admin.isActive ? "Active" : "Inactive" }}</span></td>
            <td>{{ admin.subscription?.planName || admin.companyId?.subscriptionStatus || "Trial" }}</td>
            <td class="actions">
              <router-link :to="`/admins/${admin._id}`">View</router-link>
              <router-link :to="`/admins/${admin._id}/subscription`">Subscription</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!admins.length" class="empty-row">No admin accounts found.</div>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { listAdminsApi } from "@/api/superAdminApi";

const admins = ref([]);
const search = ref("");

const loadAdmins = async () => {
  const response = await listAdminsApi({ search: search.value });
  admins.value = response.data || response;
};

onMounted(loadAdmins);
</script>
