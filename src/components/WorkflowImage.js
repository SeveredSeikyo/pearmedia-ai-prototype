import { useState } from "react";
import { analyzeImage, generateImage } from "../utils/apiHelpers";
import ImageCard from "./ImageCard";
import { Search, Wand2, Upload, Workflow, CircleAlert } from "lucide-react";

const WorkflowImage = ({ setIsLoading }) => {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFile(reader.result);
        };
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        setError("");
        setImage("");
        setIsLoading(true);
        const res = await analyzeImage(file);
        if(res.status){
            setAnalysis(res.result)
        } else {
            setError(res.error)
        }
        setIsLoading(false);
    };

    const handleGenerate = async () => {
        setImage("");
        setError("");
        setIsLoading(true);
        const res = await generateImage(analysis);
        if(res.status) {
            setImage(res.result);
        }else {
            setError(res.error)
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full flex flex-col">
            <h2 className="flex flex-row gap-2 text-blue-600 items-center my-5 m-auto font-semibold text-lg">
                <Workflow />
                <span>Image &rarr; Style Workflow</span>
            </h2>

            <div className="flex flex-col items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 font-medium">Click to upload image</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleUpload} />
                </label>
            </div>

            {file && !analysis && (
                <div className="mt-5 flex flex-col items-center">
                    <img src={file} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md mb-4" />
                    <button 
                        className="flex flex-row gap-2 w-fit px-5 py-2 rounded-lg bg-indigo-600 text-white justify-center shadow-sm hover:bg-indigo-700 transition-all"
                        onClick={handleAnalyze}
                    >
                        <Search size={20} />
                        <span>Analyze Style</span>
                    </button>
                </div>
            )}

            {analysis && (
                <div className="my-5 flex flex-col">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Style Description</p>
                    <textarea 
                        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg mb-5 focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 shadow-sm min-h-[100px]"
                        value={analysis} 
                        onChange={(e) => setAnalysis(e.target.value)}
                    />
                    
                    <button 
                        className="flex flex-row gap-2 w-fit px-6 py-2.5 rounded-lg bg-blue-500 text-white justify-center m-auto shadow-md hover:bg-blue-600 transition-all"
                        onClick={handleGenerate}
                    >
                        <Wand2 size={20} />
                        <span>Generate Variation</span>
                    </button>
                </div>
            )}

            {image && (
                <div className="mt-8 border-t pt-8">
                    <p className="text-center text-sm text-gray-500 mb-4 italic">Resulting Masterpiece</p>
                    <ImageCard src={image} />
                </div>
            )}

            {error && (
                <p className="flex flex-row gap-2 text-red-600 items-center my-5 m-auto font-semibold text-lg">
                    <CircleAlert />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};

export default WorkflowImage;