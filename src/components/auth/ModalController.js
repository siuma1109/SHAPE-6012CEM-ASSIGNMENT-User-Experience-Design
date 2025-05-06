import { ref } from 'vue'

// Shared state for modal visibility
export const isLoginModalOpen = ref(false)

// Modal controller functions
export const ModalController = {
  open() {
    isLoginModalOpen.value = true
  },

  close() {
    isLoginModalOpen.value = false
  }
}