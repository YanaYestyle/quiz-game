<template>
    <div v-if="errorMessage" class="modal-overlay">
        <div class="modal-content">
            <p>{{ errorMessage }}</p>
            <Button @click="closeModal">OK</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { errorStore } from '@/stores/error';
import Button from './Button.vue';
import { useRouter } from 'vue-router';

const store = errorStore();
const errorMessage = computed(() => store.errorMessage);
const router = useRouter();

const closeModal = () => {
    store.setErrorMessage('');
    router.push({ name: 'home' });
};
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: $white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

    p {
        text-align: center;
        color: $secondary;
        font-size: $font-size-large;
        padding: 30px;
    }
}
</style>