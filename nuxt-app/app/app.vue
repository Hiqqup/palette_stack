
<script setup lang="ts">

let starting_form = 0;
async function fetchPalettes (fetch_type){
  console.log('making query' + starting_form);
  let data= (await fetch_type('/api/getPalettes'
      , { query: { from:starting_form } }
  ));
  if (fetch_type == useFetch){
    data = data.data.value;
  }
  let ret =  JSON.parse(data.response)
  starting_form += ret.length
  return ret
}

let palettes= ref(await fetchPalettes(useFetch));
let timed_out = false;
const scroll =async () => {
  let bottomOfWindow = Math.max(window.pageYOffset) + window.innerHeight >= document.documentElement.offsetHeight - 200
    if (bottomOfWindow && !timed_out) {
      timed_out = true;
      setTimeout(()=>{timed_out = false}, 500)
        palettes.value = palettes.value.concat( await fetchPalettes($fetch));
    }
};
onMounted(() => {
  window.onscroll = scroll
})
</script>
<template>
  <div class="flex justify-center flex-wrap" >
  <PaletteCard v-for="(palette, index) in palettes" class="m-4" :palette="palette" :key="index"></PaletteCard>
    </div>
</template>
<style scoped>
  @reference "tailwindcss"
</style>