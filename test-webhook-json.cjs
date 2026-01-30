const https = require('https');

const payload = JSON.stringify({
    chatInput: "who is the founder",
    sessionId: "session_1737482400000_test123"
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

console.log('Sending payload:', payload);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('RESPONSE BODY:', data);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(payload);
req.end();
