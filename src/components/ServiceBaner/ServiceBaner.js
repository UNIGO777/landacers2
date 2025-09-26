import React from 'react';
import { Link } from 'react-router-dom';
const ServiceBaner = ({ Title, SubTitle, description, link, image, buttonDescription, demantionChange }) => {
    

    return (
        <div className="bg-white md:mt-10 md:mb-10">
            <div className="max-w-7xl mx-auto text-center ">
                <div className='w-full flex  justify-center'>
                <h1 className="text-xl md:text-4xl font-bold  p-5 md:w-1/2">{Title}</h1>
                </div>
                <div className={`flex flex-col  md:flex-row ${demantionChange && 'md:flex-row-reverse'}`}>
                    <div className=" h-[55vh]  md:h-[60vh]  min-w-full max-w-full md:min-w-[50vw] md:max-w-[50vw]  p-5">
                        <img loding="lazy"
                            src={image}
                            alt="Living Room"
                            className="mx-auto rounded-lg shadow-lg w-full md:w-[50vw] h-[50vh]  md:h-[60vh] object-cover"
                        />
                    </div>
                    <div className='text-left flex flex-col px-6  md:p-16  justify-center'>
                    <h2 className="text-lg md:text-2xl mb-3 md:mb-6 font-bold ">{SubTitle}</h2>
                    <p className="mb-2 text-gray-500">{description}</p>
                    {buttonDescription && <Link to={link}><button className="bg-blue-500 mt-4 text-white w-fit py-3 px-5 rounded">{buttonDescription}</button></Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceBaner;