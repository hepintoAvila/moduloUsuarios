/* eslint-disable react/jsx-no-duplicate-props */
// BtnSeccionAction.js
import React, { useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const BtnSeccionAction = ({ obj }) => {
  const { selectedItems, toggleItemSelection } = useContext(DashboardContext);

  const handleCheckboxChange = () => {
    toggleItemSelection(obj.key);
  };

  return (
    <div key={obj.key}>
      <input
        type="checkbox"
        checked={selectedItems.includes(obj.key)}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default BtnSeccionAction;
