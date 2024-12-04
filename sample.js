const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require("body-parser");

// Initialize the Express app
const app = express();
const port = 3000;

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyA5qGKKu7WRMzyssFjYqcxgbkpjJo7px-s");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to generate the story based on a prompt
async function generateStory(req, res) {
  const prompt = req.body.prompt; // Get the prompt from the request body
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    // Generate content stream using the model
    const result = await model.generateContentStream(prompt);

    // Set response headers for streaming
    res.setHeader("Content-Type", "text/plain");

    // Stream the generated text as it comes in
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText); // Send each chunk of text to the client
    }

    res.end(); // End the response when done
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).send("An error occurred while generating the story.");
  }
}

// Express route to handle story generation
app.post("/generate-story", generateStory);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
