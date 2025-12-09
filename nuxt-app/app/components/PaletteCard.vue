<script setup lang="js">
//import twilight_town from "../../public/twilight-town.json";
//const palette = twilight_town;
const props = defineProps({
  palette: Object,
})
//console.log(props.palette.name)
</script>

<template>
  <div class="bg-zinc-700 inline-block p-4 w-125">
    <div class="flex items-center ">
      <h3 class="font-sans text-white font-extrabold  text-2xl inline mr-3 decoration-dotted hover:underline" >   {{palette.name.toUpperCase()}} </h3>
      <span v-if="palette.new" class="bg-zinc-600 px-2 py-1 rounded-md text-zinc-200 text-[0.5em] font-extrabold"> NEW</span>
      <div class="flex-1"></div>
      <DownloadIcon></DownloadIcon>
    </div>
    <p class="text-zinc-400"> Created by <span class="text-lime-400 decoration-dotted hover:underline">{{palette.author}}</span></p>
    <p class="text-zinc-400 mt-3 mb-6"> {{ palette.description}}</p>
    <div class="flex items-start ">
      <Icon name="ic:baseline-favorite" class="text-zinc-400  text-3xl  hover:text-zinc-200"  />
      <span class="text-zinc-300 font-extrabold mx-2 hover:text-zinc-100"> {{palette.like_count}} likes</span>
      <Icon name="ic:sharp-mark-unread-chat-alt" class="text-zinc-400  text-3xl hover:text-zinc-200"  />
      <span class="text-zinc-300 font-extrabold mx-2 hover:text-zinc-100"> {{palette.comment_count}} comments</span>
    </div>
    <PaletteCardCanvas :colors="palette.colors" :color_amount="palette.color_count"
                       :palette_specs="{hashtag: palette.hashtag, color_count: palette.color_count, download_count: palette.download_count }"></PaletteCardCanvas>
    <img :src="palette.preview_images[0]" style="image-rendering: crisp-edges;" class="mt-2" alt="prewiew image">

    <span class="text-zinc-400 mt-3 mb-6"> Tags: </span>
    <span v-for="(tag, index) in palette.tags" class="text-zinc-100 mt-3 mb-6 decoration-dotted hover:underline">
      {{tag}}<span v-if="index !== palette.tags.length-1" class="  text-zinc-400 inline-block">,&nbsp;</span> </span>



  </div>
</template>
