<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>

<template>
  foo bar

  <h1>{{ data.message }}</h1>
</template>
