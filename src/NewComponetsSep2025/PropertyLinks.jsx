import React from 'react';
import { ChevronRight } from 'lucide-react';

const PropertyLinks = () => {
  // Function to generate search URL similar to handleSearch in HomeSearchBox
  const generateSearchURL = (propertyType, transactionType, city, state, SearchQuery) => {
    const params = {
      propertyType,
      transactionType,
      page: 1,
      city,
      state,
      locality: '',
      searchQuery: SearchQuery || '',
    };
    return `/search-results?${new URLSearchParams(params).toString()}`;
  };

  // Property categories with their links - covering multiple cities
  const propertyCategories = [
    {
      title: 'Popular Residential Searches',
      links: [
        { text: 'Property for Sale in Bhopal', url: generateSearchURL('FlatApartment', 'Buy', 'Bhopal', 'Madhya Pradesh') },
        { text: 'Property for Sale in Indore', url: generateSearchURL('FlatApartment', 'Buy', 'Indore', 'Madhya Pradesh') },
        { text: 'Property for Sale in Jabalpur', url: generateSearchURL('FlatApartment', 'Buy', 'Jabalpur', 'Madhya Pradesh') },
        { text: 'Property for Sale in Gwalior', url: generateSearchURL('FlatApartment', 'Buy', 'Gwalior', 'Madhya Pradesh') },
        { text: 'Property for Sale in Ujjain', url: generateSearchURL('FlatApartment', 'Buy', 'Ujjain', 'Madhya Pradesh') },
        { text: 'Property for Sale in Sagar', url: generateSearchURL('FlatApartment', 'Buy', 'Sagar', 'Madhya Pradesh') },
        { text: 'Property for Sale in Dewas', url: generateSearchURL('FlatApartment', 'Buy', 'Dewas', 'Madhya Pradesh') },
        { text: 'Property for Sale in Satna', url: generateSearchURL('FlatApartment', 'Buy', 'Satna', 'Madhya Pradesh') },
        { text: 'Property for Sale in Ratlam', url: generateSearchURL('FlatApartment', 'Buy', 'Ratlam', 'Madhya Pradesh') },
      ]
    },
    {
      title: 'Popular BHK Searches',
      links: [
        { text: '1 BHK Flats in Bhopal', url: generateSearchURL('FlatApartment', 'Buy', 'Bhopal', 'Madhya Pradesh', '1 BHK') },
        { text: '2 BHK Flats in Indore', url: generateSearchURL('FlatApartment', 'Buy', 'Indore', 'Madhya Pradesh', '2 BHK') },
        { text: '3 BHK Flats in Jabalpur', url: generateSearchURL('FlatApartment', 'Buy', 'Jabalpur', 'Madhya Pradesh', '3 BHK') },
        { text: '4 BHK Flats in Gwalior', url: generateSearchURL('FlatApartment', 'Buy', 'Gwalior', 'Madhya Pradesh', '4 BHK') },
        { text: '1 BHK House for Sale in Ujjain', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Ujjain', 'Madhya Pradesh', '1 BHK') },
        { text: '2 BHK House for Sale in Sagar', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Sagar', 'Madhya Pradesh', '2 BHK') },
        { text: '3 BHK House for Sale in Dewas', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Dewas', 'Madhya Pradesh', '3 BHK') },
        { text: '4 BHK House for Sale in Satna', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Satna', 'Madhya Pradesh', '4 BHK') },
        { text: '3 BHK Villa for Sale in Ratlam', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Ratlam', 'Madhya Pradesh', '3 BHK') },
        { text: '4 BHK Villa for Sale in Bhopal', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Bhopal', 'Madhya Pradesh', '4 BHK') },
      ]
    },
    {
      title: 'Popular Flat Searches',
      links: [
        { text: 'Flats for Sale in Bhopal', url: generateSearchURL('FlatApartment', 'Buy', 'Bhopal', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Indore', url: generateSearchURL('FlatApartment', 'Buy', 'Indore', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Jabalpur', url: generateSearchURL('FlatApartment', 'Buy', 'Jabalpur', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Gwalior', url: generateSearchURL('FlatApartment', 'Buy', 'Gwalior', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Ujjain', url: generateSearchURL('FlatApartment', 'Buy', 'Ujjain', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Sagar', url: generateSearchURL('FlatApartment', 'Buy', 'Sagar', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Dewas', url: generateSearchURL('FlatApartment', 'Buy', 'Dewas', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Satna', url: generateSearchURL('FlatApartment', 'Buy', 'Satna', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Ratlam', url: generateSearchURL('FlatApartment', 'Buy', 'Ratlam', 'Madhya Pradesh', 'Flats') },
        { text: 'Flats for Sale in Rewa', url: generateSearchURL('FlatApartment', 'Buy', 'Rewa', 'Madhya Pradesh', 'Flats') },
      ]
    },
    {
      title: 'Popular House Searches',
      links: [
        { text: 'House for Sale in Bhopal', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Bhopal', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Indore', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Indore', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Jabalpur', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Jabalpur', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Gwalior', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Gwalior', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Ujjain', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Ujjain', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Sagar', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Sagar', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Dewas', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Dewas', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Satna', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Satna', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Ratlam', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Ratlam', 'Madhya Pradesh', 'House') },
        { text: 'House for Sale in Rewa', url: generateSearchURL('IndependentHouseVilla', 'Buy', 'Rewa', 'Madhya Pradesh', 'House') },
      ]
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="px-10 container mx-auto  sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Property Options in Madhya Pradesh
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Explore diverse property listings across major cities in Madhya Pradesh - from apartments to independent houses
          </p>
        </div>

        {/* Navigation Tabs */}
       

        {/* Property Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propertyCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors duration-200 py-1"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow */}
       
      </div>
    </section>
  );
};

export default PropertyLinks;