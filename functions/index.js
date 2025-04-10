const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.handleCounter = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    // Validate request
    if (!data.path || !data.action) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'Missing parameters'
      );
    }

    const ref = admin.database().ref(`downloads/${data.path}`);
    
    if (data.action === "increment") {
      const result = await ref.transaction(current => (current || 0) + 1);
      return result.snapshot.val(); // Return just the number
    } else if (data.action === "get") {
      const snapshot = await ref.once("value");
      return snapshot.val() || 0; // Return just the number
    } else {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid action'
      );
    }
  });