import { createClient } from '@supabase/supabase-js'
import env from '../env';

const SUPABASE_URL = env.REACT_NATIVE_SUPABASE_URL 
const SUPABASE_ANON_KEY =  env.REACT_NATIVE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY )
