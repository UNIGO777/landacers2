import { useState} from "react";
import { Building2, Upload, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { amenitiesFields, basicDetailsFields,  mediaFields, pricingFields, propertyDetailsFields} from "../../JsonData/propertyfeilds";
import StateNames from '../../../Assets/StaticData/StateName';
import Cities from '../../../Assets/DynamicData/CityFatch';
import Massage from "../../components/Messages/Massage";
import Loader from "../../../components/loaders/ProcessLoader";

const AddPropertyPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    amenities: {
      commonAmenities: [],
      residentialAmenities: [],
      commercialAmenities: [],
      industrialAmenities: [],
      hospitalityAmenities: []
    },
    photos: [], // (optional)
    video: null, // (optional)
    furnishingItems: [], // (optional)
    facilitiesItems: [], // Add facilities array
    facilitiesInput: '', // Add facilities input
  });
  const [showMassage, setShowMassage] = useState(false);
  const [massageMessage, setMassageMessage] = useState('');
  const [massageType, setMassageType] = useState('');
  const [massageRedirect, setMassageRedirect] = useState('/saller/properties');

  const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);
  const [stateInput, setStateInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

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

  const handleDateChange = (date,field) => {
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
        setShowConfirmation(true);
      } else {
        const nextStep = Math.min(5, step + 1);
        setStep(nextStep);
      }
    } else {
      toast.error("Please fill all required fields before proceeding.");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!showConfirmation) {
    setShowConfirmation(true);
    return;
  }
  setLoading(true);

  try {
    const formDataToSend = new FormData();
    
    // Add basic form fields
    Object.keys(formData).forEach(key => {
      if (key !== 'video' && formData[key] !== null) {
        if (typeof formData[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    if (formData.photos && formData.photos.length > 0) {
      formData.photos.forEach(photo => {
        formDataToSend.append('photos', photo);
      });
    }

    // Add images if present
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach(image => {
        formDataToSend.append('images', image);
      });
    }

    // Add video if present 
    if (formData.video) {
      formDataToSend.append('video', formData.video);
    }

    const response = await axios.post(
      `https://api.landacre.in/api/properties/create`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("sellerToken")}`,
        },
      }
    );

    if (response.status === 201) {
      setMassageType("success");
      setShowMassage(true);
      setMassageMessage("Property added successfully!");
      setMassageRedirect("/saller/properties");
      setShowConfirmation(false);
    } else {
      throw new Error(response.data.message || "Failed to add property");
    }
  } catch (error) {
    setShowMassage(true);
    setMassageMessage(error.response?.data?.message || "An error occurred while adding the property");
    setMassageType("error");
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

  const handleRemoveVideo = () => {
    setFormData((prev) => ({
      ...prev,
      video: null
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
      }  else if (field.name === "photos") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
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
                <p className="text-sm text-gray-600 text-center">Drag & drop photos here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: JPG, PNG, GIF</p>
              </div>
            </div>
            
            {formData.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
            )}
          </div>
        );
      } else if (field.name === "video") {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>}</label>
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
                <p className="text-sm text-gray-600 text-center">Drag & drop video here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: MP4, MOV, AVI</p>
              </div>
            </div>
            
            {formData.video && (
              <div className="mt-4">
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
      } else {
        return (
          <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label} {field.required ? <span className="text-gray-700 text-sm">**</span> : <span className="text-blue-700 text-sm">(optional)</span>} <span className="text-red-700 opacity-50 text-sm">{field?.validation?.message}</span></label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  typeof option == 'object' ? <option key={option.value} value={option.value}>
                    {option.name}
                  </option> : <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div className="flex space-x-2">
                <button
                  type="button"
                  name={field.name}
                  data-type={field.amenityType}
                  onClick={(e) => {
                    e.target.name = field.name;
                    e.target.checked = true;
                    e.target.setAttribute('data-type', field.amenityType);
                    handleCheckboxChange(e);
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${step === 3 
                    ? formData.amenities[field.amenityType]?.includes(field.name) 
                    : formData[field.name] 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  name={field.name}
                  data-type={field.amenityType}
                  onClick={(e) => {
                    e.target.name = field.name;
                    e.target.checked = false;
                    e.target.setAttribute('data-type', field.amenityType);
                    handleCheckboxChange(e);
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${step === 3 
                    ? !formData.amenities[field.amenityType]?.includes(field.name) 
                    : !formData[field.name] 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700'}`}
                >
                  No
                </button>
              </div>
            ) : field.type === "date" ? (
              <DatePicker
                selected={formData[field.name]}
                onChange={(date) => handleDateChange(date,field.name)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                isClearable
                minDate={new Date()}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required={field.required}
                onInput={field.onInput}
                title={field.validation?.message}
              />
            )}
          </div>
        );
      }
    });
  };

  const renderBasicDetails = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      {renderDynamicFields(basicDetailsFields, formData, handleChange, handleCheckboxChange)}
     
    </motion.div>
  );

  const renderPropertyDetails = () => {
    let fields = propertyDetailsFields[formData.propertyType] || [];
    
   
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        
        {renderDynamicFields(fields, formData, handleChange, handleCheckboxChange)}
      </motion.div>
    );
  };

  const renderAmenities = () => {
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

  const renderPricing = () => {
    const fields = pricingFields[formData.transactionType] || [];
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        {renderDynamicFields(fields, formData, handleChange, handleCheckboxChange)}
      </motion.div>
    );
  };

  const renderImageUpload = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      {renderDynamicFields(mediaFields, formData, handleChange, handleCheckboxChange)}
    </motion.div>
  );

  const renderConfirmation = () => {
    // Get fields based on property type
    const propertyFields = propertyDetailsFields[formData.propertyType] || [];

    return (
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Review Property Details</h3>
          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit Details
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Basic Information
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Property Type</span>
                <span className="font-medium text-gray-900 mt-1 sm:mt-0">{formData.propertyType}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Transaction Type</span>
                <span className="font-medium text-gray-900 mt-1 sm:mt-0">{formData.transactionType}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Title</span>
                <span className="font-medium text-gray-900 mt-1 sm:mt-0">{formData.propertyTitle}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Location Details
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">State</span>
                <span className="font-medium text-gray-900 mt-1 sm:mt-0">{formData.state}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">City</span>
                <span className="font-medium text-gray-900 mt-1 sm:mt-0">{formData.city}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Locality</span>
                <span className="font-medium text-gray-900 mt-1 sm:mt-0">{formData.locality}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Property Features
            </h4>
            <div className="space-y-3">
              {propertyFields.map((field) => (
                <div key={field.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{field.label}</span>
                  <span className="font-medium text-gray-900 mt-1 sm:mt-0">
                    {field.type === 'select' ? formData[field.name] : 
                     `${formData[field.name]}${field.name.toLowerCase().includes('area') ? 
                     ` ${formData[`areaUnitFor${field.name.replace('Area', '')}`] || ''}` : ''}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Pricing Details
            </h4>
            <div className="space-y-3">
              {formData.transactionType === 'Sell' && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Sale Price</span>
                  <span className="font-medium text-gray-900 mt-1 sm:mt-0">₹{formData.salePrice}</span>
                </div>
              )}
              {formData.transactionType === 'Rent' && (
                <><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-medium text-gray-900 mt-1 sm:mt-0">₹{formData.rent}</span> 
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Security Deposit</span>
                <span className="font-medium text-gray-900">₹{formData.securityDeposit}</span>
                </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Media Gallery</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <img 
                  src={URL.createObjectURL(photo)}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {formData.video && (
            <div className="mt-4">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <video 
                  src={URL.createObjectURL(formData.video)} 
                  controls
                  className="w-full max-h-48"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 
                       transition-colors flex items-center gap-2 font-medium"
            disabled={loading}
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                Confirm & List Property
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
    {showMassage && <Massage message={massageMessage} type={massageType} redirect={massageRedirect}/>}
    <>
      
      <div className="min-h-screen  bg-gray-50">
        <div className="container mx-auto ">
          <motion.div
            className="p-8 bg-white shadow-sm rounded-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Building2 className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">Add New Property</h1>
            </div>

            {!showConfirmation && renderStepIndicator()}

            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {showConfirmation ? (
                  renderConfirmation()
                ) : (
                  <>
                    {step === 1 && renderBasicDetails()}
                    {step === 2 && renderPropertyDetails()}
                    {step === 3 && renderAmenities()}
                    {step === 4 && renderPricing()}
                    {step === 5 && renderImageUpload()}
                  </>
                )}
              </AnimatePresence>

              {!showConfirmation && (
                <div className="flex justify-between pt-6">
                  <motion.button
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="px-6 py-2 text-gray-600 transition-colors hover:text-gray-900"
                    disabled={step === 1}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step === 5 ? "Review Details" : "Next"}
                  </motion.button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </>
    {loading && <Loader message="Adding Property..." subMessage="Please wait while we process your request" />}
    </>
  );
};

export default AddPropertyPage;
