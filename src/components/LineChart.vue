<template>
    <div class="chart-wrapper">
        <canvas id="line-chart"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
    quizHistory: { correct: number; incorrect: number; }[];
}>();

const createChart = (canvasId: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: props.quizHistory.map((_, index) => `Quiz ${index + 1}`),
                    datasets: [
                        {
                            label: 'Correct answers',
                            data: props.quizHistory.map(result => result.correct),
                            borderColor: '#b2ab2e',
                            backgroundColor: 'rgba(118, 199, 192, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Incorrect answers',
                            data: props.quizHistory.map(result => result.incorrect),
                            borderColor: '#ed413e',
                            backgroundColor: 'rgba(243, 129, 129, 0.2)',
                            fill: true,
                        },
                    ],
                },
            });
        } else {
            console.error('Failed to get context from canvas');
        }
    } else {
        console.error('Canvas element is null');
    }
};

const initializeChart = () => {
    createChart('line-chart');
};

onMounted(() => {
    initializeChart();
});
</script>

<style scoped lang="scss">
.chart-wrapper {
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>