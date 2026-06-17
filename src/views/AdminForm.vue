<template>
  <form class="panel form-grid" @submit.prevent="save">
    <label>Name<input v-model="form.name" required /></label>
    <label>Email<input v-model="form.email" type="email" required /></label>
    <label>Password<input v-model="form.password" :required="!isEdit" type="password" /></label>
    <label>Company Name<input v-model="form.companyName" required /></label>
    <label>Company Code<input v-model="form.companyCode" /></label>
    <label>Contact Number<input v-model="form.contactNumber" /></label>
    <p v-if="message" class="error full">{{ message }}</p>
    <div class="form-actions full">
      <router-link to="/admins">Cancel</router-link>
      <button class="primary">{{ isEdit ? "Save Changes" : "Create Admin" }}</button>
    </div>
  </form>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createAdminApi, getAdminApi, updateAdminApi } from "@/api/superAdminApi";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => Boolean(route.params.id));
const message = ref("");
const form = reactive({
  name: "",
  email: "",
  password: "",
  companyName: "",
  companyCode: "",
  contactNumber: "",
});

onMounted(async () => {
  if (!isEdit.value) return;
  const admin = await getAdminApi(route.params.id);
  Object.assign(form, {
    name: admin.name || "",
    email: admin.email || "",
    password: "",
    companyName: admin.companyId?.name || "",
    companyCode: admin.companyId?.companyCode || "",
    contactNumber: admin.contactNumber || admin.companyId?.contactNumber || "",
  });
});

const save = async () => {
  try {
    const payload = { ...form };
    if (isEdit.value && !payload.password) delete payload.password;
    const saved = isEdit.value
      ? await updateAdminApi(route.params.id, payload)
      : await createAdminApi(payload);
    router.replace(`/admins/${saved._id}`);
  } catch (err) {
    message.value = err.response?.data?.message || "Unable to save admin";
  }
};
</script>
