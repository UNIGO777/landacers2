import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { cardsData, images } from '../../tempData/data';
import MapImgae from '../../Assets/Images/image 3.png'
import { FiMapPin, FiHome, FiLayers, FiCheck, FiMail, FiPhone, FiUser, FiHeart, FiDroplet } from 'react-icons/fi';
import PropertyCard from '../../components/card/Card';

const PropertyProfile = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('propertyId');
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    
    // Enhanced dummy property details
    const dummyProperty = {
        title: "Luxury 3BHK Apartment in Prime Location",
        price: "₹2.5 Cr",
        propertyType: "Apartment",
        address: {
            state: "Maharashtra",
            district: "Mumbai Suburban",
            city: "Mumbai",
            locality: "Bandra West",
            pincode: "400050"
        },
        size: "1800 sqft",
        bedrooms: 3,
        bathrooms: 3,
        description: `This stunning 3 bedroom apartment offers luxurious living in the heart of Mumbai. Features include:
        - Spacious living room with floor-to-ceiling windows
        - Modular kitchen with premium appliances
        - Master bedroom with walk-in closet
        - 24/7 security and amenities pool, gym, and clubhouse`,
        amenities: [
            'Swimming Pool',
            'Gym',
            'Clubhouse',
            '24/7 Security',
            'Parking',
            'Power Backup'
        ],
        postedDate: "2 days ago",
        contact: {
            name: "Rajesh Properties",
            phone: "+91 98765 43210",
            email: "contact@rajeshproperties.com"
        },
        media: {
            video: "https://www.youtube.com/embed/sample-video-id",
            images: images
        }
    };

    const maskPhoneNumber = (phone) => {
        return phone.replace(/(\d{2})\d{4}(\d{4})/, '$1****$2');
    };

    return(
        <div className="container mx-auto px-4 py-8">
            {/* Media Section */}
            <div className="space-y-4">
                {/* Video Player */}
                {dummyProperty.media.video && (
                    <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                        <iframe
                            className="w-full h-full object-cover"
                            src={dummyProperty.media.video}
                            title="Property video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
                
                {/* Image Carousel */}
                <div className="space-y-2">
                    <div className="h-96 w-full rounded-2xl overflow-hidden">
                        <img 
                            src={dummyProperty.media.images[activeMediaIndex]} 
                            alt="Property" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {dummyProperty.media.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className={`h-20 w-32 cursor-pointer object-cover rounded-lg ${
                                    activeMediaIndex === index ? 'ring-2 ring-primary' : ''
                                }`}
                                onClick={() => setActiveMediaIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* Main Details Section */}
                <div className="md:col-span-2 space-y-8">
                    <div className="border-b pb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">{dummyProperty.title}</h1>
                            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-lg">
                                {dummyProperty.price}
                            </span>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <FiHome className="w-5 h-5 mr-2 text-primary" />
                                    <span><strong>Type:</strong> {dummyProperty.propertyType}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FiMapPin className="w-5 h-5 mr-2 text-primary" />
                                    <span>{`${dummyProperty.address.locality}, ${dummyProperty.address.city}, ${dummyProperty.address.state} - ${dummyProperty.address.pincode}`}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                    <span>{dummyProperty.size}</span>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex items-center text-gray-600">
                                        <span className="bg-gray-100 px-3 py-1 rounded-lg">🛏 {dummyProperty.bedrooms}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="bg-gray-100 px-3 py-1 rounded-lg">🚿 {dummyProperty.bathrooms}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Property Details</h2>
                            <div className="prose max-w-none text-gray-600">
                                {dummyProperty.description.split('\n').map((line, index) => (
                                    <div key={index} className="flex items-start">
                                        <FiCheck className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                                        <p className="whitespace-pre-line">{line.replace('- ', '')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities Section */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {dummyProperty.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                        <FiCheck className="w-4 h-4 text-primary mr-2" />
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seller Details and Contact Section */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Seller Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                                <FiUser className="w-6 h-6 text-primary mr-3" />
                                <div>
                                    <h3 className="font-semibold">{dummyProperty.contact.name}</h3>
                                    <p className="text-sm text-gray-600">Verified Seller</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                                <FiPhone className="w-6 h-6 text-primary mr-3" />
                                <span className="font-medium">
                                    {maskPhoneNumber(dummyProperty.contact.phone)}
                                </span>
                            </div>
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                                <FiMail className="w-6 h-6 text-primary mr-3" />
                                <span className="font-medium">{dummyProperty.contact.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-primary/5 to-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Seller</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea placeholder="Write your message..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-32" />
                            </div>
                            
                            <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <span className="ml-2 text-sm text-gray-600">
                                    I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a>
                                </span>
                            </div>
                            
                            <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Location Section */}
            <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Location</h2>
                    <button className="flex items-center text-primary hover:text-primary-dark">
                        <FiMapPin className="mr-2" />
                        Open in Maps
                    </button>
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <img src={MapImgae} alt="Property location" className="w-full h-96 object-cover" />
                </div>
            </div>

            {/* Similar Properties Section */}
            <div className="mt-16">
                <div className="flex justify-between items-center pb-4 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Similar Properties</h2>
                    <button className="text-primary hover:text-primary-dark font-medium">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cardsData.slice(0, 3).map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PropertyProfile