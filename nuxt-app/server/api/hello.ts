import { createClient } from '@supabase/supabase-js'
export default defineEventHandler(() => {
    const config = useRuntimeConfig()
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
    return { message: 'Hello from server API!' + config.public.supabaseUrl }
})
