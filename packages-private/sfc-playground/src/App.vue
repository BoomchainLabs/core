<template>
  <div id="app">
    <Navbar />

    <main class="main-content">
      <router-view />
    </main>

    <WalletModal v-if="showWalletModal" @close="showWalletModal = false" />
  </div>
</template>

<script setup lang="ts">
// Corporate-grade TypeScript setup for robustness
import { ref } from 'vue';
import { useWallet } from '@/composables/useWallet'; // Abstracted wallet hook
import Navbar from '@/components/Navbar.vue';
import WalletModal from '@/components/WalletModal.vue';

// Wallet connection modal state
const showWalletModal = ref(false);

// Initialize wallet connection strategies
useWallet();
</script>

<style scoped>
/* Future-proof UI baseline */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Inter', sans-serif;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
