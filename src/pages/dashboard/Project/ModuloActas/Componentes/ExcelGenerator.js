import React, { useEffect, useState }  from 'react';
import * as XLSX from 'xlsx';
import { useActas } from '../../../../../hooks/useActas';

const ExcelGenerator = ({pros}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { itemsActas, query } = useActas()

    const exportToExcel = (jsonData) => {
      console.log('jsonData',jsonData[1]?.data)
        // Crear una nueva hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(jsonData[1]?.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Generar archivo Excel
        XLSX.writeFile(workbook, 'consolidado.xlsx');
    };
    useEffect(() => {
      query('ModuloActas', 'actas', [{ opcion: btoa('generarConsolidado'), obj: 'actas' }]);
    }, [query]);

    useEffect(() => {


    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = prevSelectedItems.includes(itemsActas)
        ? prevSelectedItems.filter(i => i !== itemsActas)
        : [...prevSelectedItems, itemsActas];
        return newSelectedItems;
    });

  }, [itemsActas]);

    return (
        <div>
            <button onClick={()=>exportToExcel(selectedItems)}>Exportar a Excel</button>
        </div>
    );
};

export default ExcelGenerator;
