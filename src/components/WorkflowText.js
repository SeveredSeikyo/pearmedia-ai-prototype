import React, { useState } from "react";
import { generateImage, getEnhancedPrompt } from "../utils/apiHelpers";
import ImageCard from "./ImageCard";


const WorkflowText = ({ setIsLoading }) => {
    const [input, setInput] = useState("");
    const [enhanced, setEnhanced] = useState("");
    const [image, setImage] = useState("");

    const handleEnhance = async () => {
        setIsLoading(true);
        const res = await getEnhancedPrompt(input);
        setEnhanced(res);
        setIsLoading(false);
    }

    const handleGenerate = async () => {
        setIsLoading(true);
        const imgUrl = await generateImage(enhanced);
        setImage(imgUrl);
        setIsLoading(false);
    }

    return (
        <>
            <h2>Text &rarr; Image Workflow</h2>
            
            <textarea
                placeholder="Enter your idea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleEnhance}>
                Enhance Prompt
            </button>

            {enhanced && (
                <>
                    <textarea
                        value={enhanced}
                        onChange={(e) => setEnhanced(e.target.value)}
                    />

                    <button onClick={handleGenerate}>Generate Image</button>
                </>
            )}

            {image && <ImageCard src={image} />}
        </>
    )
}


export default WorkflowText;