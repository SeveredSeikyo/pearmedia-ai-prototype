import { GoogleGenAI } from "@google/genai";
import { 
    analyseImageUserPrompt, 
    GEMINI_API_KEY, 
    generateTextSystemPrompt, 
    STABILITY_API_KEY, 
    STABILITY_BASE_URL, 
    STABILITY_MODEL
} from "./constants";
import axios from "axios";

const apiClient = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const axiosInstance = axios.create({
    baseURL: STABILITY_BASE_URL,
    headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});


export const getEnhancedPrompt = async (input) => {
    try {
        const response = await apiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: input,
            config: {
                systemInstruction: generateTextSystemPrompt,
                maxOutputTokens: 500,
                temperature: 1.2,
            }
        });
        const result = response.text;
        return result;
    } catch (err) {
        console.error(err);
        return input;
    }
}

export const generateImage = async (prompt) => {
    try {

        const postUrl = `/v1/generation/${STABILITY_MODEL}/text-to-image`;

        const postObject = {
            text_prompts: [
                {
                    text: prompt,
                },
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 1,
        }

        const response = await axiosInstance.post(postUrl, postObject);

        if(!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`)
        }

        const responseJSON = await response.json();

        const imageBase64 = responseJSON.artifacts[0].base64;

        const imageUrl = `data:image/png;base64,${imageBase64}`;

        return imageUrl;
         
    } catch (error) {
        console.error(error);
        return prompt;
    }
}

export const analyzeImage = async (base64) => {
    try {
        const base64Data = base64.split(',')[1] || base64;

        const respone = await apiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: analyseImageUserPrompt
                        },
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: 'image/png',
                            },
                        },
                    ],
                },
            ],
        });

        return respone.text;
    } catch (err) {
        console.error(err);
        return "Analysis Failed.";
    }
};