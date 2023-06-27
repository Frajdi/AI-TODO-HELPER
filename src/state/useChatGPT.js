import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const useChatGPT = () => {
  const [userInput, setUserInput] = useState("");

  const [aiResponse, setAiResponse] = useState(null);
  const [aiImages, setAiImages] = useState(null);
  const [loading, setLoading] = useState(false);

  //Prepare the configuration
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_SUBTASKKEY,
  });

  const imageConfiguration = new Configuration({
    apiKey: import.meta.env.VITE_MyImageGeneratorKey,
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
    } catch (error) {
      if (error.response) {
        const completion = error.response;
        console.log(completion)
      } else {
        const completion = error.message;
        console.log(completion);
      }
    }

    setLoading(false);
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
    handleUserInput,
    handleAiActivate,
  };
};

export default useChatGPT;
