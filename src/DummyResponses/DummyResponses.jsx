import React from 'react'

const DummyResponses = [
    `### Hello World, how can I help you?

I am a **simple chatbot**. You can ask me anything and I can give you an answer if I have info.

---

#### Features

- **User Interaction**: Engage with users through text input.
- **Speech Recognition**: Convert spoken words into text.
- **Chat History**: Maintain a history of user interactions.

---

#### Usage Instructions

1. **Start a Conversation**:
   - Type your message in the input box.
   - Press the send button or speak your message.

2. **Receive Responses**:
   - The chatbot will respond based on its programmed logic.
   - Responses may include predefined answers or simulated replies.

3. **Clear Chat History**:
   - Refresh the page to clear the chat history.

---

#### Example Interaction

- **User**: "What can you do?"
- **Chatbot**: "I can assist you with various queries. Just ask!"

---

#### Note

If you encounter any issues, please ensure that your browser supports speech recognition features.`,

`# Sample 1: Introduction to the Chatbot\nThis chatbot is designed to assist users by providing information and answering questions.\n\n## Features\n- **User-friendly interface**: Easy to navigate and interact with.\n- **Speech recognition**: Allows users to speak their queries instead of typing.\n- **Chat history**: Users can view previous interactions.\n\n### How It Works\n1. The user initiates a conversation by typing or speaking.\n2. The chatbot processes the input and generates a response.\n3. The response is displayed in the chat window, and the conversation continues.`,

    `# Sample 2: Code Snippet for Chatbot Logic\n\`\`\`javascript\nimport React, { useEffect, useState } from 'react';\n\nconst Chatbot = () => {\n    const [messages, setMessages] = useState([]);\n\n    const handleUserInput = (input) => {\n        setMessages(prevMessages => [...prevMessages, { user: input }]);\n        // Simulate bot response\n        setTimeout(() => {\n            setMessages(prevMessages => [...prevMessages, { bot: "Hello! How can I assist you today?" }]);\n        }, 2000);\n    };\n\n    return (\n        <div>\n            <h1>Chatbot</h1>\n            {/* Render messages here */}\n        </div>\n    );\n};\n\nexport default Chatbot;\n\`\`\`\nThis code snippet demonstrates how to manage user input and simulate a bot response in a React component.`,

    `# Sample 3: Comprehensive Table of Features\n| **Feature**           | **Description**                                   | **Status**   |\n|-----------------------|---------------------------------------------------|--------------|\n| User Authentication    | Secure login and registration process              | Enabled      |\n| Real-time Messaging    | Instant messaging capabilities                     | In Progress  |\n| Speech Recognition     | Convert speech to text for user input             | Enabled      |\n| Multi-language Support  | Support for multiple languages                     | Planned      |\n| Analytics Dashboard    | View user interaction analytics                    | Not Started  |`,

    `# Sample 4: LaTeX Equation Example\nThe following equation represents the Pythagorean theorem:\n$$\na^2 + b^2 = c^2$$\nWhere:\n- \( a \) is one leg of the triangle.\n- \( b \) is the other leg.\n- \( c \) is the hypotenuse.`,

    `# Sample 5: Blockquote Example\n> "Success is not final; failure is not fatal: It is the courage to continue that counts."  \n> — Winston S. Churchill\n\nThis quote emphasizes the importance of perseverance in the face of challenges.`,

    `# Sample 6: Detailed Nested List\n## Steps to Deploy the Chatbot Application\n1. **Set Up Environment**:\n   - Install Node.js and npm.\n   - Clone the repository from GitHub.\n2. **Install Dependencies**:\n   - Navigate to the project directory.\n   - Run \`npm install\` to install required packages.\n3. **Run the Application**:\n   - Start the development server using \`npm start\`.\n   - Open your browser and navigate to \`http://localhost:3000\`.\n4. **Test Functionality**:\n   - Interact with the chatbot to ensure all features are working correctly.`,

    `# Sample 7: Image with Caption Example\n![Chatbot Interface](https://via.placeholder.com/300 "Chatbot Interface")\n*Figure 1: A screenshot of the chatbot interface demonstrating its features.*`
]



export const randomSelectResponse = (array) =>{
    const randomIndex = Math.floor(Math.random()*array.length)
    return array[randomIndex]
    
}
export default DummyResponses
