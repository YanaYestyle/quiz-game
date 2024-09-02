import { defineStore } from 'pinia'

export const loaderStore = defineStore('loader', {
  state: () => ({
    loading: false
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    }
  }
})
