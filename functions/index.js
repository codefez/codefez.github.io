const functions = require('firebase-functions/v1'); // Note the /v1 import
const admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: "https://codefez-github-site-default-rtdb.europe-west1.firebasedatabase.app"
});

// Deploy to europe-west1 by setting location in function definition
exports.handleCounter = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    try {
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
        return result.snapshot.val();
      } 
      else if (data.action === "get") {
        const snapshot = await ref.once("value");
        return snapshot.val() || 0;
      }
      throw new functions.https.HttpsError('invalid-argument', 'Invalid action');
    } catch (error) {
      console.error('Function error:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });