<template>
    <div class="progress-bar-wrapper">
        Question {{ current }} of {{ total }}
        <div class="progress">
            <div class="progress-filled" :style="{ width: progressPercentage + '%' }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    current: number;
    total: number;
}>();

const progressPercentage = computed(() => {
    return (props.current / props.total) * 100;
});
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.progress-bar-wrapper {
    margin: 1rem 0;
    font-size: $font-size-large;
    color: $black;
    text-transform: uppercase;
    text-align: center;
}

.progress {
    height: 1rem;
    background-color: $gray;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 0.5rem;
}

.progress-filled {
    height: 100%;
    background-color: $secondary;
    transition: width 0.3s ease;
}
</style>