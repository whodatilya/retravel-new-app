import api from "@/api";

export async function register ({ dispatch, commit }, { login, password }) {
  await api.user.register(login, password)
}
export async function login ({ dispatch, commit }, { login, password }) {
  const response = await api.user.login(login, password)
  if (response.data.token) {
    // Не работает state адекватно
    localStorage.setItem('token', response.data.token)
    commit('SAVE_TOKEN', { token: response.data.token })
  }
}
export async function logout ({ dispatch, commit }) {
  localStorage.removeItem('token')
  location.reload()
}
