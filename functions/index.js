const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp({
  databaseURL: "https://codefez-github-site-default-rtdb.europe-west1.firebasedatabase.app"
});

exports.handleCounter = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      cors(req, res, () => {
        res.status(204).send('');
      });
      return;
    }

    // Handle regular requests
    cors(req, res, async () => {
      try {
        if (!req.body?.path || !req.body?.action) {
          throw new functions.https.HttpsError('invalid-argument', 'Missing parameters');
        }

        const ref = admin.database().ref(
          req.body.path.startsWith('page_loads/') 
            ? req.body.path 
            : `downloads/${req.body.path}`
        );

        let result;
        if (req.body.action === "increment") {
          const transactionResult = await ref.transaction(current => (current || 0) + 1);
          result = transactionResult.snapshot.val();
        } 
        else if (req.body.action === "get") {
          const snapshot = await ref.once("value");
          result = snapshot.val() || 0;
        } else {
          throw new functions.https.HttpsError('invalid-argument', 'Invalid action');
        }

        res.status(200).json({ 
          success: true,
          data: result
        });
      } catch (error) {
        console.error('Function error:', error);
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });
  });