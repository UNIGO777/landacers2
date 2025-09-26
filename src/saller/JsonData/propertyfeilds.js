export const transactionTypes = ["Sell", "Rent", "PG"];
export const facingDirections = ["North", "East", "West", "South"];
export const propertyDetailsFields = {
  "FlatApartment": [
    { name: "floorNumber", label: "Floor Number", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bedrooms", label: "Bedrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bathrooms", label: "Bathrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "balconies", label: "Balconies", type: "text", default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "superBuiltUpArea", label: "Super Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: false },
    { name: "areaUnitForSuperBuiltUp", label: "Area Unit for Super Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: false },
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text", required: false },
    { name: "reservedParking", label: "Reserved Parking", type: "select", options: ["Covered Parking", "Open Parking", "None"], required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
    { name: "propertyAge", label: "Property Age (Years)", type: "text", required: true, default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } }
  ],
  "IndependentHouseVilla": [
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForPlot", label: "Area Unit for Plot Area", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up Area", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: false },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet Area", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: false },
    { name: "bedrooms", label: "Bedrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bathrooms", label: "Bathrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text", required: false },
    { name: "reservedParking", label: "Reserved Parking", type: "select", options: ["Covered", "Open", "None"], required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
    { name: "propertyAge", label: "Property Age (Years)", type: "text", required: true, default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } }
  ],
  "IndependentBuilderFloor": [
    { name: "floorType", label: "Floor Type", type: "select", options: ["Independent", "Builder Floor"], required: true },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "propertyOnFloor", label: "Property On Floor", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bedrooms", label: "Bedrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bathrooms", label: "Bathrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "balconies", label: "Balconies", type: "text", default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "superBuiltUpArea", label: "Super Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "areaUnitForSuperBuiltUp", label: "Area Unit for Super Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "otherRooms", label: "Other Rooms", type: "text", required: false }, // This can be a comma-separated string or an array input
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text", required: false }, // This can be a comma-separated string or an array input
    { name: "reservedParking", label: "Reserved Parking", type: "select", options: ["Covered", "Open", "None"], required: true }, // This can be a checkbox for 'Yes' or 'No'
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
  ],
  "Land": [
    { name: "landType", label: "Land Type", type: "select", options: ['Commercial', 'Residential', 'Agricultural / Farm Land', 'Industrial Land'], required: true },
    { name: "landArea", label: "Land Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForLand", label: "Area Unit", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acers', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    
    { name: "floorsAllowed", label: "Floors Allowed", type: "text", required: false, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "boundaryWall", label: "Boundary Wall", type: "checkbox", required: true },
    { name: "openSides", label: "Open Sides", type: "select", options: [0, 1, 2, 3, 4, 5], required: true },
    { name: "constructionDone", label: "Construction Done", type: "checkbox", required: false },
    { name: "possessionDate", label: "Possession Date", type: "date", required: true },
  ],
  "Plot": [
    { name: "plotType", label: "Plot Type", type: "select", options: ["Commercial", "Residential", "Industrial Plot"], required: true },
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForPlot", label: "Area Unit", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    { name: "lengthOfPlot", label: "Length of Plot", type: "number", required: false, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "breadthOfPlot", label: "Breadth of Plot", type: "number", required: false, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "floorsAllowed", label: "Floors Allowed", type: "number", required: false, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "boundaryWall", label: "Boundary Wall", type: "checkbox", required: false },
    { name: "openSides", label: "Open Sides", type: "select", options: [0, 1, 2, 3, 4, 5], required: true },
    { name: "constructionDone", label: "Construction Done", type: "checkbox", default: false },
    { name: "possessionDate", label: "Possession Date", type: "date", required: true }
  ],
  "RKStudioApartment": [
    { name: "bedrooms", label: "Bedrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bathrooms", label: "Bathrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "balconies", label: "Balconies", type: "text", default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "superBuiltUpArea", label: "Super Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "areaUnitForSuperBuiltUp", label: "Area Unit for Super Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text", required: false },
    { name: "reservedParking", label: "Reserved Parking", type: "select", options: ["Covered", "Open", "None"], required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
    { name: "floorNumber", label: "Floor Number", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "propertyAge", label: "Property Age (Years)", type: "text", required: true, default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } }
  ],
  "ServicedApartment": [
    { name: "bedrooms", label: "Bedrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bathrooms", label: "Bathrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "balconies", label: "Balconies", type: "text", default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "superBuiltUpArea", label: "Super Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "areaUnitForSuperBuiltUp", label: "Area Unit for Super Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "otherRooms", label: "Other Rooms", type: "text", required: false }, // Array for other room types
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text", required: false }, // Array for furnishing items
    { name: "reservedParking", label: "Reserved Parking", type: "select", options: ["Covered Parking", "Open Parking", "None"], required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
    { name: "floorNumber", label: "Floor Number", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "propertyAge", label: "Property Age (Years)", type: "text", required: true, default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } }
  ],
  "Farmhouse": [
    { name: "bedrooms", label: "Bedrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "bathrooms", label: "Bathrooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "balconies", label: "Balconies", type: "text", default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForPlot", label: "Area Unit for Plot", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "otherRooms", label: "Other Rooms", type: "text", required: false }, // Array for other room types
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text", required: false }, // Array for furnishing items
    { name: "reservedParking", label: "Reserved Parking", type: "select", options: ["Covered Parking", "Open Parking", "None"], required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
    { name: "floorNumber", label: "Floor Number", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "propertyAge", label: "Property Age (Years)", type: "text", required: true, default: 0, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } }
  ],
  "Office": [
    { name: "WhatKindOfOfficeIsit", label: "What Kind of Office Is it?", type: "select", options: ["Ready to move office space", "Bare shell office space", "Co-working office space"], required: true },
    { name: "carpetArea", label: "Carpet Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "superBuiltUpArea", label: "Super Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ["sq.ft", "sq.yards", "sq.m."], required: true },
    { name: "areaUnitForSuperBuiltUp", label: "Area Unit for Super Built-Up", type: "select", options: ["sq.ft", "sq.yards", "sq.m."] },
    { name: "constructionStatus", label: "Construction Status", type: "select", options: ["No walls", "Brick walls", "Cemented walls", "Plastered walls"], required: function() { return this.WhatKindOfOfficeIsit === "Bare shell office space"; } },
    { name: "doorsConstructed", label: "Doors Constructed", type: "select", options: ["Yes", "No"], required: function() { return this.WhatKindOfOfficeIsit === "Bare shell office space"; } },
    { name: "minSeats", label: "Minimum Seats", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "maxSeats", label: "Maximum Seats", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "cabins", label: "Number of Cabins", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "meetingRooms", label: "Number of Meeting Rooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "washrooms", label: "Washrooms Availability", type: "select", options: ["Available", "Not Available"], required: true },
    { name: "conferenceRoom", label: "Conference Room Availability", type: "select", options: ["Available", "Not Available"], required: true },
    { name: "receptionArea", label: "Reception Area Availability", type: "select", options: ["Available", "Not Available"], required: true },
    { name: "pantryType", label: "Pantry Type", type: "select", options: ["Shared", "Private", "Not Available"], required: true },
    { name: "fireSafetyMeasures", label: "Fire Safety Measures", type: "select", options: ["Fire Extinguisher", "Fire Sensors", "Sprinklers", "Fire Hose", "None"], required: true, default: "None" },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "occupiedFloors", label: "Occupied Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "staircases", label: "Number of Staircases", type: "select", options: [1, 2, 3, 4] },
    { name: "lifts", label: "Lifts Availability", type: "select", options: ["Available", "Not Available"], required: true },
    { name: "parking", label: "Parking Availability", type: "select", options: ["Available", "Not Available"], required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ["Ready to Move", "Under Construction"], required: true },
    { name: "facilities", label: "Facilities", type: "text", required: false }
  ],
  "Retail": [
    { name: "retailType", label: "Retail Type", type: "select", options: ['Commercial Shops', 'Commercial Showrooms'], required: true },
    { name: "locationType", label: "Location Type", type: "select", options: ['Mall', 'Commercial Project', 'Residential Project', 'Retail Complex/Building', 'Market / High Street'], required: true },
    { name: "carpetArea", label: "Carpet Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "areaUnitForPlot", label: "Area Unit for Plot", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "entranceWidth", label: "Entrance Width", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "ceilingHeight", label: "Ceiling Height", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "totalFloors", label: "Total Floors", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "propertyOnFloor", label: "Property's Floor Number", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "washrooms", label: "Washrooms Availability", type: "select", options: ['Private washrooms', 'Public washrooms', 'Not Available'], default: 'Not Available' },
    { name: "parkingType", label: "Parking Type", type: "select", options: ['Private Parking', 'Public Parking', 'Multilevel Parking', 'Not Available'], default: 'Not Available' },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ['Ready to move', 'Under construction'], required: true },
    { name: "suitableForBusinessTypes", label: "Suitable for Business Types", type: "text" }
  ],
  "Storage": [
    { name: "StorageType", label: "Storage Type", type: "select", options: ['Ware House', 'Cold Storage'], required: true },
    { name: "carpetArea", label: "Carpet Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "areaUnitForPlot", label: "Area Unit for Plot", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "washrooms", label: "Washrooms Availability", type: "select", options: ['Available', 'Not Available'], default: 'Not Available', required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ['Ready to move', 'Under construction'], required: true }
  ],
  "Industry": [
    { name: "IndustryType", label: "Industry Type", type: "select", options: ['Factory', 'Manufacturing'], required: true },
    { name: "carpetArea", label: "Carpet Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "areaUnitForPlot", label: "Area Unit for Plot", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "washrooms", label: "Washrooms Availability", type: "select", options: ['Available', 'Not Available'], default: 'Not Available', required: true },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ['Ready to move', 'Under construction'], required: true }
  ],
  "Hospitality": [
    { name: "HospitalityType", label: "Hospitality Type", type: "select", options: ['Hotel/Resorts', 'Guest-House/Banquet-Halls'], required: true },
    { name: "totalRooms", label: "Total Rooms", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "washrooms", label: "Number of Washrooms", type: "select", options: [0, 1, 2, 3, 4], required: true },
    { name: "balconies", label: "Number of Balconies", type: "text", min: 0, max: 10, required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "carpetArea", label: "Carpet Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "builtUpArea", label: "Built-Up Area", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForCarpet", label: "Area Unit for Carpet", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "areaUnitForPlot", label: "Area Unit for Plot", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    { name: "areaUnitForBuiltUp", label: "Area Unit for Built-Up", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'] },
    { name: "otherRooms", label: "Other Rooms", type: "text" },
    { name: "furnishing", label: "Furnishing Status", type: "select", options: ['Furnished', 'Semi-Furnished', 'Unfurnished'], required: true },
    { name: "furnishingItems", label: "Furnishing Items", type: "text" },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ['Ready to move', 'Under construction'], required: true },
    { name: "qualityRating", label: "Quality Rating", type: "text", min: 0, max: 7, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } }
  ],
  "others": [
    { name: "plotArea", label: "Plot Area", type: "text", required: true, onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "areaUnitForPlot", label: "Area Unit for Plot", type: "select", options: ['sq.ft', 'sq.yards', 'sq.m.', 'Acerss', 'marla', 'cents', 'bigha', 'kottah', 'kanal', 'grounds', 'ares', 'biswa', 'guntha', 'aankadam', 'hectares', 'rood', 'chataks', 'perch'], required: true },
    { name: "otherRooms", label: "Other Rooms", type: "text" },
    { name: "totalFloors", label: "Total Floors", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "propertyOnFloor", label: "Property's Floor Number", type: "text", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''), validation: { message: "Only numbers are allowed." } },
    { name: "availabilityStatus", label: "Availability Status", type: "select", options: ['Ready to move', 'Under construction'], required: true }
  ]
};



export const propertyTypes = [
  { name: "Flat/Apartment", value: "FlatApartment" },
  { name: "Independent House/Villa", value: "IndependentHouseVilla" },
  { name: "Independent/Builder Floor", value: "IndependentBuilderFloor" },
  { name: "Plot", value: "Plot" },
  { name: "Land", value: "Land" },
  { name: "1 RK/Studio Apartment", value: "RKStudioApartment" },
  { name: "Serviced Apartment", value: "ServicedApartment" },
  { name: "Farmhouse", value: "Farmhouse" },
  { name: "Office", value: "Office" },
  { name: "Retail", value: "Retail" },
  { name: "Storage", value: "Storage" },
  { name: "Industry", value: "Industry" },
  { name: "Hospitality", value: "Hospitality" },
  {name:"Others", value: "others"}
];

export const basicDetailsFields = [
  { name: "propertyType", label: "Property Type", type: "select", options: propertyTypes, required: true },
  { name: "transactionType", label: "Transaction Type", type: "select", options: transactionTypes, required: true },
  { name: "propertyTitle", label: "Property Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "availableFrom", label: "Available From", type: "date", required: true },
  { name: "facingDirection", label: "Facing Direction", type: "select", options: facingDirections, required: true },
  { name: "isCommercial", label: "Is Commercial", type: "checkbox", required: false },
  { name: "state", label: "State", type: "text", required: true },
  { name: "city", label: "City", type: "text", required: true },
  { name: "locality", label: "Locality", type: "text", required: true },
  { name: "subLocality", label: "Sub Locality", type: "text", required: false },
  { name: "apartmentSociety", label: "Apartment/Society", type: "text", required: false },
  { name: "houseNo", label: "House/Flat Number", type: "text", required: false },
];

export const pricingFields = {
  Sell: [
    { name: "salePrice", label: "Sale Price", type: "number", required: true },
  ],
  Rent: [
    { name: "rent", label: "Monthly Rent", type: "number", required: true },
    { name: "securityDeposit", label: "Security Deposit", type: "number", required: true },
    { name: "willingToRentOut", label: "Willing to Rent Out", type: "select", options: ['Family', 'Single Man', 'Single Woman'], required: true },
  ],
  PG: [
    { name: "pgPrice", label: "PG Price", type: "number", required: true },
    { name: "foodIncluded", label: "Food Included", type: "checkbox", required: false },
    { name: "availableFor", label: "Available For", type: "select", options: ['Girls', 'Boys', 'Any'], required: true },
    { name: "suitableFor", label: "Suitable For", type: "select", options: ['Student', 'WorkingProfessionals'], required: true },
  ],
};

export const mediaFields = [
  { name: "photos", label: "Upload Photos", type: "file", multiple: true, accept: "image/*" },
  { name: "video", label: "Upload Video", type: "file", accept: "video/*" },
];


export const amenitiesFields = {
  "FlatApartment": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "lift", label: "Lift", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    residentialAmenities: [
      { name: "swimmingPool", label: "Swimming Pool", type: "checkbox" },
      { name: "gym", label: "Gym", type: "checkbox" },
      { name: "park", label: "Park", type: "checkbox" },
      { name: "clubhouse", label: "Club House", type: "checkbox" },
      { name: "childrenPlayArea", label: "Children's Play Area", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "IndependentHouseVilla": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    residentialAmenities: [
      { name: "garden", label: "Private Garden", type: "checkbox" },
      { name: "swimmingPool", label: "Private Pool", type: "checkbox" },
      { name: "servantsQuarters", label: "Servants Quarters", type: "checkbox" },
      { name: "terrace", label: "Terrace", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "IndependentBuilderFloor": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    residentialAmenities: [
      { name: "garden", label: "Private Garden", type: "checkbox" },
      { name: "swimmingPool", label: "Private Pool", type: "checkbox" },
      { name: "servantsQuarters", label: "Servants Quarters", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "Plot": {
    commonAmenities: [
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "fencing", label: "Fencing", type: "checkbox" },
      { name: "waterSupply", label: "Water Supply", type: "checkbox" }
    ],
    residentialAmenities: [],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "Land": {
    commonAmenities: [
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "fencing", label: "Fencing", type: "checkbox" },
      { name: "waterSupply", label: "Water Supply", type: "checkbox" }
    ],
    residentialAmenities: [],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "RKStudioApartment": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    residentialAmenities: [
      { name: "swimmingPool", label: "Swimming Pool", type: "checkbox" },
      { name: "gym", label: "Gym", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "ServicedApartment": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    residentialAmenities: [
      { name: "swimmingPool", label: "Swimming Pool", type: "checkbox" },
      { name: "gym", label: "Gym", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "Farmhouse": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    residentialAmenities: [
      { name: "garden", label: "Private Garden", type: "checkbox" },
      { name: "swimmingPool", label: "Private Pool", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "Office": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "lift", label: "Lift", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    commercialAmenities: [
      { name: "conferenceRoom", label: "Conference Room", type: "checkbox" },
      { name: "cafeteria", label: "Cafeteria", type: "checkbox" },
      { name: "internetConnectivity", label: "High Speed Internet", type: "checkbox" }
    ],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "Retail": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "lift", label: "Lift", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    commercialAmenities: [
      { name: "airConditioning", label: "Central Air Conditioning", type: "checkbox" },
      { name: "displayArea", label: "Display Area", type: "checkbox" },
      { name: "storageFacility", label: "Storage Facility", type: "checkbox" },
      { name: "wasteDisposal", label: "Waste Disposal", type: "checkbox" },
      { name: "loadingUnloading", label: "Loading/Unloading Area", type: "checkbox" }
    ],
    industrialAmenities: [],
    hospitalityAmenities: []
  },
  "Storage": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [
      { name: "loadingDock", label: "Loading Dock", type: "checkbox" },
      { name: "goodsLift", label: "Goods Lift", type: "checkbox" },
      { name: "fireSystem", label: "Fire Fighting System", type: "checkbox" },
      { name: "warehouseManagement", label: "Warehouse Management System", type: "checkbox" }
    ],
    hospitalityAmenities: []
  },
  "Industry": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [
      { name: "loadingDock", label: "Loading Dock", type: "checkbox" },
      { name: "goodsLift", label: "Goods Lift", type: "checkbox" },
      { name: "fireSystem", label: "Fire Fighting System", type: "checkbox" },
      { name: "wasteManagement", label: "Waste Management System", type: "checkbox" },
      { name: "waterTreatment", label: "Water Treatment Plant", type: "checkbox" },
      { name: "qualityTesting", label: "Quality Testing Lab", type: "checkbox" },
      { name: "rawMaterialStorage", label: "Raw Material Storage", type: "checkbox" },
      { name: "finishedGoodsStorage", label: "Finished Goods Storage", type: "checkbox" }
    ],
    hospitalityAmenities: []
  },
  "Hospitality": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "lift", label: "Lift", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" }
    ],
    commercialAmenities: [],
    industrialAmenities: [],
    hospitalityAmenities: [
      { name: "restaurant", label: "Restaurant", type: "checkbox" },
      { name: "swimmingPool", label: "Swimming Pool", type: "checkbox" },
      { name: "spa", label: "Spa", type: "checkbox" },
      { name: "conferenceHall", label: "Conference Hall", type: "checkbox" },
      { name: "roomService", label: "24/7 Room Service", type: "checkbox" }
    ]
  },
  "others": {
    commonAmenities: [
      { name: "parking", label: "Parking", type: "checkbox" },
      { name: "security", label: "24/7 Security", type: "checkbox" },
      { name: "lift", label: "Lift", type: "checkbox" },
      { name: "powerBackup", label: "Power Backup", type: "checkbox" },
      { name: "wifi", label: "Wi-Fi", type: "checkbox" },
      { name: "cctv", label: "CCTV Surveillance", type: "checkbox" },
      { name: "waterSupply", label: "24/7 Water Supply", type: "checkbox" },
      { name: "garden", label: "Garden/Park", type: "checkbox" },
      { name: "maintenance", label: "Maintenance Staff", type: "checkbox" },
      { name: "visitorParking", label: "Visitor Parking", type: "checkbox" }
    ],
    commercialAmenities: [
      { name: "conferenceRoom", label: "Conference Room", type: "checkbox" },
      { name: "cafeteria", label: "Cafeteria", type: "checkbox" },
      { name: "reception", label: "Reception Area", type: "checkbox" }
    ],
    industrialAmenities: [
      { name: "loadingDock", label: "Loading Dock", type: "checkbox" },
      { name: "fireSystem", label: "Fire Fighting System", type: "checkbox" },
      { name: "wasteManagement", label: "Waste Management", type: "checkbox" }
    ],
    hospitalityAmenities: [
      { name: "restaurant", label: "Restaurant", type: "checkbox" },
      { name: "roomService", label: "Room Service", type: "checkbox" },
      { name: "housekeeping", label: "Housekeeping", type: "checkbox" }
    ]
  }
};







