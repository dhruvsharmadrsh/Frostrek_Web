const https = require('https');

const candidates = [
    'chatInput',
    'input',
    'message',
    'text',
    'query',
    'question',
    'prompt',
    'body'
];

const sessionId = "session_1737482400000_fuzztest";

function sendRequest(fieldName) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({
            [fieldName]: "who is the founder",
            sessionId: sessionId
        });

        const options = {
            hostname: 'n8n.frostrek.com',
            port: 443,
            path: '/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const output = json.output || json.text || json.message || JSON.stringify(json);
                    resolve({ fieldName, output });
                } catch (e) {
                    resolve({ fieldName, output: data });
                }
            });
        });

        req.on('error', (e) => resolve({ fieldName, error: e.message }));
        req.write(payload);
        req.end();
    });
}

(async () => {
    console.log("Starting Fuzz Test...");
    for (const field of candidates) {
        const result = await sendRequest(field);
        const isDefault = result.output && result.output.includes("Hi! How can I assist");
        console.log(`[${field}]: ${isDefault ? "DEFAULT RESPONSE (Failed)" : "NEW RESPONSE: " + result.output}`);
    }
})();
