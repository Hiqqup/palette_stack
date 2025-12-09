
<script setup lang="ts">
const canvas_ref = useTemplateRef("canvas");

const props = defineProps({
  colors: {
    type: Array<String>,
    default: ["ffffff"],
  },
  color_amount :{
    type: Number,
    default: 1
  },
  palette_specs:{
    type: {
      hashtag: String,
      color_count: Number,
      download_count: Number,
    },
    default:{
      hashtag: "",
      color_count: 0,
      download_count: 0
    }
  },
})
function render_colors() {
  const canvas = canvas_ref.value;
  if (canvas === null){
    console.error("Can't get canvas");
    return;
  }
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width + 20
  canvas.height = rect.height
  if (ctx === null) {
    console.error("Can't get context");
    return;
  }
  ctx.imageSmoothingEnabled = false
  let row_count = 1;
  if (props.color_amount > 8 ){
     row_count = 2;
  }
  if (props.color_amount > 32){
    row_count = 3;
  }
  if (props.color_amount > 64){
    row_count = 4;
  }
  let floored_quotient = Math.floor( props.color_amount /row_count);
  let remainder = props.color_amount - floored_quotient * row_count;
  let cell_height = canvas.height / row_count;


  let i = 0;
  for (let y = 0; y < row_count; y++){
    let colors_in_row = floored_quotient;
    if (remainder > 0){
      colors_in_row++;
      remainder--;
    }

    const cell_width = canvas.width / colors_in_row;
    for (let x = 0; x < colors_in_row; x++) {
      const hex = '#' + props.colors[i];
      //console.log(hex)
      ctx.fillStyle = hex
      ctx.fillRect(x*cell_width, y*cell_height, cell_width, cell_height);
      i++;
    }
  }

}
onMounted(() => {

  render_colors();
});
</script>

<template>
  <div>
    <ul class="flex justify-end spec-list ">
      <li>#{{palette_specs.hashtag}}</li>
      <li>{{palette_specs.color_count}} colors</li>
      <li>{{palette_specs.download_count}} downloads</li>
    </ul>
  <canvas ref="canvas" class="w-full h-25 bg-zinc-800 p-2 " ></canvas>
  </div>
</template>
<style scoped>
canvas {
  image-rendering: crisp-edges;
}
@reference "tailwindcss";
.spec-list > li{
  @apply inline-block text-zinc-600 px-1 text-xs bg-zinc-800
}

.spec-list:first-child::before {
  @apply border-x-zinc-800 border-y-transparent;
  content: "";
  border-width: 1em  0.45em 0 0;
  position: relative;
}
</style>
