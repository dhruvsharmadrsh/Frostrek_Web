const https = require('https');

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const sessionId = "session_1737482400000_abc123xyz";
const chatInput = "who is the founder";

let body = '';
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="chatInput"\r\n\r\n`;
body += `${chatInput}\r\n`;

body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="sessionId"\r\n\r\n`;
body += `${sessionId}\r\n`;

body += `--${boundary}--\r\n`;

const options = {
    hostname: 'n8n.frostrek.com',
    port: 443,
    path: '/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body)
    }
};

console.log('Sending Multipart Payload (Native)...');
console.log(body);

const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', chunk => responseBody += chunk);
    res.on('end', () => {
        console.log('RESPONSE:', responseBody);
    });
});

req.on('error', (e) => console.log('ERROR:', e));
req.write(body);
req.end();
