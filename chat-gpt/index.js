const readline = require('readline');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main(userInput) {
  const conversationHistory = [];

  // Add user message to conversation history
  conversationHistory.push({ role: 'user', content: userInput });

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversationHistory,
  });

  // Extract assistant's reply
  const assistantReply = completion.data.choices[0].message.content;

  console.log('ChatGPT:', assistantReply);

  // Add assistant message to conversation history
  conversationHistory.push({ role: 'assistant', content: assistantReply });
}

const read = () => {
  rl.question('You: ', (userInput) => {
    if (userInput.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
    } else {
      main(userInput).then(() => {
        // Continue reading input
        read();
      });
    }
  });
};

// Start the conversation loop
read();

