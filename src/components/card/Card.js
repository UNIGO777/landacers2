import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({ card, navigatePath }) => {
  const Navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const renderRating = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };
  



  return (
    <div 
      className="w-full h-full rounded-lg shadow-md bg-white overflow-hidden flex flex-col cursor-pointer"
      onClick={() => Navigate(`${navigatePath || `/property-profile?propertyId=${card?._id}`}`)}
    >
      <div className="relative h-[200px]">
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm z-10">
          <span className="text-[#3a78ff] font-semibold text-sm flex items-center">
            <span className="mr-1">14</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </span>
        </div>
        {card?.transactionType && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
            <span className="text-[#3a78ff] font-semibold text-sm">{card?.transactionType}</span>
          </div>
        )}
        {!imageLoaded && (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <img
          loading="lazy"
          src={card?.image}
          alt={card?.title}
          crossOrigin='anonymous'
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">{card?.title}</h3>
        
        <div className="flex items-center gap-3 mb-1">
          <p className="text-xl font-bold text-[#3a78ff]">₹{
            card?.price >= 10000000 
              ? `${(card?.price/10000000).toFixed(1)} Cr` 
              : `${(card?.price/100000).toFixed(1)} L`
          }</p>
          <div className="bg-gray-800 w-[2px] rounded-xl h-[18px]">

          </div>

          <p className="text-lg text-gray-600 font-medium">{card?.sqft || "1766"} sqft</p>
        </div>

        <div >
          <div className='flex items-center mb-2'><svg className="w-5 h-5 text-[#3a78ff] flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-700 text-lg">{card?.location}</p></div>
          
        </div>

        {/* <p className="text-gray-600 text-lg mb-2 line-clamp-1 h-7 overflow-hidden">{card?.details || "Ready to Move"}</p> */}
      </div>
    </div>

  );
};

export default Card;
