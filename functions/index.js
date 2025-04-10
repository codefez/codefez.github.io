const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.handleCounter = functions.https.onCall(async (data, context) => {
  try {
    if (!data || !data.path || !data.action) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required parameters'
      );
    }

    const ref = admin.database().ref(`downloads/${data.path}`);
    
    if (data.action === "increment") {
      const result = await ref.transaction(current => (current || 0) + 1);
      return result.snapshot.val();
    } 
    else if (data.action === "get") {
      const snapshot = await ref.once("value");
      return snapshot.val() || 0;
    } 
    else {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid action, must be increment or get'
      );
    }
  } catch (error) {
    console.error('Function error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});