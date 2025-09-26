import { useState } from "react"
import { FaEye } from "react-icons/fa"
import { format } from "date-fns"

const payments = [
  {
    id: "PAY001",
    customerName: "John Doe",
    propertyName: "Luxury Villa",
    amount: "$2,500",
    status: "Completed",
    date: "2023-06-15T10:30:00Z",
  },
  {
    id: "PAY003",
    customerName: "Mike Johnson",
    propertyName: "Beach House",
    amount: "$3,000",
    status: "Completed",
    date: "2023-06-13T09:15:00Z",
  },
  {
    id: "PAY005",
    customerName: "Emily Brown",
    propertyName: "City Apartment",
    amount: "$1,800",
    status: "Completed",
    date: "2023-06-11T11:45:00Z",
  },
  {
    id: "PAY007",
    customerName: "David Wilson",
    propertyName: "Suburban House",
    amount: "$2,200",
    status: "Completed",
    date: "2023-06-09T14:30:00Z",
  },
]

const RecentPayments = () => {
  const [dateFilter, setDateFilter] = useState("")

  const filteredPayments = dateFilter ? payments.filter((payment) => payment.date.startsWith(dateFilter)) : payments

  return (
    <div className="p-6 mt-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Completed Payments</h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-blue-600">{filteredPayments.length}</span> completed payments
          </p>
        </div>
        <div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                Payment ID
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                Customer
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                Property
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="transition-colors duration-200 hover:bg-gray-50">
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-gray-900">{payment.id}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-600">{payment.customerName}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-600">{payment.propertyName}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-gray-900">{payment.amount}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-600">{format(new Date(payment.date), "MMM dd, yyyy")}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 transition-colors duration-200 hover:text-blue-600">
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentPayments

