import { FaHome, FaTree, FaMapMarkerAlt } from "react-icons/fa"

const PropertiesData = [
  {
    _id: "1",
    title: "Luxurious Farmhouse with Mountain View",
    description: "A beautiful farmhouse surrounded by nature, perfect for a peaceful getaway.",
    location: {
      state: "California",
      district: "Napa County",
      city: "Napa",
      locality: "Silverado Trail",
      pincode: "94558",
    },
    type: "farmhouse",
    status: "available",
    ownerType: "Broker",
    owner: "user123",
    views: 1250,
    queries: ["query1", "query2"],
    isUpcoming: false,
    thumbnailImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    totalInquiries: 45,
    isFeatured: false,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    totalFloors: 2,
    furnishedStatus: "Fully Furnished",
    coveredArea: 3500,
    carpetArea: 3000,
    plotArea: 10000,
    transactionType: "Resale",
    possessionStatus: "Ready to Move",
    priceDetails: {
      totalPrice: 2500000,
      pricePerSqFt: 714,
      bookingAmount: 250000,
      maintenanceCharges: 5000,
    },
  },
  {
    _id: "2",
    title: "Scenic Land Plot with River Access",
    description: "A large plot of land with beautiful views and private river access.",
    location: {
      state: "Colorado",
      district: "Summit County",
      city: "Breckenridge",
      locality: "Blue River",
      pincode: "80424",
    },
    type: "land",
    status: "available",
    ownerType: "User",
    owner: "user456",
    views: 890,
    queries: ["query3"],
    isUpcoming: false,
    thumbnailImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    totalInquiries: 30,
    isFeatured: true,
    createdAt: "2023-02-20T00:00:00.000Z",
    updatedAt: "2023-05-15T00:00:00.000Z",
    numberOfOpenSides: 3,
    widthOfRoadFacing: 40,
    constructionStatus: false,
    boundaryWallStatus: true,
    gatedColonyStatus: false,
    plotArea: 50000,
    length: 250,
    breadth: 200,
    cornerPlotStatus: true,
    transactionType: "New Property",
    priceDetails: {
      totalPrice: 1200000,
      pricePerSqYrd: 216,
      bookingAmount: 120000,
    },
  },
  {
    _id: "3",
    title: "Prime Development Plot in Growing Neighborhood",
    description: "A strategically located plot perfect for residential or commercial development.",
    location: {
      state: "Texas",
      district: "Travis County",
      city: "Austin",
      locality: "East Austin",
      pincode: "78702",
    },
    type: "plot",
    status: "upcoming",
    ownerType: "Admin",
    owner: "admin789",
    views: 1560,
    queries: [],
    isUpcoming: true,
    upcomingDetails: {
      expectedLaunchDate: "2023-09-01",
      developerName: "Austin Developments Inc.",
      priceRange: {
        min: 750000,
        max: 1000000,
      },
      highlights: ["Prime location", "Excellent investment opportunity", "Flexible zoning"],
    },
    thumbnailImage:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      "https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    ],
    totalInquiries: 0,
    isFeatured: false,
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
    totalPlotArea: 100000,
    availablePlotArea: 100000,
    transactionType: "New Development",
    cornerPlotStatus: false,
    roadFacingWidth: 60,
    priceDetails: {
      totalPrice: 800000,
      pricePerSqFt: 80,
      bookingAmount: 80000,
    },
    additionalFeatures: ["Near public transportation", "Close to schools and shopping centers"],
  },
]

const getTypeIcon = (type) => {
  switch (type) {
    case "land":
      return FaTree
    case "farmhouse":
      return FaHome
    case "plot":
      return FaMapMarkerAlt
    default:
      return FaHome
  }
}

export { getTypeIcon, PropertiesData }

