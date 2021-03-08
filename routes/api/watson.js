// Import dependencies
const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

// Create instance of Assistant
// Authenticate
const authenticator = new IamAuthenticator({
  apikey: process.env.WATSON_ASSISTANT_APIKEY,
});
// Connect to Assistant
const assistant = new AssistantV2({
  version: "2020-04-01",
  authenticator: authenticator,
  url: process.env.WATSON_ASSISTANT_URL,
});

// Route to handle session tokens
// GET /api/watson/session
router.get("/session", async (req, res) => {
  // if success
  try {
    const session = await assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID,
    });
    res.json(session["result"]);

    // if fail
  } catch (err) {
    res.send("Error processing your request");
    console.log(err);
  }
});

// Handle messages
// POST /api/watson/message
router.post("/message", async (req, res) => {
  // Construct payload
  payload = {
    assistantId: process.env.WATSON_ASSISTANT_ID,
    sessionId: req.headers.session_id,
    input: {
      message_type: "text",
      text: req.body.input,
    },
  };
  // if successful
  try {
    const message = await assistant.message(payload);
    res.json(message("result"));

    // if fail
  } catch (err) {
    res.send("Error processing request");
    console.log(err);
  }
});

// Export routes
module.exports = router;
