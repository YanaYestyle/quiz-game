<template>
  <Loader />
  <ErrorNotification />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loader from './components/Loader.vue';
import ErrorNotification from './components/ErrorNotification.vue';
</script>
