import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Table = () => {
  const [columns] = useState([
    //declarando State de columnas
    { title: "Nomenclatura", field: "apartment_number" },
    { title: "mt2", field: "mt2" },
    { title: "Precio de m2", field: "price_mt2" },
  ]);

  const [data, setData] = useState([
    //Declarando el State de datos
    { apartment_number: "apto 101", mt2: 80, price_mt2: 50 },
  ]);

  const addData = async (newData)=>{
    const prevData = [...data];                  //es igual a lo que haya dentro de data
    prevData.push(newData);
    await setData(prevData);
  };

  const updateData = async (newData, oldData) =>{
      if(oldData){
          const prevData = [...data];              
          const updatePosition = prevData.indexOf(oldData);
          prevData[updatePosition] = newData;
          await setData(prevData);
      }
  };

  const deleteData = async (oldData) => {
      const prevData = [...data];
      const position = prevData.indexOf(oldData);
      prevData.splice(position, 1);                 // elimina la posicion y solo borra 1 elemento
      await setData(prevData);
  }

  return (
    <MaterialTable
      title="Precios de metro cuadradro"
      icons={tableIcons}//llamando los iconos de la tabla
      columns={columns} //llamando las propiedades del state
      data={data} //llamando State data
      editable={{
          onRowAdd: async (newData) => addData(newData), 
          onRowUpdate: async (newData, oldData)=> updateData(newData, oldData),
          onRowDelete: async (oldData) => deleteData(oldData),
      }}
    />
  );
};

Table.propTypes = {};

export default Table;