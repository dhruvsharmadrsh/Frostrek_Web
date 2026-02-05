
const fs = require('fs');
// Start of Selection
const { Blob } = require('buffer');

const sessionId = "session_" + Date.now() + "_filetest";
const chatInput = "analyzing file";

async function run() {
  try {
    const formData = new FormData();
    formData.append('chatInput', chatInput);
    formData.append('sessionId', sessionId);
    
    // Read file and append
    const fileContent = fs.readFileSync('test.txt');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    formData.append('audio', blob, 'test.txt'); // Naming it 'audio' as user was working on Audio
    // Also try generic 'file' field? 
    // Usually 'files' or 'data'. But 'audio' was mentioned in context.

    console.log('Sending FormData with File...');
    
    // n8n webhook URL
    const url = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const text = await response.text();
    console.log('RESPONSE STATUS:', response.status);
    console.log('RESPONSE:', text);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

run();
