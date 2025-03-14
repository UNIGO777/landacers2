import React, { useState } from "react"
import Layout from "../Layout"
import ComingSoon from "../../../components/ComingSoon"
import { FaMoneyBillWave } from "react-icons/fa"

const mockPayments = [
  {
    id: "1",
    userId: "user1",
    brokerId: "broker1",
    amount: 1000,
    currency: "USD",
    paymentDate: new Date("2023-05-01"),
    transactionId: "tx123",
    paymentMethod: "card",
    status: "completed",
    description: "Property purchase",
  },
  {
    id: "2",
    userId: "user2",
    brokerId: null,
    amount: 500,
    currency: "USD",
    paymentDate: new Date("2023-05-02"),
    transactionId: "tx124",
    paymentMethod: "UPI",
    status: "pending",
    description: "Booking fee",
  },
  // Add more mock data as needed
]

const PaymentPage = () => {
  const [paymentType, setPaymentType] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("all")

  const filteredPayments = mockPayments.filter((payment) => {
    const typeMatch =
      paymentType === "all" ||
      (paymentType === "user" && !payment.brokerId) ||
      (paymentType === "broker" && payment.brokerId)
    const statusMatch = paymentStatus === "all" || payment.status === paymentStatus
    const dateMatch =
      (!startDate || payment.paymentDate >= new Date(startDate)) &&
      (!endDate || payment.paymentDate <= new Date(endDate))
    return typeMatch && statusMatch && dateMatch
  })

  return (
    <Layout>
    <div className="container p-2 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Payment Management</h1>
      <div className="flex flex-col gap-4 mb-4 md:flex-row">
        <select className="p-2 border rounded" onChange={(e) => setPaymentType(e.target.value)}>
          <option value="all">All Payments</option>
          <option value="user">User Payments</option>
          <option value="broker">Broker Payments</option>
        </select>
        <div className="flex gap-2">
          <input type="date" className="p-2 border rounded" onChange={(e) => setStartDate(e.target.value)} />
          <span className="self-center">to</span>
          <input type="date" className="p-2 border rounded" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <select className="p-2 border rounded" onChange={(e) => setPaymentStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
      
      {/* Replacing the table with ComingSoon component */}
      <ComingSoon 
        title="Payment Management Coming Soon" 
        message="We're currently developing our payment tracking and management system. Stay tuned for updates!" 
        icon={FaMoneyBillWave}
      />
      
      {/* Original table code is commented out below for reference */}
      {/*
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">User/Broker</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Method</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-3 text-left whitespace-nowrap">{payment.transactionId}</td>
                <td className="px-6 py-3 text-left">
                  {payment.brokerId ? `Broker (${payment.brokerId})` : `User (${payment.userId})`}
                </td>
                <td className="px-6 py-3 text-left">
                  {payment.amount} {payment.currency}
                </td>
                <td className="px-6 py-3 text-left">{payment.paymentDate.toLocaleDateString()}</td>
                <td className="px-6 py-3 text-left">{payment.paymentMethod}</td>
                <td className="px-6 py-3 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : payment.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : payment.status === "failed"
                            ? "bg-red-200 text-red-800"
                            : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-left">{payment.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      */}
    </div>
    </Layout>
  )
}

export default PaymentPage

