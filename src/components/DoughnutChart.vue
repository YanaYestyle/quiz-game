<template>
    <div class="canvas-wrapper">
        <canvas id="doughnut-chart"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
    questions: { correctAnswer: string }[];
    answers: string[];
}>();

const correctAnswers = props.answers.filter(
    (answer, index) => answer === props.questions[index].correctAnswer
).length;

onMounted(() => {
    const ctx = document.getElementById('doughnut-chart') as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [
                {
                    data: [correctAnswers, props.questions.length - correctAnswers],
                    backgroundColor: ['#b2ab2e', '#ed413e'],
                },
            ],
        },
    });
});
</script>

<style lang="scss" scoped>
.canvas-wrapper {
    display: flex;
    height: 40%;
    width: 40%;
    flex-direction: column;
    align-items: center;

}
</style>