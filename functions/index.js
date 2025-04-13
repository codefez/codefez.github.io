const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize with explicit region configuration
admin.initializeApp({
  databaseURL: "https://codefez-github-site-default-rtdb.europe-west1.firebasedatabase.app"
});

// Set the region here instead of chaining
const regionFunctions = functions.region('europe-west1');

exports.handleCounter = regionFunctions.https.onCall(async (data, context) => {
  try {
    if (!data?.path || !data?.action) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing parameters');
    }

    // Smart path routing
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
    else {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid action');
    }
  } catch (error) {
    console.error('Function error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});