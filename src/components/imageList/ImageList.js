import React from "react";

const ImageList = ({ heading, paragraph, images }) => {
  return (
    <div className="my-8 px-4  md:px-16">
      {/* Heading Section */}
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-800">{heading}</h2>
        <p className="md:text-lg text-gray-600 mt-2">{paragraph}</p>
      </div>

      {/* Image List */}
      <div className=""><div className="grid grid-cols-1 mb-3 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-2">
          {images
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map((image, index) => (
              <div key={index} className="relative">
                {/* Image */}
                <img loding="lazy"
                  src={image.src}
                  alt={image.name}
                  className="w-full md:h-80 h-40 object-cover rounded-lg shadow-md"
                />
                {/* Image Name */}
               
              </div>
            ))}
        </div>
        {images
            .sort(() => 0.5 - Math.random())
            .slice(0, 1)
            .map((image, index) => (
              <div key={index} className="relative">
                {/* Image */}
                <img loding="lazy"
                  src={image.src}
                  alt={image.name}
                  className="w-full md:h-80 h-40 object-cover rounded-lg shadow-md"
                />
                {/* Image Name */}
               
              </div>
            ))}</div>
      

      {/* Image List */}
            
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 ">
      {images
            .sort(() => 0.5 - Math.random())
            .slice(0, 1)
            .map((image, index) => (
              <div key={index} className="relative">
                {/* Image */}
                <img loding="lazy"
                  src={image.src}
                  alt={image.name}
                  className="w-full md:h-80 h-40 object-cover rounded-lg shadow-md"
                />
                {/* Image Name */}
               
              </div>
            ))}
        <div className="grid grid-cols-2 gap-2">
          {images
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map((image, index) => (
              <div key={index} className="relative">
                {/* Image */}
                <img loding="lazy"
                  src={image.src}
                  alt={image.name}
                  className="w-full md:h-80 h-40 object-cover rounded-lg shadow-md"
                />
                {/* Image Name */}
               
              </div>
            ))}
        </div>
        

      </div>
      </div>
    </div>
  );
};

export default ImageList;
