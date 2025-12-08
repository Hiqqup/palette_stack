<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabasePublishableKey)
const palettes = ref([])

async function getPalettes() {
  const { data } = await supabase.from('palettes').select()
  palettes.value = data
}

onMounted(() => {
  getPalettes()
})
</script>

<template>
  <ul>
    <li v-for="palette in palettes" :key="palette.id">{{ palette.name }}</li>
  </ul>
</template>
