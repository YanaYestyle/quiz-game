import { setActivePinia, createPinia } from 'pinia'
import { errorStore } from './error'

describe('errorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with an empty errorMessage', () => {
    const store = errorStore()
    expect(store.errorMessage).toBe('')
  })

  it('should update errorMessage with setErrorMessage', () => {
    const store = errorStore()
    const testMessage = 'An error occurred'

    store.setErrorMessage(testMessage)
    expect(store.errorMessage).toBe(testMessage)
  })
})
