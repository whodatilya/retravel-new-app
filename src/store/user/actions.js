import api from "@/api";

export async function register ({ dispatch, commit }, formData) {
  await api.user.register(formData)
}
export async function login ({ dispatch, commit }, formData) {
  const response = await api.user.login(formData)
  if (response.token) {
    localStorage.setItem('token', response.token)
  }
}
export async function logout ({ dispatch, commit }) {
  localStorage.removeItem('token')
  location.reload()
}
