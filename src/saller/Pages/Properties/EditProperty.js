import { useState, useEffect } from "react";
import { Building2, Upload, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { amenitiesFields, basicDetailsFields, mediaFields, pricingFields, propertyDetailsFields } from "../../JsonData/propertyfeilds";
import StateNames from '../../../Assets/StaticData/StateName';
import Cities from '../../../Assets/DynamicData/CityFatch';
import Loader from "../../../components/loaders/ProcessLoader";

const EditProperty = ({ property, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amenities: {
      commonAmenities: [],
      residentialAmenities: [],
      commercialAmenities: [],
      industrialAmenities: [],
      hospitalityAmenities: []
    },
    photos: [], // Will store new photos to upload
    existingPhotos: [], // Will store existing photos
    video: null, // Will store new video to upload
    existingVideo: null, // Will store existing video
    furnishingItems: [],
    facilitiesItems: [],
    facilitiesInput: '',
    furnishingInput: ''
  });

  const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);
  const [stateInput, setStateInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

  // Initialize form data with property details
  useEffect(() => {
    if (property) {
      // Set basic details
      setFormData(prev => ({
        ...prev,
        propertyType: property.propertyType,
        transactionType: property.transactionType,
        propertyTitle: property.propertyTitle,
        description: property.description,
        availableFrom: property.availableFrom ? new Date(property.availableFrom) : new Date(),
        facingDirection: property.facingDirection,
        isCommercial: property.isCommercial,
        state: property.locationSchemaId?.state,
        city: property.locationSchemaId?.city,
        locality: property.locationSchemaId?.locality,
        subLocality: property.locationSchemaId?.subLocality,
        apartmentSociety: property.locationSchemaId?.apartmentSociety,
        houseNo: property.locationSchemaId?.houseNo,
        existingPhotos: property.propertyMedia?.photos || [],
        existingVideo: property.propertyMedia?.video || null,
        willingToRentOut: property.willingToRentOut,
        availableFor: property.availableFor,
        suitableFor: property.suitableFor,
        
        // Pricing details based on transaction type
        rent: property.pricingDetails?.rent,
        salePrice: property.pricingDetails?.salePrice,
        pgPrice: property.pricingDetails?.pgPrice,
        securityDeposit: property.pricingDetails?.securityDeposit,
        foodIncluded: property.pricingDetails?.foodIncluded,
        
        // Property details will be set based on property type
        // These are common fields that might be present
        bedrooms: property.propertyDetailSchemaId?.bedrooms,
        bathrooms: property.propertyDetailSchemaId?.bathrooms,
        balconies: property.propertyDetailSchemaId?.balconies,
        furnishing: property.propertyDetailSchemaId?.furnishing,
        furnishingItems: property.propertyDetailSchemaId?.furnishingItems || [],
        reservedParking: property.propertyDetailSchemaId?.reservedParking,
        availabilityStatus: property.propertyDetailSchemaId?.availabilityStatus,
        propertyAge: property.propertyDetailSchemaId?.propertyAge,
        totalFloors: property.propertyDetailSchemaId?.totalFloors,
        
        // Area details
        carpetArea: property.propertyDetailSchemaId?.areaDetails?.carpetArea,
        builtUpArea: property.propertyDetailSchemaId?.areaDetails?.builtUpArea,
        superBuiltUpArea: property.propertyDetailSchemaId?.areaDetails?.superBuiltUpArea,
        plotArea: property.propertyDetailSchemaId?.areaDetails?.plotArea,
        areaUnitForCarpet: property.propertyDetailSchemaId?.areaDetails?.areaUnitForCarpet,
        areaUnitForBuiltUp: property.propertyDetailSchemaId?.areaDetails?.areaUnitForBuiltUp,
        areaUnitForSuperBuiltUp: property.propertyDetailSchemaId?.areaDetails?.areaUnitForSuperBuiltUp,
        areaUnitForPlot: property.propertyDetailSchemaId?.areaDetails?.areaUnitForPlot,
        
        // Type-specific fields
        floorNumber: property.propertyDetailSchemaId?.floorNumber,
        floorType: property.propertyDetailSchemaId?.floorType,
        propertyOnFloor: property.propertyDetailSchemaId?.propertyOnFloor,
        boundaryWall: property.propertyDetailSchemaId?.boundaryWall,
        openSides: property.propertyDetailSchemaId?.openSides,
        constructionDone: property.propertyDetailSchemaId?.constructionDone,
        possessionDate: property.propertyDetailSchemaId?.possessionDate ? new Date(property.propertyDetailSchemaId.possessionDate) : null,
        lengthOfPlot: property.propertyDetailSchemaId?.lengthOfPlot,
        breadthOfPlot: property.propertyDetailSchemaId?.breadthOfPlot,
        floorsAllowed: property.propertyDetailSchemaId?.floorsAllowed,
      }));
      
      // Set amenities if available
      if (property.amenitiesSchemaId) {
        setFormData(prev => ({
          ...prev,
          amenities: {
            commonAmenities: property.amenitiesSchemaId.commonAmenities || [],
            residentialAmenities: property.amenitiesSchemaId.residentialAmenities || [],
            commercialAmenities: property.amenitiesSchemaId.commercialAmenities || [],
            industrialAmenities: property.amenitiesSchemaId.industrialAmenities || [],
            hospitalityAmenities: property.amenitiesSchemaId.hospitalityAmenities || []
          }
        }));
      }
      
      // Set state and city inputs
      if (property.locationSchemaId?.state) {
        setStateInput(property.locationSchemaId.state);
        setIsCityDisabled(false);
        const filteredCities = Cities.filter(city => city.state === property.locationSchemaId.state);
        setFilteredCitiesForFilter(filteredCities);
        setCityInput(property.locationSchemaId.city || '');
      }
    }
  }, [property]);

  const handleStateInputChange = (event) => {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    if (inputValue) {
      const filtered = StateNames.filter(state => 
        state.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }
  };

  const handleStateSelect = async (state) => {
    setStateInput(state);
    setFormData((prev) => ({
      ...prev,
      state: state,
    }));
    setFilteredStates([]);
    setIsCityDisabled(false);
    setFilteredCities(Cities.filter(city => city.state === state));
    setFilteredCitiesForFilter(Cities.filter(city => city.state === state));
  };

  const handleCityInputChange = (event) => {
    const inputValue = event.target.value;
    setCityInput(inputValue);
    
    if (inputValue) {
      const filtered = filteredCitiesForFilter.filter(city => 
        city.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setCityInput(city);
    setFormData((prev) => ({
      ...prev,
      city: city,
    }));
    setFilteredCities([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (step === 3) {
      // For amenities step
      const amenityType = e.target.getAttribute('data-type');
      setFormData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenityType]: checked
            ? [...prev.amenities[amenityType], name]
            : prev.amenities[amenityType].filter(item => item !== name)
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };
  
  const handleToggleButton = (name, checked, amenityType = null) => {
    if (step === 3 && amenityType) {
      setFormData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenityType]: checked
            ? [...prev.amenities[amenityType], name]
            : prev.amenities[amenityType].filter(item => item !== name)
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files)],
      }));
    }
  };

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        video: e.target.files[0]
      }));
    }
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleNextStep = () => {
    let fields;
    if (step === 1) {
      fields = basicDetailsFields;
    } else if (step === 2) {
      fields = propertyDetailsFields[formData.propertyType] || [];
    } else if (step === 3) {
      fields = amenitiesFields[formData.propertyType] || [];
    } else {
      fields = pricingFields[formData.transactionType] || [];
    }

    // Ensure fields is an array before filtering
    const requiredFields = Array.isArray(fields) ? fields.filter(field => field.required) : [];
    
    const allFieldsFilled = requiredFields.every(field => {
      if (field.name.includes(".")) {
        const [parent, child] = field.name.split(".");
        return formData[parent] && formData[parent][child] && formData[parent][child] !== "";
      }
      return formData[field.name] && formData[field.name] !== "";
    });

    if (allFieldsFilled) {
      if (step === 5) {
        handleSubmit();
      } else {
        const nextStep = Math.min(5, step + 1);
        setStep(nextStep);
      }
    } else {
      toast.error("Please fill all required fields before proceeding.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add basic form fields
      Object.keys(formData).forEach(key => {
        if (!['photos', 'video', 'existingPhotos', 'existingVideo'].includes(key) && formData[key] !== null) {
          if (typeof formData[key] === 'object' && !(formData[key] instanceof File) && !(formData[key] instanceof Date)) {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else if (formData[key] instanceof Date) {
            formDataToSend.append(key, formData[key].toISOString());
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Add new photos if present
      if (formData.photos && formData.photos.length > 0) {
        formData.photos.forEach(photo => {
          formDataToSend.append('photos', photo);
        });
      }

      // Add new video if present
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      }

      const response = await axios.put(
        `https://api.landacre.in/api/properties/update/${property._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("sellerToken")}`,
          },
        }
      );

      if (response.data) {
        toast.success("Property updated successfully and submitted for admin review");
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update property");
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <div className="grid grid-cols-3 md:flex md:flex-row w-full gap-4">
        {["Basic Details", "Property Details", "Amenities", "Pricing", "Images"].map((label, index) => (
          <div key={label} className="flex items-center w-full md:w-auto">
            <motion.div
              className={`flex items-center justify-center p-1 px-3 rounded-full transition-colors ${step === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {index + 1}
            </motion.div>
            <span
              className={`ml-2 transition-colors text-sm ${step === index + 1 ? "text-blue-500 font-medium" : "text-gray-600"
                }`}
            >
              {label}
            </span>
            {index < 4 && <div className="hidden md:block flex-1 h-px mx-4 bg-gray-300" />}
          </div>
        ))}
      </div>
    </div>
  );

  const handleFurnishingInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      furnishingInput: e.target.value,
    }));
  };

  const handleAddFurnishingItem = () => {
    if (formData.furnishingInput && formData.furnishingInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        furnishingItems: [...prev.furnishingItems, formData.furnishingInput.trim()],
        furnishingInput: "",
      }));
    }
  };

  const handleRemoveFurnishingItem = (itemToRemove) => {
    setFormData((prev) => ({
      ...prev,
      furnishingItems: prev.furnishingItems.filter((item) => item !== itemToRemove),
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleRemoveExistingPhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      existingPhotos: prev.existingPhotos.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleRemoveVideo = () => {
    setFormData((prev) => ({
      ...prev,
      video: null
    }));
  };

  const handleRemoveExistingVideo = () => {
    setFormData((prev) => ({
      ...prev,
      existingVideo: null
    }));
  };

  const handleFacilitiesInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      facilitiesInput: e.target.value,
    }));
  };

  const handleAddFacilitiesItem = () => {
    if (formData.facilitiesInput && formData.facilitiesInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        facilitiesItems: [...prev.facilitiesItems, formData.facilitiesInput.trim()],
        facilitiesInput: "",
      }));
    }
  };

  const handleRemoveFacilitiesItem = (itemToRemove) => {
    setFormData((prev) => ({
      ...prev,
      facilitiesItems: prev.facilitiesItems.filter((item) => item !== itemToRemove),
    }));
  };

  const renderDynamicFields = (fields, formData, handleChange, handleCheckboxChange) => {
    return fields.map((field) => {
      if (field.name === "state") {
        return (
          <div key={field.name} className="relative w-full mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            <input
              type="text"
              placeholder="State"
              name='state'
              value={stateInput}
              onChange={handleStateInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {filteredStates.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto z-20">
                {filteredStates.map((state, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleStateSelect(state)}
                  >
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      } else if (field.name === "city") {
        return (
          <div key={field.name} className="relative w-full mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            <input
              type="text"
              placeholder="City"
              name='city'
              value={cityInput}
              onChange={handleCityInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={isCityDisabled}
            />
            {filteredCities.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto z-20">
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleCitySelect(city.name)}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      } else if (field.name === "furnishingItems" || field.name === "facilities") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} <span className="text-blue-700 text-sm">(optional)</span></label>
            <input
              type="text"
              value={field.name === "furnishingItems" ? formData.furnishingInput : formData.facilitiesInput}
              onChange={field.name === "furnishingItems" ? handleFurnishingInputChange : handleFacilitiesInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={field.name === "furnishingItems" ? "Enter furnishing items" : "Enter facilities"}
              disabled={field.name === "furnishingItems" && formData.furnishing !== "Semi-Furnished" && formData.furnishing !== "Furnished"}
            />
            <button
              type="button"
              onClick={field.name === "furnishingItems" ? handleAddFurnishingItem : handleAddFacilitiesItem}
              className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Item
            </button>
            <ul className="mt-2">
              {field.name === "furnishingItems" ? formData.furnishingItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
                  <span>{item}</span>
                  <X
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleRemoveFurnishingItem(item)}
                  />
                </li>
              )) : formData.facilitiesItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
                  <span>{item}</span>
                  <X
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleRemoveFacilitiesItem(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (field.name === "photos") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            
            {/* Existing Photos */}
            {formData.existingPhotos && formData.existingPhotos.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Photos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {formData.existingPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={`https://api.landacre.in/storage/${photo}`} 
                        alt={`Existing ${index}`}
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingPhoto(index)}
                          className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload New Photos */}
            <div className="relative">
              <input
                type="file"
                name={field.name}
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 text-center">Drag & drop new photos here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: JPG, PNG, GIF</p>
              </div>
            </div>
            
            {/* New Photos Preview */}
            {formData.photos.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">New Photos to Upload</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={URL.createObjectURL(photo)} 
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(index)}
                          className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      } else if (field.name === "video") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            
            {/* Existing Video */}
            {formData.existingVideo && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Video</h4>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <video 
                    src={`https://api.landacre.in/storage/${
                    formData.existingVideo}`} 
                    controls
                    className="w-full max-h-48"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveExistingVideo}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
            
            {/* Upload New Video */}
            <div className="relative">
              <input
                type="file"
                name={field.name}
                onChange={handleVideoUpload}
                accept="video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 text-center">Drag & drop new video here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: MP4, MOV, AVI</p>
              </div>
            </div>
            
            {/* New Video Preview */}
            {formData.video && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">New Video to Upload</h4>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <video 
                    src={URL.createObjectURL(formData.video)} 
                    controls
                    className="w-full max-h-48"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      } else if (field.type === "date") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            <DatePicker
              selected={formData[field.name]}
              onChange={(date) => handleDateChange(date, field.name)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
            />
          </div>
        );
      } else if (field.type === "select") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                typeof option === 'object' ? 
                  <option key={option.value || option.name} value={option.value}>
                    {option.label || option.name}
                  </option> 
                : 
                  <option key={option} value={option}>
                    {option}
                  </option>
              ))}
            </select>
          </div>
        );
      } else if (field.type === "checkbox") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleToggleButton(field.name, true)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${formData[field.name] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleToggleButton(field.name, false)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${!formData[field.name] ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                No
              </button>
            </div>
          </div>
        );
      } else if (field.type === "checkbox-group") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label}</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${field.name}-${option.value}`}
                    name={option.value}
                    data-type={field.name}
                    checked={formData.amenities[field.name]?.includes(option.value) || false}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`${field.name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder || `Enter ${field.label}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        );
      }
    });
  };

  // Render amenities fields separately since they have a different structure
  const renderAmenitiesFields = () => {
    const propertyAmenities = amenitiesFields[formData.propertyType];
    if (!propertyAmenities) return null;
    
    return (
      <div className="space-y-6">
        {/* Common Amenities */}
        {propertyAmenities.commonAmenities && propertyAmenities.commonAmenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Common Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyAmenities.commonAmenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`common-${amenity.name}`}
                    name={amenity.name}
                    data-type="commonAmenities"
                    checked={formData.amenities.commonAmenities.includes(amenity.name)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`common-${amenity.name}`} className="ml-2 block text-sm text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Residential Amenities */}
        {propertyAmenities.residentialAmenities && propertyAmenities.residentialAmenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Residential Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyAmenities.residentialAmenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`residential-${amenity.name}`}
                    name={amenity.name}
                    data-type="residentialAmenities"
                    checked={formData.amenities.residentialAmenities.includes(amenity.name)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`residential-${amenity.name}`} className="ml-2 block text-sm text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commercial Amenities */}
        {propertyAmenities.commercialAmenities && propertyAmenities.commercialAmenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Commercial Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyAmenities.commercialAmenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`commercial-${amenity.name}`}
                    name={amenity.name}
                    data-type="commercialAmenities"
                    checked={formData.amenities.commercialAmenities.includes(amenity.name)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`commercial-${amenity.name}`} className="ml-2 block text-sm text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Industrial Amenities */}
        {propertyAmenities.industrialAmenities && propertyAmenities.industrialAmenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Industrial Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyAmenities.industrialAmenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`industrial-${amenity.name}`}
                    name={amenity.name}
                    data-type="industrialAmenities"
                    checked={formData.amenities.industrialAmenities.includes(amenity.name)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`industrial-${amenity.name}`} className="ml-2 block text-sm text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hospitality Amenities */}
        {propertyAmenities.hospitalityAmenities && propertyAmenities.hospitalityAmenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Hospitality Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyAmenities.hospitalityAmenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`hospitality-${amenity.name}`}
                    name={amenity.name}
                    data-type="hospitalityAmenities"
                    checked={formData.amenities.hospitalityAmenities.includes(amenity.name)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`hospitality-${amenity.name}`} className="ml-2 block text-sm text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the appropriate form fields based on the current step
  const renderFormFields = () => {
    switch (step) {
      case 1:
        return renderDynamicFields(basicDetailsFields, formData, handleChange, handleCheckboxChange);
      case 2:
        return renderDynamicFields(propertyDetailsFields[formData.propertyType] || [], formData, handleChange, handleCheckboxChange);
      case 3:
        return renderAmenitiesFields();
      case 4:
        return renderDynamicFields(pricingFields[formData.transactionType] || [], formData, handleChange, handleCheckboxChange);
      case 5:
        return renderDynamicFields(mediaFields, formData, handleChange, handleCheckboxChange);
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Property</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {renderStepIndicator()}

          <form>
            {renderFormFields()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
              )}
              <div className="flex-1"></div>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size="small" className="mr-2" /> Processing...
                  </>
                ) : step === 5 ? (
                  "Update Property"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditProperty;