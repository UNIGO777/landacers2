import { FaUser, FaUserTie, FaUserSecret } from "react-icons/fa"

const UsersData = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "user",
    favoriteProperties: ["prop1", "prop2"],
    sellingProperties: ["prop3"],
    buyingProperties: ["prop4", "prop5"],
    queries: ["query1"],
    createdAt: "2023-01-15T10:30:00Z",
    isBlocked: false,
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "9876543210",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    role: "admin",
    favoriteProperties: ["prop6", "prop7", "prop8"],
    sellingProperties: [],
    buyingProperties: ["prop9"],
    queries: ["query2", "query3"],
    createdAt: "2023-02-20T14:45:00Z",
    isBlocked: false,
  },
  {
    _id: "3",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "5551234567",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "user",
    favoriteProperties: ["prop10"],
    sellingProperties: ["prop11", "prop12"],
    buyingProperties: [],
    queries: [],
    createdAt: "2023-03-10T09:15:00Z",
    isBlocked: true,
  },
  {
    _id: "4",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    phoneNumber: "7778889999",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    role: "user",
    favoriteProperties: [],
    sellingProperties: ["prop13"],
    buyingProperties: ["prop14", "prop15"],
    queries: ["query4"],
    createdAt: "2023-04-05T16:30:00Z",
    isBlocked: false,
  },
  {
    _id: "5",
    firstName: "Emma",
    lastName: "Brown",
    email: "emma.brown@example.com",
    phoneNumber: "3334445555",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
    role: "superadmin",
    favoriteProperties: ["prop16", "prop17"],
    sellingProperties: ["prop18", "prop19"],
    buyingProperties: ["prop20"],
    queries: ["query5", "query6", "query7"],
    createdAt: "2023-05-12T11:00:00Z",
    isBlocked: false,
  },
]

const getRoleIcon = (role) => {
  switch (role) {
    case "admin":
      return FaUserTie
    case "superadmin":
      return FaUserSecret
    default:
      return FaUser
  }
}

export { UsersData, getRoleIcon }


