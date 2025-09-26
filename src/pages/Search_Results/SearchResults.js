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
    const searchQuery = searchParams.get('searchQuery');
    const isCommercial = searchParams.get('isCommercial');
    const commercialLandType = searchParams.get('commercialLandType') || null;
    const commercialPlotType = searchParams.get('commercialPlotType') || null;
    

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
                    isCommercial: isCommercial || undefined,
                    searchQuery: searchQuery || '',
                    ...(minPrice && { minPrice }),
                    ...(maxPrice && { maxPrice })
                };

                if(commercialLandType) {
                    params.commercialLandType = commercialLandType;
                }
                if(commercialPlotType) {
                    params.commercialPlotType = commercialPlotType;
                }

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
    }, [propertyType, transactionType, page, city, state, minPrice, maxPrice, projectType, searchQuery, isCommercial, commercialLandType, commercialPlotType ]);

    return (
        <>
            <Navbar />
            <div className='min-h-screen px-4 md:px-8 mt-14 md:mt-18 bg-gray-50'>
                <div className='flex flex-col lg:flex-row py-8'>
                    <div className='w-full  hidden lg:block lg:w-80 xl:w-96 shrink-0'>
                        <SideMenu />
                    </div>

                    <main className='flex-1 md:-ml-10 mt-5 md:mt-20'>
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
                            <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6'>                                
                                {data?.results?.length > 0 ? (
                                    <>
                                        {data.results.map((result, index) => (
                                            !projectType ?
                                                <article
                                                    key={index}
                                                    className='bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full'
                                                >
                                                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 h-full'>
                                                        <div className='w-full h-40 sm:h-44 sm:w-36 md:w-40 md:h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden flex-shrink-0'>
                                                            {result?.propertyMedia?.photos?.[0] ? (
                                                                <img
                                                                    src={`${process.env.REACT_APP_backendUrl}/storage/${result.propertyMedia.photos[0]}`}
                                                                    className='w-full h-full object-cover'
                                                                    alt={result?.propertyTitle || 'Property image'}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                                    <FiHome className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex-1 flex flex-col justify-between mt-2 sm:mt-0'>
                                                            <div>
                                                                <h3 className='text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
                                                                    {result?.propertyTitle || 'Untitled Property'}
                                                                </h3>
                                                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 md:gap-3 text-xs md:text-sm text-gray-600 mb-3 md:mb-4'>
                                                                    <span className='flex items-center gap-1 sm:gap-2'>
                                                                        <span className="text-blue-600 font-medium flex items-center">
                                                                            <span className="inline-block">₹</span>
                                                                            <span className="truncate">{result?.pricingDetails?.salePrice || result?.pricingDetails?.rent || result?.pricingDetails?.pgPrice || 'Price on request'}</span>
                                                                        </span>
                                                                    </span>
                                                                    <span className='flex items-center gap-1 sm:gap-2'>
                                                                        <FiHome className='text-gray-400 flex-shrink-0' />
                                                                        <span className="truncate">
                                                                            {result?.propertyDetailSchemaId?.refId?.areaDetails?.plotArea ?
                                                                                `${result.propertyDetailSchemaId.refId.areaDetails.plotArea} ${result.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}` :
                                                                                result?.propertyDetailSchemaId?.refId?.areaDetails?.carpetArea ?
                                                                                    `${result.propertyDetailSchemaId.refId.areaDetails.carpetArea} ${result.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet}` :
                                                                                    'Area N/A'}
                                                                        </span>
                                                                    </span>
                                                                    <span className='flex items-center gap-1 sm:gap-2 col-span-1 sm:col-span-2'>
                                                                        <FiMapPin className='text-gray-400 flex-shrink-0' />
                                                                        <span className="truncate">{`${result?.locationSchemaId?.apartmentSociety || ''}, ${result?.locationSchemaId?.city || ''}, ${result?.locationSchemaId?.state || ''}`}</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col lg:flex-row gap-2 mt-auto w-full'>
                                                                <button 
                                                                    className='flex-1 bg-blue-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium whitespace-nowrap'
                                                                    onClick={() => navigate(`/property-profile?propertyId=${result._id}`)}
                                                                >
                                                                    View Property
                                                                </button>
                                                                <button className='flex-1 border-2 text-blue-600 border-blue-600 px-2 sm:px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap'>
                                                                    Enquire Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article> :
                                                <article
                                                    key={index}
                                                    className='bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full'
                                                >
                                                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 h-full'>
                                                        <div className='w-full h-40 sm:h-44 sm:w-36 md:w-40 md:h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden flex-shrink-0'>
                                                            {result?.images?.[0] ? (
                                                                <img
                                                                    src={`${process.env.REACT_APP_backendUrl}/storage/${result.images[0]}`}
                                                                    className='w-full h-full object-cover'
                                                                    alt={result?.projectName || 'Project image'}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                                    <FiHome className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex-1 flex flex-col justify-between mt-2 sm:mt-0'>
                                                            <div>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                                                    <h3 className='text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-2'>
                                                                        {result?.projectName || 'Untitled Project'}
                                                                    </h3>
                                                                    {result?.isUpcoming && 
                                                                        <span className='bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium w-fit flex-shrink-0'>
                                                                            Upcoming
                                                                        </span>
                                                                    }
                                                                </div>
                                                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 md:gap-3 text-xs md:text-sm text-gray-600 mb-3 md:mb-4'>
                                                                    <span className='flex items-center gap-1 sm:gap-2'>
                                                                        <FiLayers className='text-gray-400 flex-shrink-0' />
                                                                        <span className="truncate">{`${result?.totalUnits ?? 'N/A'} units (${result?.availableUnits ?? 'N/A'} available)`}</span>
                                                                    </span>
                                                                    <span className='flex items-center gap-1 sm:gap-2'>
                                                                        <FiHome className='text-gray-400 flex-shrink-0' />
                                                                        <span className="truncate">{result?.projectType || 'N/A'}</span>
                                                                    </span>
                                                                    <span className='flex items-center gap-1 sm:gap-2 col-span-1 sm:col-span-2'>
                                                                        <FiMapPin className='text-gray-400 flex-shrink-0' />
                                                                        <span className="truncate">{`${result?.locality || ''}, ${result?.city || ''}, ${result?.state || ''}`}</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col xs:flex-row gap-2 mt-auto w-full'>
                                                                <button 
                                                                    className='flex-1 bg-blue-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium whitespace-nowrap'
                                                                    onClick={() => navigate(`/project-profile?projectId=${result._id}`)}
                                                                >
                                                                    View Project
                                                                </button>
                                                                <button className='flex-1 border-2 text-blue-600 border-blue-600 px-2 sm:px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap'>
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
