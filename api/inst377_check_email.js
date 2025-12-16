export default async function handler(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email required" });
    }

    // Temporary fake response
    res.status(200).json({
        email,
        risk: "Low"
    });
}
