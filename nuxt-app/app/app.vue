<script setup>
import twilight_town from "../public/twilight-town.json";
console.log(twilight_town)
const palette = twilight_town;
</script>
<template>
  <div class="bg-zinc-700 inline-block p-4 w-150">
    <div class="flex items-center gap-3">
      <h3 class="font-sans text-white font-extrabold  text-2xl inline " >   {{palette.name.toUpperCase()}} </h3>
      <span v-if="palette.new" class="bg-zinc-600 px-2 py-1 rounded-md text-zinc-200 text-[0.5em] font-extrabold"> NEW</span>
    </div>
    <p class="text-zinc-400"> Created by <span class="text-lime-400">{{palette.author}}</span></p>
    <p class="text-zinc-400 mt-3 mb-6"> {{ palette.description}}</p>
  </div>
</template>
