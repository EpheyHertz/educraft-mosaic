// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nvlldlyvgqazltbyugyk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bGxkbHl2Z3Fhemx0Ynl1Z3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxODY3NDksImV4cCI6MjA1OTc2Mjc0OX0.yiERV_GrLOK3WVxaw0NCPL4_O8m8jyWzG9ReO9POa-0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);