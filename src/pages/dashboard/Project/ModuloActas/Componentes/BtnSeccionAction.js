// BtnSeccionAction.js
import React, { useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const BtnSeccionAction = ({ obj }) => {
  const { selectedItems, toggleItemSelection } = useContext(DashboardContext);

  const handleCheckboxChange = () => {
    toggleItemSelection(obj.key);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={selectedItems.includes(obj.key)}
        onChange={handleCheckboxChange}
      />
      {/* Aquí puedes agregar más acciones si es necesario */}
    </div>
  );
};

export default BtnSeccionAction;
