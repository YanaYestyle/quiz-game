<template>
    <div v-if="isLoading" class="loader-wrapper">
        <div class="spinner"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { loaderStore } from '@/stores/loader';

const store = loaderStore();
const isLoading = computed(() => store.loading);
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner {
    border: 4px solid transparent;
    border-left-color: $primary;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>