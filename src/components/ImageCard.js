import { Download } from "lucide-react";

const ImageCard = ({ src }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `generated-image-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed", err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-4 mb-24 lg:mb-10">
            <div className="relative group">
                <img
                    className="w-full max-w-[512px] h-auto rounded-xl shadow-2xl border border-white"
                    src={src}
                    alt="result" 
                />
            </div>
            
            <button 
                onClick={handleDownload}
                className="flex flex-row gap-2 items-center px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-black transition-colors shadow-lg text-sm font-medium"
            >
                <Download size={18} />
                Download Masterpiece
            </button>
        </div>
    );
};

export default ImageCard;