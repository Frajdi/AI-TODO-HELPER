# AI-TODO-HELPER

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

AI-TODO-HELPER is a powerful task management tool that leverages the OpenAI GPT-3.5 Turbo model to assist you in breaking down tasks into smaller subtasks. With the help of AI and Framer Motion libary , you can easily split your tasks and generate a visual representation of the subtasks with captivating animations, enhancing the overall visual experience. By utilizing perceived performance techniques, we have ensured exceptional user experience, making the AI-TODO-HELPER interface smooth.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use AI-TODO-HELPER, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

   ```shell
   npm install
   npm start
## This is the previous implementation without setting up a proxy middleware



```import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const useChatGPT = () => {
  const [userInput, setUserInput] = useState("");

  const [aiResponse, setAiResponse] = useState(null);
  const [aiImages, setAiImages] = useState(null);
  const [loading, setLoading] = useState(false);


  //Prepare the configuration
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_SUBTASK_KEY,
    organization: import.meta.env.VITE_ORGANIZATION_ID
  });

  const imageConfiguration = new Configuration({
    apiKey: import.meta.env.VITE_IMAGE_GENERATOR_KEY,
    organization: import.meta.env.VITE_ORGANIZATION_ID
  });

  const openai = new OpenAIApi(configuration);
  const imageOpenAi = new OpenAIApi(imageConfiguration);

  // This function will trigger the request to the openAI API with the correct configuration and the right prompt from the user
  const aiGenerate = async (userInput) => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Split this in 5 smaller subtasks and put a $ after each subtask: ${userInput}`,
          },
        ],
      });

      const responseImage = await imageOpenAi.createImage({
        prompt: userInput,
        n: 5,
        size: "512x512",
      });

      setAiImages(responseImage.data.data);
      setAiResponse(completion.data.choices[0].message.content.split("$"));
      setLoading(false)
    } catch (error) {
      if (error.response) {
        const completion = error.response;
        console.log(completion)
      } else {
        const completion = error.message;
        console.log(completion);
      }
    }

  };

  const handleUserInput = (e) => setUserInput(e.target.value);


  //This will reset the loading state and call the ai generate function with the new input 
  const handleAiActivate = () => {
    setLoading(true);
    aiGenerate(userInput);
  };

  return {
    aiResponse,
    aiImages,
    userInput,
    loading,
    setLoading,
    handleUserInput,
    handleAiActivate,
  };
};

export default useChatGPT; 
```

### This is in the useChatGPT.js custom hook it works but we get an error that says: 

```unable to useChatGPT.js? Refused to set unsafe header "User-Agent"```

### Now we are going to use axios to make OPENAI SDK in order to fix the error but we are also going to set up a proxy server on our local development environment that forwards the requests to the OpenAI API. This way, the request will be made from our local server instead of the client-side, bypassing the CORS restrictions. 
