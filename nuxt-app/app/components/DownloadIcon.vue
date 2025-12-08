<script setup lang="ts">

</script>

<template>
  <div class="relative group mr-4 ">
    <span class="group-hover:bg-zinc-600 rounded-full inline-block">
      <Icon name="ic:outline-file-download" class="text-zinc-400  text-3xl group-hover:text-shadow-zinc-200
"  />
    </span>
    <div

        class="absolute bottom-full left-1/2
                       transform -translate-x-1/2 mb-2
                       w-max px-2 py-1 text-sm text-white
                       bg-zinc-400 rounded
                       opacity-0 group-hover:opacity-100 tooltip
">
      Download palette file
    </div>

  </div>
</template>
<style scoped>

.tooltip::after {
content: "";
position: absolute;
top: 100%;
left: 50%;
margin-left: -5px;
border-width: 5px;
border-style: solid;
border-color: #A1A1AA transparent transparent transparent;
}
</style>
