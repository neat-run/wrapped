import { createClient } from "@supabase/supabase-js";
import { Constants } from "./constants";

const supabase = createClient(
  Constants.SUPABASE.URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default supabase;
