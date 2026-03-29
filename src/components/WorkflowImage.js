import React, { useState } from "react";
import { analyzeImage, generateImage } from "../utils/apiHelpers";
import ImageCard from "./ImageCard";


const WorkflowImage = ({ setIsLoading }) => {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [image, setImage] = useState("");

    const handleUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFile(reader.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleAnalyze = async () => {
        setIsLoading(true);
        const result = await analyzeImage(file);
        setAnalysis(result);
        setIsLoading(false);
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        const img = await generateImage(analysis);
        setImage(img);
        setIsLoading(false);
    };

    return (
        <div>
            <h2>Image &rarr; Style Workflow</h2>

            <input type="file" onChange={handleUpload} />

            <button onClick={handleAnalyze}>
                Analyze Image
            </button>

            {analysis && (
                <>
                    <textarea value = {analysis} readOnly />
                    <button onClick={handleGenerate}>Generate Variation</button>
                </>
            )}

            {image && <ImageCard src={image} />}
        </div>
    )
}

export default WorkflowImage;