function calculateRisk(data) {
    let score = 0;
    let reasons = [];

    if (data.fraud_score >= 75) {
        score += 40;
        reasons.push("High fraud score");
    } else if (data.fraud_score >= 40) {
        score += 20;
        reasons.push("Moderate fraud score");
    }

    if (data.disposable) {
        score += 25;
        reasons.push("Disposable email detected");
    }

    if (data.recent_abuse) {
        score += 20;
        reasons.push("Recent abuse activity detected");
    }

    if (!data.deliverability) {
        score += 10;
        reasons.push("Poor deliverability");
    }

    if (data.suspect) {
        score += 15;
        reasons.push("Suspicious domain reputation");
    }

    score = Math.min(score, 100);

    let level =
        score >= 70 ? "High" :
        score >= 40 ? "Medium" :
        "Low";

    return { score, level, reasons };
    }

    export default async function handler(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const API_KEY = process.env.IPQS_API_KEY;

        if (!API_KEY) {
            return res.status(500).json({ error: "API key not configured" });
        }

        const url = `https://ipqualityscore.com/api/json/email/${API_KEY}/${encodeURIComponent(email)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: "IPQS API error" });
        }

        const risk = calculateRisk(data);

        res.status(200).json({
        email: data.email,
        riskLevel: risk.level,
        riskScore: risk.score,
        reasons: risk.reasons,
        checkedAt: new Date().toISOString(),
        source: "IPQualityScore",
        raw: {
            fraud_score: data.fraud_score,
            disposable: data.disposable,
            recent_abuse: data.recent_abuse,
            deliverability: data.deliverability
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
