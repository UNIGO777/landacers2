import React from "react"

const PropertyCard = ({ title, price, location, thumbnail, type, status }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="relative h-48">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
        <div className="absolute top-2 right-2">
          <span
            className={`
            px-2 py-1 text-xs font-semibold rounded-full
            ${
              status === "Available"
                ? "bg-green-100 text-green-800"
                : status === "Under Contract"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
            }
          `}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">{location}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">₹{price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{type}</span>
        </div>
      </div>
    </div>
  )
}

