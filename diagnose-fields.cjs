const https = require('https');

const scenarios = [
    { field: 'chatInput', value: 'who is the founder' },
    { field: 'chatInput', value: 'xzxzxz' },
    { field: 'input', value: 'who is the founder' },
    { field: 'input', value: 'xzxzxz' },
    { field: 'message', value: 'who is the founder' },
    { field: 'message', value: 'xzxzxz' },
    { field: 'text', value: 'who is the founder' },
];

function testScenario(scenario) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({
            [scenario.field]: scenario.value,
            sessionId: "session_1737482400000_abc123xyz"
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
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let output = body;
                try {
                    const json = JSON.parse(body);
                    output = json.output || json.text || json.message || JSON.stringify(json);
                } catch (e) { }

                // Truncate output to avoid huge logs
                if (output.length > 50) output = output.substring(0, 50) + "...";
                resolve({
                    field: scenario.field,
                    value: scenario.value,
                    response: output
                });
            });
        });

        req.on('error', (e) => resolve({ field: scenario.field, response: "ERROR: " + e.message }));
        req.write(payload);
        req.end();
    });
}

(async () => {
    console.log("Testing Input Variations...");
    for (const scenario of scenarios) {
        const result = await testScenario(scenario);
        console.log(`[${result.field}] "${result.value}" -> "${result.response}"`);
    }
})();
