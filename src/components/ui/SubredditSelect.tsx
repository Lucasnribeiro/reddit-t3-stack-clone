import React, { useState } from 'react';

const SubredditSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-64">
      <select
        id="selectInput"
        value={selectedOption}
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="">Choose an option</option>
        <optgroup label="Fruits">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </optgroup>
        <optgroup label="Vegetables">
          <option value="carrot">Carrot</option>
          <option value="broccoli">Broccoli</option>
          <option value="tomato">Tomato</option>
        </optgroup>
      </select>
    </div>
  );
};

export default SubredditSelect;