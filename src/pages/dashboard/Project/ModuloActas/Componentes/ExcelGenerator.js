/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState }  from 'react';
import * as XLSX from 'xlsx';
import { useActas } from '../../../../../hooks/useActas';
import { Button } from 'react-bootstrap';

const ExcelGenerator = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { itemsConsolidads, query } = useActas()

    const exportToExcel = (jsonData) => {
      //console.log('jsonData',jsonData[1]?.data)
        // Crear una nueva hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(jsonData[1]?.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Generar archivo Excel
        XLSX.writeFile(workbook, 'consolidado.xlsx');
    };


   useEffect(() => {
      query('ModuloActas', 'actas', [{ opcion: btoa('generarConsolidado'), obj: 'generarConsolidado', items: btoa(props?.selectedItems)}]);
    }, [query]);

    useEffect(() => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = prevSelectedItems.includes(itemsConsolidads)
        ? prevSelectedItems.filter(i => i !== itemsConsolidads)
        : [...prevSelectedItems, itemsConsolidads];
        return newSelectedItems;
    });

  }, [itemsConsolidads]);
    return (
        <div>
            {itemsConsolidads?.data?.length > 0 ? <Button
                                    variant="success"
                                    type="submit"
                                    className="btnCerrar"
                                    style={{ marginLeft: '20em', marginTop: '0em', width: '15em', height: '1.5em' }}
                                    onClick={()=>exportToExcel(selectedItems)}><div style={{ marginLeft: '0.4em', marginTop: '-0.5em' }}>Exportar Xls</div> </Button>:''}
        </div>
    );
};

export default ExcelGenerator;
