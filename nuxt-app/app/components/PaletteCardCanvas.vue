
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
})
function render_colors() {
  const canvas = canvas_ref.value;
  if (canvas === null){
    return;
  }
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  if (ctx === null) {
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
      ctx.fillStyle = '#' + props.colors[i] ;
      ctx.fillRect(x*cell_width, y*cell_height, cell_width, cell_height);
      i++;
    }
  }

  console.log(props.colors);
}
onMounted(() => {
  render_colors();
});
</script>

<template>
  <canvas ref="canvas" class="w-full h-25 bg-zinc-800 p-2" ></canvas>
</template>
<style scoped>
canvas {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
