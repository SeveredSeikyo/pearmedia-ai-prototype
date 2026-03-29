import React from "react";

const ImageCard = ({ src }) => {
    return (
        <div>
            <img src={src} alt="result" style={{ width: "300px" }} />
        </div>
    );
};

export default ImageCard;