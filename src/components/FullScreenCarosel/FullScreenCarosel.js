import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CardLoader from '../loaders/CardLoader';
import { useNavigate } from 'react-router-dom';
import { Route } from 'lucide-react';
import ROUTES_NAME from '../../constants/routes';

const FullScreenCarosel = ({Title,description,data,className}) => {
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length);
  };

  console.log(data,"data")

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data?.length) % data?.length);
  };

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, { x: 100 }, { x: 0, duration: 0.5 });
    }

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  
  
  return (
    <div className={` my-4 md:my-8 px-4  ${className}`}>
      <h2 className="text-xl md:text-2xl font-bold mb-4">{Title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className='overflow-hidden relative flex rounded-md'>
          {data.length > 0 ? data?.map((project, index) => {
            
             return <div key={index} className="relative transition-transform duration-500 w-full flex-shrink-0" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  <img loding="lazy" src={`https://api.landacre.in/storage/${project?.itemId?.images[0]}`} loading='lazy' alt={project?.itemId?.projectName} className="h-[50vh] md:h-[80vh] object-cover rounded-lg w-full" />
                  <div className="absolute w-full bg-black md:h-1/3 bottom-0 bg-opacity-50 flex flex-col justify-center  text-white p-4">
                      <h3 className="text-xl font-semibold">{project?.itemId?.projectName}</h3>
                      <p className="text-lg">{project?.itemId?.location?.city + ', ' + project?.itemId?.location?.state }</p>
                      <p className="text-lg font-bold">{project.details}</p>
                      <p className="text-lg">{project.price}</p>
                      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>navigate(`/project-profile?projectId=${project?.itemId?._id}`)}>View Project</button>
                  </div>
              </div>
      }) : <CardLoader/>}
      {data.length > 1 && <div className="flex absolute top-[50%] md:top-[50%]  -translate-y-1/2 w-full  justify-between mt-4 px-5">
        <button onClick={handlePrev} className="bg-white bg-opacity-80  text-black px-4 py-4 hover:scale-[1.1] transition-all rounded-full"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5' fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></button>
        <button onClick={handleNext} className="bg-white bg-opacity-80 text-black px-4 py-4 hover:scale-[1.1] rounded-full transition-all"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5' fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></button>
      </div>}
      </div>
    </div>
  );
};

export default FullScreenCarosel