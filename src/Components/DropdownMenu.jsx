// DropdownMenu.js
import React, { useState } from 'react';
import"./DropdownMenu.css"

const DropdownMenu = ({ onView, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <span>&#8942;</span>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <button onClick={onView}>View</button>
          <button onClick={onUpdate}>Update</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
