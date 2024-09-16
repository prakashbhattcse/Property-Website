import Select from "react-select";
import { useState } from "react";

const Filter = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [availableFromDate, setAvailableFromDate] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ location, priceRange, propertyType, availableFromDate });
  };

  const cities = [
    { value: "New Delhi", label: "New Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" },
    { value: "Hyderabad", label: "Hyderabad" },
  ];

  const propertyTypes = [
    { value: "Apartment", label: "Apartment" },
    { value: "House", label: "House" },
    { value: "Villa", label: "Villa" },
    { value: "Studio", label: "Studio" },
  ];

  return (
    <div className="filters-container">
      <h3>Filters</h3>
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="formLabelInput">
          <label>Location:</label>
          <Select
            className="custom-select"
            options={cities}
            value={cities.find((city) => city.value === location)}
            onChange={(selected) => setLocation(selected ? selected.value : "")}
            placeholder="Select City"
          />
        </div>
        <div className="formLabelInput">
          <label>Available From:</label>
          <input
            type="date"
            value={availableFromDate}
            onChange={(e) => setAvailableFromDate(e.target.value)}
          />
        </div>
        <div className="formLabelInput">
          <label>Price Range: ₹{priceRange}</label>
          <input
            type="range"
            min="1000"
            max="200000"
            step="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <div className="formLabelInput">
          <label>Property Type:</label>
          <Select
            className="custom-select"
            options={propertyTypes}
            value={propertyTypes.find((type) => type.value === propertyType)}
            onChange={(selected) =>
              setPropertyType(selected ? selected.value : "")
            }
            placeholder="Select Type"
          />
        </div>
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filter;
