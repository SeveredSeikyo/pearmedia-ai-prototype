const ImageCard = ({ src }) => {
    return (
        <div>
            <img
                className="h-auto max-w-[300px] mx-auto"
                src={src}
                alt="result" 
            />
        </div>
    );
};

export default ImageCard;