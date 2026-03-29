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
        <div className="w-full flex flex-col">
            <h2 className="flex flex-row gap-2 text-red-600 items-center my-5 m-auto font-semibold text-lg">
                <Workflow />
                <span>Text &rarr; Image Workflow</span>
            </h2>
            
            <textarea
                className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg mb-5 focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 shadow-sm"
                rows={4}
                placeholder="Enter your idea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button 
                className="flex flex-row gap-2 w-fit px-5 py-2 rounded-lg bg-blue-500 text-white justify-center m-auto shadow-md hover:bg-blue-600 transition-all"
                onClick={handleEnhance}
            >
                <Rocket size={20} />
                <span>Enhance Prompt</span>
            </button>

            {enhanced && (
                <div className="mt-8 border-t pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Side: Controls */}
                        <div className="flex flex-col">
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Enhanced Prompt</p>
                            <textarea
                                className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg mb-5 focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 shadow-sm"
                                rows={6}
                                value={enhanced}
                                onChange={(e) => setEnhanced(e.target.value)}
                            />
                            <button 
                                className="flex flex-row gap-2 w-full px-5 py-2.5 rounded-lg bg-indigo-600 text-white justify-center shadow-md hover:bg-indigo-700 transition-all"
                                onClick={handleGenerate}
                            >
                                <Wand size={20} />
                                <span>Generate Image</span>
                            </button>
                        </div>

                        {/* Right Side: Result */}
                        <div className="flex flex-col items-center">
                            {image ? (
                                <>
                                    <p className="text-sm text-gray-500 mb-4 italic">Resulting Masterpiece</p>
                                    <ImageCard src={image} />
                                </>
                            ) : (
                                <div className="w-full aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                    Image will appear here
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="flex flex-row gap-2 text-red-600 items-center my-5 m-auto font-semibold">
                    <CircleAlert />
                    <span>{error}</span>
                </p>
            )}
        </div>
    )
}

export default WorkflowText;