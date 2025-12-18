import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

function calculateRisk(data) {
  let score = 0;
  let reasons = [];

  if (data.fraud_score >= 75) { score += 40; reasons.push("High fraud score"); }
  else if (data.fraud_score >= 40) { score += 20; reasons.push("Moderate fraud score"); }

  if (data.disposable) { score += 25; reasons.push("Disposable email detected"); }
  if (data.recent_abuse) { score += 20; reasons.push("Recent abuse activity detected"); }
  if (!data.deliverability) { score += 10; reasons.push("Poor deliverability"); }
  if (data.suspect) { score += 15; reasons.push("Suspicious domain"); }

  score = Math.min(score, 100);
  let level = score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";

  return { score, level, reasons };
}

export default async function handler(req, res) {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const API_KEY = process.env.IPQS_API_KEY;
    const url = `https://ipqualityscore.com/api/json/email/${API_KEY}/${encodeURIComponent(email)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) return res.status(500).json({ error: data.message || "IPQS API error" });

    const risk = calculateRisk(data);

    const { error: insertError } = await supabase.from("email_checks").insert([{
      email: data.email,
      risk_score: risk.score,
      risk_level: risk.level,
      reasons: risk.reasons,
      created_at: new Date()
    }]);

    if (insertError) console.error("Supabase insert error:", insertError);

    res.status(200).json({
      email: data.email,
      riskLevel: risk.level,
      riskScore: risk.score,
      reasons: risk.reasons
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
