<template>
  <div class="home-wrapper">
    <h1>Welcome to the Quiz</h1>
    <Button @click="goToQuiz">Start Quiz</Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import { quizStore } from '@/stores/quiz';

const router = useRouter();
const store = quizStore();

const goToQuiz = () => {
  if (store.questions && store.questions.length > 0) store.resetQuiz();
  router.push({ name: 'quiz' });
};
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.home-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: $black;

  h1 {
    font-family: $font-family-secondary;
    font-size: $font-size-extra-large;
    text-transform: uppercase;
    color: transparent;
    background-image: url('@/assets/images/background.jpg');
    background-repeat: repeat;
    background-clip: text;
    animation: animate 15s ease-in-out infinite;
    text-align: center;
    margin: 50px 20px;

    @media (max-width: 480px) {
      font-size: 70px;
    }

    @media (max-width: 320px) {
      font-size: 50px;
    }
  }

  @keyframes animate {

    0%,
    100% {
      background-position: left top;
    }

    25% {
      background-position: right bottom;
    }

    50% {
      background-position: left bottom;
    }

    75% {
      background-position: right top;
    }
  }
}
</style>
