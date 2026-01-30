const https = require('https');

const scenarios = [
    { name: 'Strict User Spec', payload: { chatInput: "who is the founder", sessionId: "session_1737482400000_abc123xyz" } },
    { name: 'Generated SessionID', payload: { chatInput: "who is the founder", sessionId: `session_${Date.now()}_test` } },
    { name: 'Input Field', payload: { input: "who is the founder", sessionId: "session_1737482400000_abc123xyz" } },
    { name: 'Message Field', payload: { message: "who is the founder", sessionId: "session_1737482400000_abc123xyz" } },
    { name: 'No SessionID', payload: { chatInput: "who is the founder" } },
    { name: 'Action Property', payload: { action: "sendMessage", chatInput: "who is the founder", sessionId: "session_1737482400000_abc123xyz" } },
    { name: 'Question Field', payload: { question: "who is the founder", sessionId: "session_1737482400000_abc123xyz" } },
    { name: 'Text Field', payload: { text: "who is the founder", sessionId: "session_1737482400000_abc123xyz" } }
];

function testScenario(scenario) {
    return new Promise((resolve) => {
        const data = JSON.stringify(scenario.payload);
        const options = {
            hostname: 'n8n.frostrek.com',
            port: 443,
            path: '/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let output = body;
                try {
                    const json = JSON.parse(body);
                    output = json.output || json.text || json.message || body;
                } catch (e) { }

                // Check if response is a generic welcome message
                const isGeneric = typeof output === 'string' && (output.includes("Hi! How can I assist") || output.includes("Hello! How can I assist"));

                resolve({
                    name: scenario.name,
                    payload: JSON.stringify(scenario.payload),
                    response: output,
                    status: isGeneric ? "FAIL (Welcome Msg)" : "SUCCESS (Different Response)"
                });
            });
        });

        req.on('error', (e) => resolve({ name: scenario.name, status: "ERROR", response: e.message }));
        req.write(data);
        req.end();
    });
}

(async () => {
    console.log("Running Diagnostic Suite...");
    console.log("----------------------------------------");
    for (const scenario of scenarios) {
        const result = await testScenario(scenario);
        console.log(`SCENARIO: ${result.name}`);
        console.log(`PAYLOAD:  ${result.payload}`);
        console.log(`RESPONSE: ${result.response}`);
        console.log(`STATUS:   ${result.status}`);
        console.log("----------------------------------------");
    }
})();
