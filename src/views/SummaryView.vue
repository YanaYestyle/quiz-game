<template>
    <div class="summary-wrapper">
        <h2>Quiz Summary</h2>
        <div class="charts-wrapper" v-if="quizFinished">
            <h3>Current score</h3>
            <DoughnutChart :questions="store.questions" :answers="store.answers" />
            <h3>History score</h3>
            <LineChart :quizHistory="store.quizHistory" />
        </div>
        <Button @click="goToHome">Restart Quiz</Button>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import LineChart from '@/components/LineChart.vue';
import { quizStore } from '@/stores/quiz';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = quizStore();
const quizFinished = computed(() => store.quizFinished);

const goToHome = () => {
    store.resetQuiz();
    router.push({ name: 'home' });
};
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.summary-wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100vh;
    color: $black;
    text-transform: uppercase;
    align-items: center;
    gap: 30px;
}

.charts-wrapper {
    display: flex;
    width: 100%;
    gap: 10px;
    height: 70%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;

    h3 {
        padding-top: 20px;
    }
}
</style>