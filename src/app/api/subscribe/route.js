import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    console.log("[DEBUG] Received a request...");
    const { email } = await request.json();
    console.log("[DEBUG] Email from body:", email);

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Insert email
    const { data, error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (error) {
      // If Supabase gave an error, throw it so we catch it below
      throw new Error(error.message);
    }

    // **IMPORTANT**: Return a response on success
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API ERROR]", err);
    // **IMPORTANT**: Return a response on error
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
