<template>
  <section class="page-stack">
    <div class="toolbar">
      <router-link :to="`/admins/${adminId}`">Back</router-link>
      <button class="primary" @click="renew">Renew</button>
    </div>

    <form class="panel form-grid" @submit.prevent="save">
      <label>
        Plan
        <select v-model="form.planId">
          <option value="">Manual plan</option>
          <option v-for="plan in plans" :key="plan._id" :value="plan._id">
            {{ plan.name }} - {{ plan.currency }} {{ plan.price }}
          </option>
        </select>
      </label>
      <label>
        Billing Mode
        <select v-model="form.billingMode">
          <option value="manual">Manual</option>
          <option value="dynamic">Dynamic</option>
        </select>
      </label>
      <label>Start Date<input v-model="form.startDate" type="date" /></label>
      <label>End Date<input v-model="form.endDate" type="date" /></label>
      <label>
        Status
        <select v-model="form.status">
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="expired">Expired</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
      <label>Max Branches<input v-model.number="form.maxBranches" type="number" min="0" /></label>
      <label>Max Users<input v-model.number="form.maxUsers" type="number" min="0" /></label>
      <label>Max Invoices/Month<input v-model.number="form.maxInvoicesPerMonth" type="number" min="0" /></label>
      <div class="form-actions full">
        <button class="primary">Save Subscription</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import {
  getAdminSubscriptionApi,
  listPlansApi,
  renewAdminSubscriptionApi,
  saveAdminSubscriptionApi,
} from "@/api/superAdminApi";

const route = useRoute();
const adminId = route.params.id;
const plans = ref([]);
const form = reactive({
  planId: "",
  billingMode: "manual",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: "",
  status: "active",
  maxBranches: 1,
  maxUsers: 3,
  maxInvoicesPerMonth: 100,
});

const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

onMounted(async () => {
  plans.value = await listPlansApi();
  const subscription = await getAdminSubscriptionApi(adminId);
  if (subscription) {
    Object.assign(form, {
      planId: subscription.planId?._id || subscription.planId || "",
      billingMode: subscription.billingMode || "manual",
      startDate: toDateInput(subscription.startDate),
      endDate: toDateInput(subscription.endDate),
      status: subscription.status || "active",
      maxBranches: subscription.maxBranches || 1,
      maxUsers: subscription.maxUsers || 3,
      maxInvoicesPerMonth: subscription.maxInvoicesPerMonth || 100,
    });
  }
});

const save = async () => {
  await saveAdminSubscriptionApi(adminId, { ...form });
};

const renew = async () => {
  const subscription = await renewAdminSubscriptionApi(adminId, {});
  Object.assign(form, {
    endDate: toDateInput(subscription.endDate),
    status: subscription.status || "active",
  });
};
</script>
