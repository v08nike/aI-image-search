import React from "react";

interface ImageProps {
  image: {
    image_ID: string;
    source: string;
    title: string;
    thumbnails: string;
  };
}

const Image: React.FC<ImageProps> = ({ image }) => (
  <div key={image.image_ID} className="w-[200px] h-[200px]">
    <img
      src={image.thumbnails}
      alt={image.title || ""}
      className="w-auto h-[180px] mx-auto"
    />
    <div className="text-sm mt-2">Come from {image.source}</div>
  </div>
);

export default React.memo(Image);