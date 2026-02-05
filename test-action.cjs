const https = require('https');

const payload = JSON.stringify({
    action: "sendMessage",
    chatInput: "who is the founder",
    sessionId: "session_1737482400000_actiontest"
});
// hello 
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

console.log('Sending Action Payload:', payload);

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('RESPONSE:', data);
    });
});

req.on('error', (e) => console.error(e));
req.write(payload);
req.end();
