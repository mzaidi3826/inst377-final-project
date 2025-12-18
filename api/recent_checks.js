// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    try {
        const { data, error } = await supabase
        .from("email_checks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

        if (error) {
        console.error("Supabase select error:", error);
        return res.status(500).json({ error: "Failed to fetch recent checks" });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}
