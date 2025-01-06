const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Function to add a message to the chat box
function addMessage(content, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Function to send a message
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Display user message
  addMessage(userMessage, 'user');
  userInput.value = '';

  // Simulated chatbot response (replace this with your API call)
  try {
    // Simulate API request and response
    const response = await fetch('https://api.example.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_API_KEY',
      },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await response.json();
    if (response.ok && data.reply) {
      addMessage(data.reply, 'bot');
    } else {
      addMessage('Sorry, I could not understand that.', 'bot');
    }
  } catch (error) {
    addMessage('Error: Unable to connect.', 'bot');
  }
}