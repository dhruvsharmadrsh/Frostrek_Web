const https = require('https');

const data = JSON.stringify({
    chatInput: 'hello'
});

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
    console.log(`statusCode: ${res.statusCode}`);
    console.log('headers:', res.headers);

    let body = '';
    res.on('data', (d) => {
        body += d;
    });

    res.on('end', () => {
        console.log('Body:', body);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
