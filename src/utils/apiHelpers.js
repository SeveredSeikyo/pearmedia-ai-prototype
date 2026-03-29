import { GoogleGenAI } from "@google/genai";
import { 
    analyseImageUserPrompt, 
    GEMINI_API_KEY, 
    generateTextSystemPrompt, 
    STABILITY_API_KEY, 
    STABILITY_BASE_URL, 
    STABILITY_MODEL,
    GEMINI_MODEL
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

const cleanJSON = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};


export const getEnhancedPrompt = async (input) => {
    try {
        const response = await apiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: input,
            config: {
                systemInstruction: generateTextSystemPrompt,
                temperature: 1.2,
            }
        });
        const raw = response.text;
        console.log(raw)
        const parsed = JSON.parse(cleanJSON(raw));
        console.log(parsed);
        const result = parsed.final_prompt;
        return {
            status: true,
            result
        };
    } catch (err) {
        console.error(`Prompt Enhancement Failed: ${err}`);
        return {
            status: false,
            error: 'Prompt Enhancement Failed'
        };
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

        const imageBase64 = response.data.artifacts[0].base64;

        const imageUrl = `data:image/png;base64,${imageBase64}`;

        return {
            status: true,
            result: imageUrl
        };
         
    } catch (error) {
        console.error(`Image Generation Failed: ${error}`);
        return {
            status: false,
            error: 'Failed to Generate Image'
        };
    }
}

export const analyzeImage = async (base64) => {
    try {
        const base64Data = base64.split(',')[1] || base64;

        const response = await apiClient.models.generateContent({
            model: GEMINI_MODEL,
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

        const raw = response.text;
        console.log(raw)
        const parsed = JSON.parse(cleanJSON(raw));
        console.log(parsed);
        const result = parsed.final_prompt;
        return {
            status: true,
            result
        };
    } catch (err) {
        console.error(`Image Analysis Failed: ${err}`);
        return {
            status: false,
            error: "Image Analysis Failed."
        };
    }
};