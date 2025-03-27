import { ArrowBigRight, ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({ card , navigatePath }) => {

  const Navigate = useNavigate()
  const renderRating = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };



  return (

    <div className="w-full  h-full rounded-xl shadow-lg bg-white mb-5 transform transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-[200px]">
        <img
          loading="lazy"
          src={card?.image}
          alt={card?.title}
          className="w-full h-full bg-black/10 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <span className="text-[#3a78ff] font-semibold text-sm">{card?.transactionType}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-gray-800 mb-3 hover:text-[#3a78ff] transition-colors duration-300 line-clamp-1">{card?.title}</h3>

        <div className="flex items-center mb-3 space-x-2">
          <svg className="w-5 h-5 text-[#3a78ff] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300 line-clamp-1">{card?.location}</p>
        </div>

        <p className="text-gray-600 mb-5 line-clamp-2 hover:line-clamp-none transition-all duration-300 flex-grow">{card?.details}</p>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto">
          <div className="group">
            <p className="text-sm text-gray-500 mb-1">Price</p>
            <p className="text-xl font-bold text-[#3a78ff] group-hover:scale-105 transition-transform duration-300">₹{card?.price}</p>
          </div>
          <button
            className="bg-[#3a78ff] hover:bg-blue-700 text-white px-3 mt-2 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            onClick={() => Navigate(`${navigatePath || `/property-profile?propertyId=${card?._id}`}`)}
          >
            <ArrowRight/>
          </button>
        </div>
      </div>
    </div>

  );
};

export default Card;
