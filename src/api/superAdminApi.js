import http from "./http";

const unwrap = (response) => response.data?.data ?? response.data;

export const loginApi = (payload) => http.post("/super-admin/auth/login", payload);
export const profileApi = () => http.get("/super-admin/auth/profile");
export const dashboardStatsApi = () => http.get("/super-admin/dashboard/stats").then(unwrap);

export const listAdminsApi = (params = {}) => http.get("/super-admin/admins", { params }).then(unwrap);
export const createAdminApi = (payload) => http.post("/super-admin/admins", payload).then(unwrap);
export const getAdminApi = (id) => http.get(`/super-admin/admins/${id}`).then(unwrap);
export const updateAdminApi = (id, payload) => http.put(`/super-admin/admins/${id}`, payload).then(unwrap);
export const updateAdminStatusApi = (id, payload) =>
  http.patch(`/super-admin/admins/${id}/status`, payload).then(unwrap);

export const getAdminSubscriptionApi = (adminId) =>
  http.get(`/super-admin/admins/${adminId}/subscription`).then(unwrap);
export const saveAdminSubscriptionApi = (adminId, payload) =>
  http.put(`/super-admin/admins/${adminId}/subscription`, payload).then(unwrap);
export const renewAdminSubscriptionApi = (adminId, payload) =>
  http.post(`/super-admin/admins/${adminId}/subscription/renew`, payload).then(unwrap);
export const getAdminOverviewApi = (adminId) =>
  http.get(`/super-admin/admins/${adminId}/overview`).then(unwrap);

export const listPlansApi = () => http.get("/super-admin/plans").then(unwrap);
export const getPlanApi = (id) => http.get(`/super-admin/plans/${id}`).then(unwrap);
export const createPlanApi = (payload) => http.post("/super-admin/plans", payload).then(unwrap);
export const updatePlanApi = (id, payload) => http.put(`/super-admin/plans/${id}`, payload).then(unwrap);
export const updatePlanStatusApi = (id, payload) =>
  http.patch(`/super-admin/plans/${id}/status`, payload).then(unwrap);
