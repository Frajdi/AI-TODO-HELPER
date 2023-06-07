import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const useChatGPT = () => {


  const [aiResponse, setAiResponse] = useState(null);
  const [aiImages, setAiImages] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(null);


  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_SUBTASKKEY,
  });

  const imageConfiguration = new Configuration({
    apiKey: import.meta.env.VITE_MyImageGeneratorKey,
  });


  const openai = new OpenAIApi(configuration);
  const imageOpenAi = new OpenAIApi(imageConfiguration);

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
      setAiResponse(completion.data.choices[0].message.content.split('$'));
      console.log('subtasks', completion.data.choices[0].message.content.split('$'))
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        const completion = error.response
        setAiResponse(null)
      } else {
        setAiResponse(null)
        console.log(error.message);
        const completion = error.message
      }
    }



    try {
      const responseImage = await imageOpenAi.createImage({
        prompt: userInput,
        n: 5,
        size: "512x512",
      });
      setAiImages(responseImage.data.data);
      console.log('images', responseImage.data.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        const responseImage = error.response
        setAiImages(null)
      } else {
        setAiImages(null)
        console.log(error.message);
        const responseImage = error.message
      }
    }

  

    

    // console.log('images', responseImage.data.data)
    // console.log('subtasks', completion.data.choices[0].message.content.split('$'))
    setLoading(false);
  };


  const handleUserInput = (e) => setUserInput(e.target.value);

  const handleAiActivate = () => {
    setLoading(true);
    setAiResponse(null);
    aiGenerate(userInput);
  };

  return {
    aiResponse,
    aiImages,
    userInput,
    loading : !!aiImages && !!aiResponse,
    handleUserInput,
    handleAiActivate
  };
};

export default useChatGPT;
