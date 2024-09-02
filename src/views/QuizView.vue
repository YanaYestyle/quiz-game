<template>
  <div class="quiz-view-wrapper" v-if="!loader.loading && store.questions && store.questions.length > 0">
    <ProgressBar :current="store.currentQuestionIndex + 1" :total="store.questions.length" />
    <div class="quiz-view-content">
      <div class="content-wrapper">
        <QuestionCard v-if="!store.quizFinished" :question="store.questions[store.currentQuestionIndex]?.question"
          :correct-answer="store.questions[store.currentQuestionIndex]?.correctAnswer"
          :incorrect-answers="store.questions[store.currentQuestionIndex]?.incorrectAnswers" @answer="handleAnswer" />
        <div class="navigation-wrapper">
          <Button v-if="!store.quizFinished" :is-disabled="isPreviousButtonDisabled"
            @click="prevQuestion">Previous</button>
          <Button v-if="!store.quizFinished" :is-disabled="!selectedAnswer" @click="nextQuestion">Next</button>
          <Button v-if="store.quizFinished" @click="goToSummary">See Summary</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { Question } from '@/types/question'
import { quizStore } from '@/stores/quiz';
import ProgressBar from '@/components/ProgressBar.vue';
import QuestionCard from '@/components/QuestionCard.vue';
import { useRouter } from 'vue-router';
import type { ResultsDto } from '@/types/api/results';
import axios from '@/utils/axios';
import { loaderStore } from '@/stores/loader';
import Button from '@/components/Button.vue';

const store = quizStore();
const loader = loaderStore();
const router = useRouter();
const selectedAnswer = ref<string | null>(null);
const isPreviousButtonDisabled = computed(() => store.currentQuestionIndex === 0);

onMounted(async () => {
  const response = await axios.get('/api.php?amount=10');
  const mapResultsDtoToQuestion = (dto: ResultsDto): Question => {
    return {
      question: dto.question,
      correctAnswer: dto.correct_answer,
      incorrectAnswers: dto.incorrect_answers,
    };
  }

  const questionsMaped = response.data.results.map((results: ResultsDto) => mapResultsDtoToQuestion(results));
  store.setQuestions(questionsMaped);
});

const handleAnswer = (answer: string) => {
  selectedAnswer.value = answer;
};

const nextQuestion = () => {
  if (selectedAnswer.value) {
    store.answerQuestion(selectedAnswer.value);
    store.nextQuestion();
    selectedAnswer.value = null;
  }
};

const prevQuestion = () => {
  if (store.currentQuestionIndex > 0) {
    store.previousQuestion();
  }
};

const goToSummary = () => {
  store.saveQuizResult();
  router.push({ name: 'summary' });
};

onUnmounted(() => {
  if (store.quizFinished) {
    store.saveQuizResult();
  }
});
</script>

<style scoped lang="scss">
.quiz-view-wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100vh;
  gap: 50px;
}

.quiz-view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-wrapper {
  width: 60%;
}

.navigation-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 50px;
}
</style>
