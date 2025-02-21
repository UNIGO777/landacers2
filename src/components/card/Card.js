import React from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({ card }) => {

  const Navigate = useNavigate()
  const renderRating = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆'); 
    }
    return stars.join('');
  };

 
  
  return (
   
    <div  className="relative transition-transform duration-500   w-full overflow-hidden flex-shrink-0" >
                  <img loding="lazy" src={card?.image} loading='lazy' alt={card?.title} className="h-[30vh] sm:min-h-[400px] rounded-t-md  md:min-h-[350px] object-cover  w-full" />
                  <div className="absolute rounded-b-md w-full bg-black md:h-[50%] bottom-0 bg-opacity-50 flex flex-col justify-center  text-white p-4">
                      <h3 className="text-sm md:text-xl font-semibold">{card?.title}</h3>
                      <p className="text-sm md:text-lg">{card?.location}</p>
                      <p className="text-sm md:text-lg font-bold">{card?.details}</p>
                      <div className='flex '><p className="text-sm md:text-lg">₹{card?.price} ,</p> 
                      <p className="text-sm md:text-lg ml-2">{card?.transactionType}</p></div>
                      <button className="mt-3  bg-blue-500 text-white px-4 py-2 rounded-lg text-sm" onClick={()=> Navigate(`/property/${card?._id}`)}>View Details</button>
                  </div>
              </div>
    // <div className="md:w-[30%] w-[60%] md:h-80 bg-white shrink-0 rounded-lg shadow-lg cursor-pointer">
    //   <img loding="lazy"
    //     src={card?.image}
    //     alt={card?.title}
    //     className="w-full md:h-[70%] rounded-t-lg object-cover"
    //   />
    //   <div className="md:p-4 p-2">
    //     <h3 className="md:text-xl text-lg font-semibold">{card?.title}</h3>
    //     <p className="text-gray-600 md:mt-2">{card?.description}</p>

    //     {/* Display Rating */}
    //     <div className="md:mt-2  mt-1 text-yellow-500">
    //       {renderRating(card?.rating)} {/* Display the stars */}
    //     </div>

    //     {/* Display Location */}
    //     <div className="md:mt-2 mt-1 text-gray-500">
    //       <span>Location: </span>{card?.location}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
