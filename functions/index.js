const functions = require("firebase-functions");
const admin = require('firebase-admin');


admin.initializeApp({
  databaseURL: "https://codefez-github-site-default-rtdb.europe-west1.firebasedatabase.app"
});

exports.handleCounter = functions
  .region('europe-west1')  // <-- Region applied here
  .https.onCall(async (data, context) => {
    // ... rest of your existing code ...
  });

exports.handleCounter = functions.https.onCall(async (data, context) => {
  try {
    // CORS headers for preflight requests
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

    let result;
    if (data.action === "increment") {
      const transactionResult = await ref.transaction(current => (current || 0) + 1);
      result = transactionResult.snapshot.val();
    } 
    else if (data.action === "get") {
      const snapshot = await ref.once("value");
      result = snapshot.val() || 0;
    } else {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid action');
    }

    // Always return the same structure
    return { 
      data: result,
      headers: {
        'Access-Control-Allow-Origin': 'https://codefez.github.io'
      }
    };
  } catch (error) {
    console.error('Function error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

