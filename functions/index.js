const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Universal counter handler
exports.handleCounter = functions.https.onCall(async (data, context) => {
  // Validate request
  if (!data.path || !data.action) {
    throw new functions.https.HttpsError(
      "invalid-argument", 
      "Missing parameters"
    );
  }

  const ref = admin.database().ref(`downloads/${data.path}`);
  
  if (data.action === "increment") {
    return ref.transaction((current) => (current || 0) + 1);
  } else if (data.action === "get") {
    const snapshot = await ref.once("value");
    return snapshot.val() || 0;
  }
  
  throw new functions.https.HttpsError("invalid-argument", "Invalid action");
});