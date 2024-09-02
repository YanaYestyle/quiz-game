import { setActivePinia, createPinia } from 'pinia'
import { loaderStore } from './loader'

describe('loaderStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with loading set to false', () => {
    const store = loaderStore()
    expect(store.loading).toBe(false)
  })

  it('should update loading state with setLoading', () => {
    const store = loaderStore()

    store.setLoading(true)
    expect(store.loading).toBe(true)

    store.setLoading(false)
    expect(store.loading).toBe(false)
  })
})
