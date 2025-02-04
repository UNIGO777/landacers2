import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ImageUpload({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  })
  const [previewImages, setPreviewImages] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setPreviewImages(files.map((file) => URL.createObjectURL(file)))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="thumbnailImage" className="block mb-1 text-sm font-medium text-gray-700">
          Thumbnail Image
        </label>
        <input
          {...register("thumbnailImage", { required: "Thumbnail image is required" })}
          id="thumbnailImage"
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleImageChange}
        />
        {errors.thumbnailImage && <p className="mt-1 text-sm text-red-500">{errors.thumbnailImage.message}</p>}
      </div>

      <div>
        <label htmlFor="images" className="block mb-1 text-sm font-medium text-gray-700">
          Additional Images
        </label>
        <input
          {...register("images")}
          id="images"
          type="file"
          accept="image/*"
          multiple
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleImageChange}
        />
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              className="object-cover w-full h-32 rounded-md"
            />
          ))}
        </div>
      )}
    </form>
  )
}

