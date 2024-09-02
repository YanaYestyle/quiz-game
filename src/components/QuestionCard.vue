<template>
    <div class="question-card-wrapper">
        <h2>{{ htmlStringParser(question) }}</h2>
        <ul>
            <li v-for="(answer, index) in allAnswers" :key="index">
                <input type="radio" :id="answer" :value="answer" v-model="selectedAnswer" @change="emitAnswer" />
                <label :for="answer">{{ htmlStringParser(answer) }}</label>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { htmlStringParser } from '@/utils/html-string-parser';

const props = defineProps<{
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}>();

const emit = defineEmits<{
    (e: 'answer', answer: string): void;
}>();

const selectedAnswer = ref<string | null>(null);

const allAnswers = computed(() => {
    if (!props.question) return [];
    return [...props.incorrectAnswers, props.correctAnswer].sort();
});

const emitAnswer = () => {
    if (selectedAnswer.value) {
        emit('answer', selectedAnswer.value);
    }
};

watch(
    () => props.question,
    (newQuestion) => {
        if (newQuestion) {
            selectedAnswer.value = null;
        }
    },
    { immediate: true }
);
</script>


<style scoped lang="scss">
@import '../assets/variables.scss';

.question-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background: $white;
    border-radius: 8px;
    border-radius: 8px;
    border: 4px solid;
    border-color: $primary;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 20px 0;
}

input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

label {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-left: 30px;
    font-size: $font-size-regular;
    color: $black;
}

label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid;
    border-color: $gray;
    background: $white;
    transition: background-color 0.3s, border-color 0.3s;
}

input[type="radio"]:checked+label::before {
    background-color: $primary;
    border-color: $primary;
}

input[type="radio"]:checked+label {
    color: $primary;
}
</style>