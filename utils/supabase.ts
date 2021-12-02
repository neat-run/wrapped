import { createClient } from "@supabase/supabase-js";
import { Constants } from "./constants";

/**
 * Supabase client to access auth
 */
export const supabase = createClient(
  Constants.SUPABASE.URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

// Sign in with GitHub
export async function signIn() {
  await supabase.auth.signIn(
    { provider: "github" },
    { scopes: "repo:status user" }
  );
  supabase.auth.onAuthStateChange((event, session) => {
    // TODO: use this event to refresh the provider_token
    console.log(event, session);
  });
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut();
}

/**
 * Get the signed-in user
 */
export async function getUser() {
  return await supabase.auth.user();
}

/**
 * Add a row to a Supabase table
 * @param table name of the database table in which to insert a row
 * @param payload data to be inserted into the table, matching its columns
 * @returns error or inserted data
 */
export async function addRow(table: string, payload: object) {
  let { error, data } = await supabase
    .from(table)
    .upsert(payload, { onConflict: "username" });
  if (error) throw error;
  else return data;
}

/**
 * Get details of a database row by a search query
 * @param table name of the database table eg. "users"
 * @param column name of the column to search eg. "username"
 * @param value value to search by eg. "natfriedman"
 * @returns object with columns as fields eg. `data.commits`
 */
export async function getRow(table: string, column: string, value: string) {
  let { data, error } = await supabase.from(table).select().eq(column, value);
  if (error) throw error;
  else return data;
}
