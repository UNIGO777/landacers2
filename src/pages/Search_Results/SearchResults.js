import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SideMenu from './Components/SideMenu';
import Navbar from '../../components/navbar/Navbar';
import { FiMapPin, FiHome, FiLayers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const navigate = useNavigate()

    // Extract query parameters
    const projectType = searchParams.get('projectType');
    const propertyType = searchParams.get('propertyType') || 'Not Found';
    const transactionType = searchParams.get('transactionType') || (projectType ? 'Projects' : 'Not Found');
    const page = parseInt(searchParams.get('page')) || 1;
    const city = searchParams.get('city') || 'Not found';
    const state = searchParams.get('state')?.replace(/\+/g, ' ') || 'Not found';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage);
        window.location.search = newParams.toString();
    };

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true)
            try {
                const isProjectSearch = transactionType === "Projects" || !!projectType;
                const apiUrl = isProjectSearch
                    ? `${process.env.REACT_APP_backendUrl}/api/projects/search`
                    : `${process.env.REACT_APP_backendUrl}/api/properties/search`;

                const params = {
                    ...(isProjectSearch ? { projectType: projectType || propertyType } : {
                        propertyType,
                        transactionType
                    }),
                    page,
                    city,
                    state,
                    ...(minPrice && { minPrice }),
                    ...(maxPrice && { maxPrice })
                };

                const response = await axios.get(apiUrl, {
                    params: new URLSearchParams(params)
                });

                const results = isProjectSearch
                    ? response.data.projects || []
                    : response.data.data || [];

                if (results) {
                    setData({
                        results,
                        total: response.data.total || results.length,
                        totalPages: Math.ceil((response.data.total || results.length) / 20)
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching results:', error);
                setLoading(false);
                setData({ results: [], total: 0, totalPages: 1 });
            }
        };

        fetchResults();
    }, [propertyType, transactionType, page, city, state, minPrice, maxPrice, projectType]);

    return (
        <>
            <Navbar />
            <div className='min-h-screen px-4 md:px-8 mt-14 md:mt-18 bg-gray-50'>
                <div className='flex flex-col lg:flex-row py-8'>
                    <div className='w-full  hidden lg:block lg:w-80 xl:w-96 shrink-0'>
                        <SideMenu />
                    </div>

                    <main className='flex-1 md:ml-10'>
                        <header className='mb-8 pb-6 border-b border-gray-200'>
                            <div className='flex items-center gap-4 mb-4'>
                                <FiMapPin className='text-2xl text-blue-600' />
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                                    {city !== 'Any City' ? `${city} ${projectType ? "Projects" : "Properties"}` : 'All Listings'}
                                </h1>
                            </div>
                            <p className='text-sm md:text-base text-gray-500 flex items-center gap-2'>
                                <FiHome className='text-gray-400' />
                                {transactionType} • {projectType || propertyType}
                            </p>
                        </header>

                        <section className='bg-white p-4 md:p-6 rounded-xl shadow-xs border border-gray-100 mb-8'>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm'>
                                <div className='flex items-center gap-2 p-2 md:p-3 bg-gray-50 rounded-lg'>
                                    <FiLayers className='text-gray-500' />
                                    <div>
                                        <p className='text-[10px] md:text-xs text-gray-400'>{projectType ? "Project Type" : "Property Type"}</p>
                                        <p className='text-sm md:text-base font-medium'>{projectType || propertyType}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 p-2 md:p-3 bg-gray-50 rounded-lg'>
                                    <span className="text-gray-500">₹</span>
                                    <div>
                                        <p className='text-[10px] md:text-xs text-gray-400'>Transaction Type</p>
                                        <p className='text-sm md:text-base font-medium'>{transactionType}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 p-2 md:p-3 bg-gray-50 rounded-lg'>
                                    <FiMapPin className='text-gray-500' />
                                    <div>
                                        <p className='text-[10px] md:text-xs text-gray-400'>Location</p>
                                        <p className='text-sm md:text-base font-medium'>{city}, {state}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 p-2 md:p-3 bg-gray-50 rounded-lg'>
                                    <FiLayers className='text-gray-500' />
                                    <div>
                                        <p className='text-[10px] md:text-xs text-gray-400'>Page</p>
                                        <p className='text-sm md:text-base font-medium'>#{page}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {loading ? (
                            <div className='space-y-6'>
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className='bg-white p-6 rounded-xl shadow-xs border border-gray-100 animate-pulse'>
                                        <div className='flex gap-4'>
                                            <div className='w-32 h-32 bg-gray-200 rounded-lg' />
                                            <div className='flex-1 space-y-3'>
                                                <div className='h-4 bg-gray-200 rounded w-3/4' />
                                                <div className='h-3 bg-gray-200 rounded w-1/2' />
                                                <div className='h-3 bg-gray-200 rounded w-2/3' />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='grid grid-cols-2 gap-4 md:grid-cols-1 md:space-y-6'>
                                {data?.results?.length > 0 ? (
                                    <>
                                        {data.results.map((result, index) => (
                                            !projectType ?
                                                <article
                                                    key={index}
                                                    className='bg-white p-2 md:p-6 rounded-xl shadow-xs hover:shadow-md transition-shadow border border-gray-100'
                                                >
                                                    <div className='flex flex-col md:flex-row gap-2 md:gap-10'>
                                                        <div className='w-full h-32 md:w-32 md:h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden'>
                                                            {result?.propertyMedia?.photos?.[0] && (
                                                                <img
                                                                    src={`${process.env.REACT_APP_backendUrl}/storage/${result.propertyMedia.photos[0]}`}
                                                                    className='w-full h-full object-cover'
                                                                    alt={result?.propertyTitle || 'Property image'}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='flex-1'>
                                                            <h3 className='text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-2'>
                                                                {result?.propertyTitle || 'Untitled Property'}
                                                            </h3>
                                                            <div className='flex flex-col gap-1 md:gap-4 text-xs md:text-sm text-gray-600'>
                                                                <span className='flex text-xs md:text-sm items-center gap-1 md:gap-2'>
                                                                    <span className="hidden md:block">₹</span>
                                                                    
                                                                     {result?.pricingDetails?.salePrice || result?.pricingDetails?.rent || result?.pricingDetails?.pgPrice}
                                                                </span>
                                                                <span className='flex text-xs md:text-sm items-center gap-1 md:gap-2'>
                                                                    <FiHome className='hidden md:block text-gray-400' />
                                                                    {result?.propertyDetailSchemaId?.refId?.areaDetails?.plotArea ?
                                                                        `${result.propertyDetailSchemaId.refId.areaDetails.plotArea} ${result.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}` :
                                                                        result?.propertyDetailSchemaId?.refId?.areaDetails?.carpetArea ?
                                                                            `${result.propertyDetailSchemaId.refId.areaDetails.carpetArea} ${result.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet}` :
                                                                            'N/A'}
                                                                </span>
                                                                <span className='flex text-xs md:text-sm items-center gap-1 md:gap-2'>
                                                                    <FiMapPin className='hidden md:block text-gray-400' />
                                                                    {`${result?.locationSchemaId?.apartmentSociety || ''}, ${result?.locationSchemaId?.city || ''}, ${result?.locationSchemaId?.state || ''}`}
                                                                </span>
                                                            </div>
                                                            <div className='flex flex-col md:flex-row md:gap-4'>
                                                                <button className='hidden md:block mt-2 w-full text-xs md:text-sm md:mt-4 bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors' 
                                                                        onClick={() => navigate(`/property-profile?propertyId=${result._id}`)}>
                                                                    View Property
                                                                </button>
                                                                <button className='mt-2 w-full md:mt-4 border-2 text-blue-600 border-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm hover:bg-blue-700 hover:text-white transition-colors'>
                                                                    Enquire Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article> :
                                                <article
                                                    key={index}
                                                    className='bg-white p-2 md:p-6 rounded-xl shadow-xs hover:shadow-md transition-shadow border border-gray-100'
                                                >
                                                    <div className='flex flex-col md:flex-row gap-2 md:gap-10'>
                                                        <div className='w-full h-32 md:w-32 md:h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden'>
                                                            {result?.images?.[0] && (
                                                                <img
                                                                    src={`${process.env.REACT_APP_backendUrl}/storage/${result.images[0]}`}
                                                                    className='w-full h-full object-cover'
                                                                    alt={result?.projectName || 'Project image'}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='flex-1'>
                                                            <h3 className='text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-2'>
                                                                {result?.projectName || 'Untitled Project'}
                                                            </h3>
                                                            {result?.isUpcoming && <div className='flex gap-2 md:gap-4 mb-2 md:mb-4'>
                                                                <span className='bg-blue-100 text-blue-600 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-xs'>
                                                                    Upcoming
                                                                </span>
                                                            </div>}
                                                            <div className='flex flex-col gap-1 md:gap-4 text-xs md:text-sm text-gray-600'>
                                                                <span className='flex text-xs md:text-sm items-center gap-1 md:gap-2'>
                                                                    <FiLayers className='hidden md:block text-gray-400' />
                                                                    {`${result?.totalUnits ?? 'N/A'} units (${result?.availableUnits ?? 'N/A'} available)`}
                                                                </span>
                                                                <span className='flex text-xs md:text-sm items-center gap-1 md:gap-2'>
                                                                    <FiHome className='hidden md:block text-gray-400' />
                                                                    {result?.projectType || 'N/A'}
                                                                </span>
                                                                <span className='flex text-xs md:text-sm items-center gap-1 md:gap-2'>
                                                                    <FiMapPin className='hidden md:block text-gray-400' />
                                                                    {`${result?.location?.locality || ''}, ${result?.location?.city || ''}, ${result?.location?.state || ''}`}
                                                                </span>
                                                            </div>
                                                            <div className='flex flex-col md:flex-row md:gap-4'>
                                                                <button className='hidden md:block mt-2 w-full text-xs md:text-sm md:mt-4 bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                                                                    View Project
                                                                </button>
                                                                <button className='mt-2 w-full md:mt-4 border-2 text-blue-600 border-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm hover:bg-blue-700 hover:text-white transition-colors'>
                                                                    Enquire Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                        ))}

                                        <div className="col-span-2 flex justify-center gap-2 mt-4 md:mt-8">
                                            <button
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page === 1}
                                                className={`px-2 py-1 md:px-4 md:py-2 flex items-center gap-1 md:gap-2 rounded-lg text-xs md:text-base ${page === 1
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                            >
                                                <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                                Previous
                                            </button>

                                            <span className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base text-gray-600">
                                                Page {page} of {data?.totalPages || 1}
                                            </span>

                                            <button
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page >= (data?.totalPages || 1)}
                                                className={`px-2 py-1 md:px-4 md:py-2 flex items-center gap-1 md:gap-2 rounded-lg text-xs md:text-base ${page >= (data?.totalPages || 1)
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                            >
                                                Next
                                                <FiChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className='col-span-2 flex flex-col items-center justify-center h-96 gap-4 text-center'>
                                        <FiHome className='text-4xl text-gray-300' />
                                        <div className='space-y-2'>
                                            <h3 className='text-lg md:text-xl font-semibold text-gray-900'>No matching properties found</h3>
                                            <p className='text-gray-500 text-sm'>Try adjusting your filters or search location</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}

export default SearchResults