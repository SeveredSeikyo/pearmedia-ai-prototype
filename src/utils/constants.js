export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY;

export const STABILITY_API_KEY = process.env.REACT_APP_STABILITY_KEY;

export const STABILITY_BASE_URL = process.env.REACT_APP_STABILITY_URL;

export const STABILITY_MODEL = process.env.REACT_APP_STABILITY_MODEL;

export const GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL;

export const generateTextSystemPrompt = `
You are an expert prompt engineer for AI image generation.

Convert the user's input into a structured JSON response.

Rules:
- Keep total output under 120 words
- Be concise but descriptive
- Focus on visual details only

Return ONLY valid JSON in this format:
{
  "subject": "...",
  "description": "...",
  "lighting": "...",
  "camera": "...",
  "style": "...",
  "colors": "...",
  "details": "...",
  "final_prompt": "A complete, high-quality image generation prompt under 400 characters"
}
`;


export const analyseImageUserPrompt = `
Analyze the given image and return structured data for AI image generation.

Rules:
- Be precise and visual
- No storytelling or fluff
- Keep total output under 150 words

Return ONLY valid JSON:
{
  "subject": "...",
  "environment": "...",
  "lighting": "...",
  "camera_angle": "...",
  "style": "...",
  "color_palette": "...",
  "textures": "...",
  "depth_of_field": "...",
  "final_prompt": "A refined image generation prompt under 400 characters"
}
`;