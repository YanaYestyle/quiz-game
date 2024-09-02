<template>
    <button :class="['button', { 'button--disabled': isDisabled }]" :disabled="isDisabled" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    isDisabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{
    (e: 'click'): void;
}>();

const handleClick = () => {
    if (!props.isDisabled) {
        emit('click');
    }
};
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.button {
    padding: 10px 20px;
    background-color: $primary;
    border: none;
    color: $white;
    cursor: pointer;
    border-radius: 5px;
    font-size: $font-size-regular;
    transition: background-color 0.3s ease;

    &:hover:not(.button--disabled) {
        background-color: $pink;
    }

    &--disabled {
        background-color: $gray;
    }
}
</style>