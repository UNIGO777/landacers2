const brokersData = [
    {
      _id: "1",
      firstName: "Amit",
      lastName: "Sharma",
      email: "amit.sharma@example.com",
      phoneNumber: "+91 98765 43210",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "approved",
      documents: {
        aadharCard: { url: "/placeholder.svg", uploadedAt: "2024-01-10T00:00:00.000Z" },
        panCard: { url: "/placeholder.svg", uploadedAt: "2024-01-10T00:00:00.000Z" }
      },
      sellingProperties: [
        {
          _id: "p1",
          title: "Luxury Apartment",
          price: 22000000,
          location: "Mumbai, Maharashtra",
          thumbnail: "https://source.unsplash.com/400x300/?apartment",
          type: "Residential",
          status: "Available"
        }
      ],
      totalSoldProperties: 10,
      totalBoughtProperties: 5,
      totalRevenue: 55000000,
      isActive: true,
      isVerified: true,
      createdAt: "2024-01-10T00:00:00.000Z",
      subscriptionPlan: { planName: "Premium", price: 9999, startDate: "2024-01-10T00:00:00.000Z", endDate: "2025-01-10T00:00:00.000Z", status: "active" }
    },
    {
      _id: "2",
      firstName: "Priya",
      lastName: "Kapoor",
      email: "priya.kapoor@example.com",
      phoneNumber: "+91 98654 12345",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
      status: "approved",
      documents: {
        aadharCard: { url: "/placeholder.svg", uploadedAt: "2023-12-15T00:00:00.000Z" },
        panCard: { url: "/placeholder.svg", uploadedAt: "2023-12-15T00:00:00.000Z" }
      },
      sellingProperties: [
        {
          _id: "p3",
          title: "Modern Office Space",
          price: 18000000,
          location: "Bangalore, Karnataka",
          thumbnail: "https://source.unsplash.com/400x300/?office",
          type: "Commercial",
          status: "Under Contract"
        }
      ],
      totalSoldProperties: 12,
      totalBoughtProperties: 6,
      totalRevenue: 72000000,
      isActive: true,
      isVerified: true,
      createdAt: "2023-12-15T00:00:00.000Z",
      subscriptionPlan: { planName: "Standard", price: 5999, startDate: "2023-12-15T00:00:00.000Z", endDate: "2024-12-15T00:00:00.000Z", status: "active" }
    },
    {
      _id: "3",
      firstName: "Rahul",
      lastName: "Verma",
      email: "rahul.verma@example.com",
      phoneNumber: "+91 99543 56789",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
      status: "approved",
      documents: {
        aadharCard: { url: "/placeholder.svg", uploadedAt: "2024-02-01T00:00:00.000Z" },
        panCard: { url: "/placeholder.svg", uploadedAt: "2024-02-01T00:00:00.000Z" }
      },
      sellingProperties: [
        {
          _id: "p5",
          title: "Penthouse Suite",
          price: 30000000,
          location: "Delhi, NCR",
          thumbnail: "https://source.unsplash.com/400x300/?penthouse",
          type: "Residential",
          status: "Available"
        }
      ],
      totalSoldProperties: 8,
      totalBoughtProperties: 3,
      totalRevenue: 40000000,
      isActive: true,
      isVerified: true,
      createdAt: "2024-02-01T00:00:00.000Z",
      subscriptionPlan: { planName: "Premium", price: 9999, startDate: "2024-02-01T00:00:00.000Z", endDate: "2025-02-01T00:00:00.000Z", status: "active" }
    },
    {
      _id: "4",
      firstName: "Neha",
      lastName: "Rao",
      email: "neha.rao@example.com",
      phoneNumber: "+91 98432 34567",
      profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
      status: "approved",
      documents: {
        aadharCard: { url: "/placeholder.svg", uploadedAt: "2024-01-20T00:00:00.000Z" },
        panCard: { url: "/placeholder.svg", uploadedAt: "2024-01-20T00:00:00.000Z" }
      },
      sellingProperties: [
        {
          _id: "p7",
          title: "Retail Showroom",
          price: 15000000,
          location: "Hyderabad, Telangana",
          thumbnail: "https://source.unsplash.com/400x300/?shop",
          type: "Commercial",
          status: "Sold"
        }
      ],
      totalSoldProperties: 5,
      totalBoughtProperties: 2,
      totalRevenue: 25000000,
      isActive: true,
      isVerified: true,
      createdAt: "2024-01-20T00:00:00.000Z",
      subscriptionPlan: { planName: "Basic", price: 3999, startDate: "2024-01-20T00:00:00.000Z", endDate: "2025-01-20T00:00:00.000Z", status: "active" }
    },
    {
      _id: "5",
      firstName: "Vikas",
      lastName: "Gupta",
      email: "vikas.gupta@example.com",
      phoneNumber: "+91 91234 56789",
      profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
      status: "approved",
      documents: {
        aadharCard: { url: "/placeholder.svg", uploadedAt: "2023-12-30T00:00:00.000Z" },
        panCard: { url: "/placeholder.svg", uploadedAt: "2023-12-30T00:00:00.000Z" }
      },
      sellingProperties: [
        {
          _id: "p9",
          title: "Luxury Farmhouse",
          price: 40000000,
          location: "Pune, Maharashtra",
          thumbnail: "https://source.unsplash.com/400x300/?farmhouse",
          type: "Residential",
          status: "Available"
        }
      ],
      totalSoldProperties: 15,
      totalBoughtProperties: 10,
      totalRevenue: 100000000,
      isActive: true,
      isVerified: true,
      createdAt: "2023-12-30T00:00:00.000Z",
      subscriptionPlan: { planName: "Premium", price: 9999, startDate: "2023-12-30T00:00:00.000Z", endDate: "2024-12-30T00:00:00.000Z", status: "active" }
    }
  ];
  
  // Add more brokers until the count reaches 20
  
  export { brokersData };
  