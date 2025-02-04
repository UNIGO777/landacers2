import { useForm } from "react-hook-form"

export default function LandDetails({ onSubmit, initialData }) {
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
            {...register("numberOfOpenSides", { required: "Number of open sides is required" })}
            type="number"
            placeholder="Number of Open Sides"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.numberOfOpenSides && <p className="mt-1 text-sm text-red-500">{errors.numberOfOpenSides.message}</p>}
        </div>
        <div>
          <input
            {...register("widthOfRoadFacing", { required: "Width of road facing is required" })}
            type="number"
            placeholder="Width of Road Facing"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.widthOfRoadFacing && <p className="mt-1 text-sm text-red-500">{errors.widthOfRoadFacing.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <label className="flex items-center">
          <input {...register("constructionStatus")} type="checkbox" className="w-5 h-5 text-blue-600 form-checkbox" />
          <span className="ml-2">Construction Status</span>
        </label>
        <label className="flex items-center">
          <input {...register("boundaryWallStatus")} type="checkbox" className="w-5 h-5 text-blue-600 form-checkbox" />
          <span className="ml-2">Boundary Wall Status</span>
        </label>
        <label className="flex items-center">
          <input {...register("gatedColonyStatus")} type="checkbox" className="w-5 h-5 text-blue-600 form-checkbox" />
          <span className="ml-2">Gated Colony Status</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <input
            {...register("plotArea", { required: "Plot area is required" })}
            type="number"
            placeholder="Plot Area (sq ft)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.plotArea && <p className="mt-1 text-sm text-red-500">{errors.plotArea.message}</p>}
        </div>
        <div>
          <input
            {...register("length")}
            type="number"
            placeholder="Length (ft)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            {...register("breadth")}
            type="number"
            placeholder="Breadth (ft)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <label className="flex items-center">
        <input {...register("cornerPlotStatus")} type="checkbox" className="w-5 h-5 text-blue-600 form-checkbox" />
        <span className="ml-2">Corner Plot Status</span>
      </label>

      <div>
        <select
          {...register("transactionType", { required: "Transaction type is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Transaction Type</option>
          <option value="New Property">New Property</option>
          <option value="Resale">Resale</option>
        </select>
        {errors.transactionType && <p className="mt-1 text-sm text-red-500">{errors.transactionType.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            {...register("priceDetails.pricePerSqYrd")}
            type="number"
            placeholder="Price per Sq Yard"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            {...register("priceDetails.bookingAmount")}
            type="number"
            placeholder="Booking Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </form>
  )
}

