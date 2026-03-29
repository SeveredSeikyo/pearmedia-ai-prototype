import { GoogleGenAI } from "@google/genai";
import { analyseImageUserPrompt, GEMINI_API_KEY, generateTextSystemPrompt } from "./constants";

const apiClient = new GoogleGenAI({apiKey: GEMINI_API_KEY});

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
        const response = await apiClient.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: prompt,
            config: {
                responseModalities: ['IMAGE'],
                imageConfig: {
                    aspectRatio: '1:1',
                }
            }
        });

        //const part = response.candidates[0].content.parts.find(p => p.inlineData);

        /* 
        if(part) {
            const { data, mimeType } = part.inlineData;

            ImgUrl = `data:${mimeType};base64,${data}`;
        }
        */

        console.log(response);
         
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