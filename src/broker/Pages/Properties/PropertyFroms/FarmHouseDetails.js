import { useForm } from "react-hook-form"

export default function FarmhouseDetails({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <input
            {...register("numberOfBedrooms", { required: "Number of bedrooms is required" })}
            type="number"
            placeholder="Number of Bedrooms"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.numberOfBedrooms && <p className="mt-1 text-sm text-red-500">{errors.numberOfBedrooms.message}</p>}
        </div>
        <div>
          <input
            {...register("numberOfBathrooms", { required: "Number of bathrooms is required" })}
            type="number"
            placeholder="Number of Bathrooms"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.numberOfBathrooms && <p className="mt-1 text-sm text-red-500">{errors.numberOfBathrooms.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("totalFloors")}
          type="number"
          placeholder="Total Floors"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <select
          {...register("furnishedStatus", { required: "Furnished status is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Furnished Status</option>
          <option value="Unfurnished">Unfurnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Fully Furnished">Fully Furnished</option>
        </select>
        {errors.furnishedStatus && <p className="mt-1 text-sm text-red-500">{errors.furnishedStatus.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <input
            {...register("coveredArea")}
            type="number"
            placeholder="Covered Area (sq ft)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            {...register("carpetArea")}
            type="number"
            placeholder="Carpet Area (sq ft)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            {...register("plotArea")}
            type="number"
            placeholder="Plot Area (sq ft)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <select
          {...register("transactionType", { required: "Transaction type is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Transaction Type</option>
          <option value="Resale">Resale</option>
          <option value="New Booking">New Booking</option>
          <option value="Lease">Lease</option>
        </select>
        {errors.transactionType && <p className="mt-1 text-sm text-red-500">{errors.transactionType.message}</p>}
      </div>

      <div>
        <select
          {...register("possessionStatus", { required: "Possession status is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Possession Status</option>
          <option value="Under Construction">Under Construction</option>
          <option value="Ready to Move">Ready to Move</option>
        </select>
        {errors.possessionStatus && <p className="mt-1 text-sm text-red-500">{errors.possessionStatus.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <input
            {...register("priceDetails.totalPrice", { required: "Total price is required" })}
            type="number"
            placeholder="Total Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.priceDetails?.totalPrice && (
            <p className="mt-1 text-sm text-red-500">{errors.priceDetails.totalPrice.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("priceDetails.pricePerSqFt")}
            type="number"
            placeholder="Price per Sq Ft"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <input
            {...register("priceDetails.bookingAmount")}
            type="number"
            placeholder="Booking Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            {...register("priceDetails.maintenanceCharges")}
            type="number"
            placeholder="Maintenance Charges"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </form>
  )
}

