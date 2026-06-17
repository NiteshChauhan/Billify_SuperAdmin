<template>
  <section class="page-stack">
    <div class="toolbar">
      <router-link class="primary" to="/plans/create">Create Plan</router-link>
    </div>
    <section class="panel">
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Limits</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in plans" :key="plan._id">
            <td><strong>{{ plan.name }}</strong><small>{{ plan.code }}</small></td>
            <td>{{ plan.currency }} {{ plan.price }}</td>
            <td>{{ plan.durationValue }} {{ plan.durationType }}</td>
            <td>{{ plan.maxBranches }} branches, {{ plan.maxUsers }} users, {{ plan.maxInvoicesPerMonth }} invoices</td>
            <td><span :class="['badge', plan.isActive ? 'ok' : 'off']">{{ plan.isActive ? "Active" : "Inactive" }}</span></td>
            <td class="actions">
              <router-link :to="`/plans/${plan._id}/edit`">Edit</router-link>
              <button @click="toggle(plan)">{{ plan.isActive ? "Disable" : "Enable" }}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!plans.length" class="empty-row">No subscription plans yet.</div>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { listPlansApi, updatePlanStatusApi } from "@/api/superAdminApi";

const plans = ref([]);
const load = async () => {
  plans.value = await listPlansApi();
};
const toggle = async (plan) => {
  await updatePlanStatusApi(plan._id, { isActive: !plan.isActive });
  await load();
};
onMounted(load);
</script>
