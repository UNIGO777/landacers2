const brokerRequests = [
  {
    id: "BR001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    experience: 5,
    specialization: "Residential Properties",
    registrationDate: "2023-06-01T10:30:00Z",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "BR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    experience: 8,
    specialization: "Commercial Properties",
    registrationDate: "2023-05-28T14:45:00Z",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "BR003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 246-8135",
    experience: 3,
    specialization: "Luxury Homes",
    registrationDate: "2023-06-02T09:15:00Z",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "BR004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 369-2580",
    experience: 6,
    specialization: "Vacation Rentals",
    registrationDate: "2023-05-30T11:00:00Z",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "BR005",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 159-7531",
    experience: 4,
    specialization: "Industrial Properties",
    registrationDate: "2023-06-03T16:20:00Z",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export function getBrokerRequests() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(brokerRequests);
    }, 500); // Simulating API delay
  });
}
