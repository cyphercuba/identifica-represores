import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dtapnvutisgudrtlylvj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YXBudnV0aXNndWRydGx5bHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NjUzOTUsImV4cCI6MjA2NDI0MTM5NX0.A7Y5zRVnDK1TWoEqwLg2B5D0RwzcIf4jS8QFzMC3Odg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
