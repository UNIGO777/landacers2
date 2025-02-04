import { useForm } from "react-hook-form"

export default function BasicDetails({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Property Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <select
          {...register("type", { required: "Property type is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Property Type</option>
          <option value="land">Land</option>
          <option value="farmhouse">Farmhouse</option>
          <option value="plot">Plot</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>}
      </div>

      <div>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Property Description"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <input
            {...register("location.state", { required: "State is required" })}
            placeholder="State"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location?.state && <p className="mt-1 text-sm text-red-500">{errors.location.state.message}</p>}
        </div>
        <div>
          <input
            {...register("location.district", { required: "District is required" })}
            placeholder="District"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location?.district && <p className="mt-1 text-sm text-red-500">{errors.location.district.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <input
            {...register("location.city", { required: "City is required" })}
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location?.city && <p className="mt-1 text-sm text-red-500">{errors.location.city.message}</p>}
        </div>
        <div>
          <input
            {...register("location.locality", { required: "Locality is required" })}
            placeholder="Locality"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location?.locality && <p className="mt-1 text-sm text-red-500">{errors.location.locality.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("location.pincode", { required: "Pincode is required" })}
          placeholder="Pincode"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.location?.pincode && <p className="mt-1 text-sm text-red-500">{errors.location.pincode.message}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input {...register("isUpcoming")} type="checkbox" className="w-5 h-5 text-blue-600 form-checkbox" />
          <span className="ml-2">Upcoming property</span>
        </label>
        <label className="flex items-center">
          <input {...register("isFeatured")} type="checkbox" className="w-5 h-5 text-blue-600 form-checkbox" />
          <span className="ml-2">Featured property</span>
        </label>
      </div>
    </form>
  )
}

