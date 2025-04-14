const functions = require('firebase-functions').region('europe-west1'); // Set region here
const admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: "https://codefez-github-site-default-rtdb.europe-west1.firebasedatabase.app"
});

exports.handleCounter = functions.https.onCall(async (data, context) => {
  try {
    // Set CORS headers
    if (context.rawRequest.method === 'OPTIONS') {
      return {
        headers: {
          'Access-Control-Allow-Origin': 'https://codefez.github.io',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        statusCode: 204
      };
    }

    if (!data?.path || !data?.action) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing parameters');
    }

    const ref = admin.database().ref(
      data.path.startsWith('page_loads/') 
        ? data.path 
        : `downloads/${data.path}`
    );

    if (data.action === "increment") {
      const result = await ref.transaction(current => (current || 0) + 1);
      return { 
        data: result.snapshot.val(), // This should be just the number
        headers: { 'Access-Control-Allow-Origin': 'https://codefez.github.io' }
      };
    } 
    else if (data.action === "get") {
      const snapshot = await ref.once("value");
      return { 
        data: snapshot.val() || 0, // This should be just the number
        headers: { 'Access-Control-Allow-Origin': 'https://codefez.github.io' }
      };
    }
    throw new functions.https.HttpsError('invalid-argument', 'Invalid action');
  } catch (error) {
    console.error('Function error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

document.addEventListener('click', function(e) {
  const button = e.target.closest('[data-counter]');
  if (button) {
    e.preventDefault();
    const path = button.getAttribute('data-counter');
    const elementId = button.getAttribute('data-element');
    const href = button.getAttribute('href');
    
    // Update counter
    incrementCounter(path, elementId);
    
    // Open PDF after a small delay
    setTimeout(() => {
      if (href) window.open(href, '_blank');
    }, 100);
  }
});