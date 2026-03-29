import { useState } from "react";
import { generateImage, getEnhancedPrompt } from "../utils/apiHelpers";
import ImageCard from "./ImageCard";
import { CircleAlert, Rocket, Wand, Workflow } from "lucide-react";

const WorkflowText = ({ setIsLoading }) => {
    const [input, setInput] = useState("");
    const [enhanced, setEnhanced] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState("");

    const handleEnhance = async () => {
        setError("");
        setEnhanced("");
        setIsLoading(true);
        const res = await getEnhancedPrompt(input);
        if(res.status){
            setEnhanced(res.result);
        } else {
            setError(res.error)
        }
        setIsLoading(false);
    }

    const handleGenerate = async () => {
        setError("");
        setIsLoading(true);
        const res = await generateImage(enhanced);
        if(res.status) {
            setImage(res.result);
        } else {
            setError(res.error);
        }
        setIsLoading(false);
    }

    return (
        <div
            className="w-full flex flex-col"
        >
            <h2 className="flex flex-row gap-2 text-red-600 items-center my-5 m-auto font-semibold text-lg">
                <Workflow />
                <span>Text &rarr; Image Workflow</span>
            </h2>
            
            <textarea
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg mb-5 focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                rows={8}
                placeholder="Enter your idea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button 
                className="flex flex-row gap-2 m-2 w-fit px-5 py-2 rounded-lg bg-blue-500 text-white justify-center m-auto"
                onClick={handleEnhance}
            >
                <Rocket />
                <span>Enhance Prompt</span>
            </button>

            {enhanced && (
                <div 
                    className="my-5"
                >
                    <textarea
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg mb-5 focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                        rows={8}
                        value={enhanced}
                        onChange={(e) => setEnhanced(e.target.value)}
                    />

                    <button 
                        className="flex flex-row gap-2 m-2 w-fit px-5 py-2 rounded-lg bg-blue-500 text-white justify-center m-auto"
                        onClick={handleGenerate}
                    >
                        <Wand />
                        <span>Generate Image</span>
                    </button>
                </div>
            )}

            {image && <ImageCard src={image} />}

            {error && (
                <p className="flex flex-row gap-2 text-red-600 items-center my-5 m-auto font-semibold text-lg">
                    <CircleAlert />
                    <span>{error}</span>
                </p>
            )}
        </div>
    )
}


export default WorkflowText;