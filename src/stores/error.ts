import { defineStore } from 'pinia'

export const errorStore = defineStore('error', {
  state: () => ({
    errorMessage: ''
  }),
  actions: {
    setErrorMessage(message: string) {
      this.errorMessage = message
    }
  }
})
