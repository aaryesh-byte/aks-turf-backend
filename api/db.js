export default async function handler(req, res) {
    // 1. CORS Headers to allow your frontend to talk to this backend
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows any domain to access
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Handle the preflight "OPTIONS" request from the browser
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Ensure it's a POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
    const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
