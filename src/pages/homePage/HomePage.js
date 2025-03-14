import React, { useState, useRef } from 'react'
import Banner from '../../components/banner/Banner'
import ImageList from '../../components/imageList/ImageList';
import { cardsData, images } from '../../tempData/data'
import SreenCarosel from '../../components/FullScreenCarosel/FullScreenCarosel';
import UpcommingProjectsData from '../../Assets/StaticData/UpcomingProjects';
import ServiceBaner from '../../components/ServiceBaner/ServiceBaner';
import Services from '../../Miner components/Services/Services';
import Card from '../../components/card/Card';
import CardCarousel from '../../components/cardCarousel/CardCarousel';
import axios from 'axios';
import CardCarosel from '../../components/loaders/CardCarouselLoader';

const backend_url = process.env.REACT_APP_backendUrl

function HomePage() {
  const [Featuredproperties, setFeaturedProperties] = React.useState([]);
  const [UpcommingProjects, setUpcommingProjects] = React.useState([])
  const [FeaturedProjects, setFeaturedProjects] = React.useState([])

  
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_backendUrl}/api/feature-items?itemType=Property`)
      .then(res => setFeaturedProperties(res.data.data))
      .catch(err => console.error('Error fetching featured properties:', err));

      axios.get(`${process.env.REACT_APP_backendUrl}/api/feature-items?itemType=Project&upcomming=true`)
      .then(res => setUpcommingProjects(res.data.data))
      .catch(err => console.error('Error fetching upcomming featured properties:', err));

      axios.get(`${process.env.REACT_APP_backendUrl}/api/feature-items?itemType=Project`)
      .then(res => setFeaturedProjects(res.data.data))
      .catch(err => console.error('Error fetching upcomming featured properties:', err));
  }, []);
 

  return (
    <>
      <Banner />
      
      {Featuredproperties.length > 0 ? <CardCarousel 
        title="Our Featured Properties"
        className="mt-10 px-3 md:px-10 pb-5 md:pb-10"
      >
        {Array.isArray(Featuredproperties) && Featuredproperties.map((card, index) => (
          <div key={index} className="px-2">
            <Card
              card={{
                // image: `${backend_url}/storage/${card.itemId.propertyMedia.photos[0]}`,
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                title: card.itemId.propertyTitle,
                price: card?.itemId?.pricingDetails ? 
                  card.itemId?.transactionType === "Sell" ? 
                    card?.itemId?.pricingDetails?.salePrice : 
                  card.itemId?.transactionType === "Rent" ? 
                    card?.itemId?.pricingDetails?.rent : 
                    card?.itemId?.pricingDetails?.pgPrice : "upcomming",
                location: `${card?.itemId?.locationSchemaId.locality}, ${card?.itemId?.locationSchemaId.city}`,
                _id: card?.itemId?._id,
                transactionType: card.itemId.transactionType
              }}
            />
          </div>
        ))}
      </CardCarousel> : <CardCarosel/>}

      <div className='flex flex-col md:flex-row w-full md:px-10 '>
        <SreenCarosel Title={"Upcomming Featured Projects"} className={'md:w-1/2'} description="Explore our latest upcoming projects that offer modern living spaces and exceptional amenities." data={UpcommingProjects} />
        <br />
        <SreenCarosel Title={"Our Best Projects"} className={'md:w-1/2'} description="Discover our premium portfolio of completed projects showcasing architectural excellence, luxurious amenities." data={FeaturedProjects} />
      </div>

      <ServiceBaner Title="Sell or Rent your property faster with LandsAcers" description="Sell Lands/Plots/FarmHouse property" SubTitle="Register to post your property" buttonDescription="Post Your property Now" image="https://images.unsplash.com/photo-1713322957180-5a7d9ef6ebc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <br />
      <Services />

      <ServiceBaner
        demantionChange
        Title="Become a Broker with Us"
        description="Join our team and unlock the potential to earn by connecting buyers and sellers in the real estate market. As a broker, you will have access to exclusive listings, training, and support to help you succeed."
        SubTitle="Register today to start your journey with us as a real estate broker"
        buttonDescription="Join Us Now"
        image="https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <ImageList
        heading="Image Gallery"
        paragraph="Here are some amazing images for you to enjoy!"
        images={images}
      />
    </>
  )
}

export default HomePage