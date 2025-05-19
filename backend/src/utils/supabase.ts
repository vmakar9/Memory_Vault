import { createClient } from "@supabase/supabase-js";

import { configs } from "../config/config";

export const supabase = createClient(
  configs.SUPABASE_URL as string,
  configs.SUPABASE_API_KEY as string,
);
