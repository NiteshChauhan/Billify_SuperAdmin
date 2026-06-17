<template>
  <form class="panel form-grid" @submit.prevent="save">
    <label>Name<input v-model="form.name" required /></label>
    <label>Code<input v-model="form.code" required /></label>
    <label>Currency<input v-model="form.currency" /></label>
    <label>Price<input v-model.number="form.price" type="number" min="0" /></label>
    <label>
      Duration Type
      <select v-model="form.durationType">
        <option value="days">Days</option>
        <option value="months">Months</option>
        <option value="years">Years</option>
      </select>
    </label>
    <label>Duration Value<input v-model.number="form.durationValue" type="number" min="1" /></label>
    <label>Max Branches<input v-model.number="form.maxBranches" type="number" min="0" /></label>
    <label>Max Users<input v-model.number="form.maxUsers" type="number" min="0" /></label>
    <label>Max Invoices/Month<input v-model.number="form.maxInvoicesPerMonth" type="number" min="0" /></label>
    <label class="check-row"><input v-model="form.isActive" type="checkbox" /> Active</label>
    <div class="form-actions full">
      <router-link to="/plans">Cancel</router-link>
      <button class="primary">{{ isEdit ? "Save Plan" : "Create Plan" }}</button>
    </div>
  </form>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createPlanApi, getPlanApi, updatePlanApi } from "@/api/superAdminApi";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => Boolean(route.params.id));
const form = reactive({
  name: "",
  code: "",
  currency: "INR",
  price: 0,
  durationType: "months",
  durationValue: 1,
  maxBranches: 1,
  maxUsers: 3,
  maxInvoicesPerMonth: 100,
  isActive: true,
});

onMounted(async () => {
  if (!isEdit.value) return;
  Object.assign(form, await getPlanApi(route.params.id));
});

const save = async () => {
  if (isEdit.value) await updatePlanApi(route.params.id, { ...form });
  else await createPlanApi({ ...form });
  router.replace("/plans");
};
</script>
