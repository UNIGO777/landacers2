export const cardsData = [
    {
      _id: '1',
      title: 'Land Plot in New York',
      description: 'A beautiful land plot located in the heart of New York, perfect for your dream home.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 4.5, 
      location: {
        state: 'New York',
        district: 'Manhattan',
        city: 'New York City',
        locality: 'Upper East Side',
        pincode: '10021',
      },
      createdAt: '2023-10-01T12:00:00Z',
      ownerName: 'John Doe',
      type: 'land',
      plotDetails: {
        area: '5000 sq ft',
        price: 150000,
        transactionType: 'New Property',
        numberOfOpenSides: 2,
        widthOfRoadFacing: 30,
        constructionStatus: false,
        boundaryWallStatus: true,
        gatedColonyStatus: false,
      },
      brokerDetails: {
        profilePicture: "",
        name: 'Broker A',
        contact: 'brokerA@example.com',
        phone: '123-456-7890',
        properties: 1000
      },
      moreImages: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ],
      video: 'https://example.com/video1.mp4'
    },
    {
      _id: '2',
      title: 'Farmhouse in Los Angeles',
      description: 'Charming farmhouse with modern amenities located in Los Angeles.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 3.8, 
      location: {
        state: 'California',
        district: 'Los Angeles',
        city: 'Los Angeles',
        locality: 'Beverly Hills',
        pincode: '90210',
      },
      createdAt: '2023-10-02T12:00:00Z',
      ownerName: 'Jane Smith',
      type: 'farmhouse',
      farmhouseDetails: {
        numberOfBedrooms: 3,
        numberOfBathrooms: 2,
        totalFloors: 1,
        price: 350000,
        transactionType: 'Resale',
        furnishedStatus: 'Fully Furnished',
        coveredArea: 2000,
        carpetArea: 1800,
        plotArea: 3000,
        possessionStatus: 'Ready to Move',
        priceDetails: {
          totalPrice: 350000,
          pricePerSqFt: 175,
          bookingAmount: 35000,
          maintenanceCharges: 200,
        },
      },
      userDetails: {
        name: 'User A',
        contact: 'userA@example.com',
        phone: '987-654-3210'
      },
      moreImages: [
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg'
      ],
      video: 'https://example.com/video2.mp4'
    },
    {
      _id: '3',
      title: 'Land Plot in Chicago',
      description: 'Spacious land plot available for sale in Chicago, ideal for investment.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 4.0, 
      location: {
        state: 'Illinois',
        district: 'Cook',
        city: 'Chicago',
        locality: 'Lincoln Park',
        pincode: '60614',
      },
      createdAt: '2023-10-03T12:00:00Z',
      ownerName: 'Alice Johnson',
      type: 'land',
      plotDetails: {
        area: '7000 sq ft',
        price: 200000,
        transactionType: 'New Property',
        numberOfOpenSides: 3,
        widthOfRoadFacing: 40,
        constructionStatus: false,
        boundaryWallStatus: false,
        gatedColonyStatus: true,
      },
      brokerDetails: {
        name: 'Broker B',
        contact: 'brokerB@example.com',
        phone: '234-567-8901'
      },
      moreImages: [
        'https://example.com/image5.jpg',
        'https://example.com/image6.jpg'
      ],
      video: 'https://example.com/video3.mp4'
    },
    {
      _id: '4',
      title: 'Luxury Farmhouse in San Francisco',
      description: 'A luxurious farmhouse with stunning views in San Francisco.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 5.0, 
      location: {
        state: 'California',
        district: 'San Francisco',
        city: 'San Francisco',
        locality: 'Nob Hill',
        pincode: '94109',
      },
      createdAt: '2023-10-04T12:00:00Z',
      ownerName: 'Bob Brown',
      type: 'farmhouse',
      farmhouseDetails: {
        numberOfBedrooms: 5,
        numberOfBathrooms: 4,
        totalFloors: 2,
        price: 850000,
        transactionType: 'New Booking',
        furnishedStatus: 'Semi-Furnished',
        coveredArea: 3000,
        carpetArea: 2500,
        plotArea: 5000,
        possessionStatus: 'Under Construction',
        priceDetails: {
          totalPrice: 850000,
          pricePerSqFt: 283,
          bookingAmount: 85000,
          maintenanceCharges: 500,
        },
      },
      userDetails: {
        name: 'User B',
        contact: 'userB@example.com',
        phone: '321-654-0987'
      },
      moreImages: [
        'https://example.com/image7.jpg',
        'https://example.com/image8.jpg'
      ],
      video: 'https://example.com/video4.mp4'
    },
    {
      _id: '5',
      title: 'Land Plot in Miami',
      description: 'Prime land plot available in Miami, perfect for development.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 4.2, 
      location: {
        state: 'Florida',
        district: 'Miami-Dade',
        city: 'Miami',
        locality: 'Coral Gables',
        pincode: '33134',
      },
      createdAt: '2023-10-05T12:00:00Z',
      ownerName: 'Charlie Davis',
      type: 'land',
      plotDetails: {
        area: '6000 sq ft',
        price: 180000,
        transactionType: 'New Property',
        numberOfOpenSides: 1,
        widthOfRoadFacing: 25,
        constructionStatus: false,
        boundaryWallStatus: true,
        gatedColonyStatus: false,
      },
      brokerDetails: {
        name: 'Broker C',
        contact: 'brokerC@example.com',
        phone: '456-789-0123'
      },
      moreImages: [
        'https://example.com/image9.jpg',
        'https://example.com/image10.jpg'
      ],
      video: 'https://example.com/video5.mp4'
    },
    {
      _id: '6',
      title: 'Cozy Farmhouse in Seattle',
      description: 'A cozy farmhouse with a large garden in Seattle.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 3.5, 
      location: {
        state: 'Washington',
        district: 'King',
        city: 'Seattle',
        locality: 'Capitol Hill',
        pincode: '98102',
      },
      createdAt: '2023-10-06T12:00:00Z',
      ownerName: 'Diana Evans',
      type: 'farmhouse',
      farmhouseDetails: {
        numberOfBedrooms: 2,
        numberOfBathrooms: 1,
        totalFloors: 1,
        price: 250000,
        transactionType: 'Lease',
        furnishedStatus: 'Unfurnished',
        coveredArea: 1500,
        carpetArea: 1200,
        plotArea: 2000,
        possessionStatus: 'Ready to Move',
        priceDetails: {
          totalPrice: 250000,
          pricePerSqFt: 167,
          bookingAmount: 25000,
          maintenanceCharges: 150,
        },
      },
      userDetails: {
        name: 'User C',
        contact: 'userC@example.com',
        phone: '654-321-0987'
      },
      moreImages: [
        'https://example.com/image11.jpg',
        'https://example.com/image12.jpg'
      ],
      video: 'https://example.com/video6.mp4'
    },
    {
      _id: '7',
      title: 'Land Plot in Austin',
      description: 'A great investment opportunity with this land plot in Austin.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 4.8, 
      location: {
        state: 'Texas',
        district: 'Travis',
        city: 'Austin',
        locality: 'Downtown',
        pincode: '78701',
      },
      createdAt: '2023-10-07T12:00:00Z',
      ownerName: 'Ethan Foster',
      type: 'land',
      plotDetails: {
        area: '8000 sq ft',
        price: 220000,
        transactionType: 'New Property',
        numberOfOpenSides: 4,
        widthOfRoadFacing: 50,
        constructionStatus: false,
        boundaryWallStatus: true,
        gatedColonyStatus: true,
      },
      brokerDetails: {
        name: 'Broker D',
        contact: 'brokerD@example.com',
        phone: '789-012-3456'
      },
      moreImages: [
        'https://example.com/image13.jpg',
        'https://example.com/image14.jpg'
      ],
      video: 'https://example.com/video7.mp4'
    },
    {
      _id: '8',
      title: 'Farmhouse in Boston',
      description: 'Beautiful farmhouse with a rustic charm in Boston.',
      image: 'https://i.pinimg.com/originals/a1/98/6d/a1986d724cb9b43539984747f806149b.jpg',
      rating: 4.1, 
      location: {
        state: 'Massachusetts',
        district: 'Suffolk',
        city: 'Boston',
        locality: 'Beacon Hill',
        pincode: '02108',
      },
      createdAt: '2023-10-08T12:00:00Z',
      ownerName: 'Fiona Green',
      type: 'farmhouse',
      farmhouseDetails: {
        numberOfBedrooms: 4,
        numberOfBathrooms: 3,
        totalFloors: 2,
        price: 500000,
        transactionType: 'Resale',
        furnishedStatus: 'Semi-Furnished',
        coveredArea: 2500,
        carpetArea: 2200,
        plotArea: 4000,
        possessionStatus: 'Ready to Move',
        priceDetails: {
          totalPrice: 500000,
          pricePerSqFt: 200,
          bookingAmount: 50000,
          maintenanceCharges: 300,
        },
      },
      userDetails: {
        name: 'User D',
        contact: 'userD@example.com',
        phone: '321-987-6540'
      },
      moreImages: [
        'https://example.com/image15.jpg',
        'https://example.com/image16.jpg'
      ],
      video: 'https://example.com/video8.mp4'
    },
  ];
  
  export const images = [
    { src: 'https://natlands.org/wp-content/uploads/2017/06/IMG_0001_BrynCoed-1-e1496768538220.jpg', name: "Image 1" },
    { src: 'https://photos.zillowstatic.com/fp/8861de4aa5156298cddca9dfd641de87-cc_ft_960.jpg', name: "Image 2" },
    { src: 'https://i.pinimg.com/originals/f0/a5/dd/f0a5dd3b451e1c7199d39dfd4e2cbafc.jpg', name: "Image 3" },
    { src: 'https://th.bing.com/th/id/R.e32d3d4ed84210861177031f6570f0df?rik=vSMxglB18tuhUw&riu=http%3a%2f%2fstatic.materialicious.com%2fimages%2fdream-house-tour-a-beautiful-modern-farmhouse-in-north-carolina-o.jpg&ehk=DhVr0jxH4nCsl8A5TvYUtfmpIcWOLoWYZ477sN2pL98%3d&risl=&pid=ImgRaw&r=0', name: "Image 4" },
    { src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', name: "Image 5" },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', name: "Image 6" },
    { src: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664', name: "Image 7" },
    { src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', name: "Image 8" },
  ];
