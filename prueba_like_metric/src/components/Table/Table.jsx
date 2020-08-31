import React, { useState, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import services from "../../services";
import styles from "./table.module.scss";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddCircleIcon classes={{ root: styles.addButton }} {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <CheckCircleIcon
      classes={{ root: styles.checkButton }}
      {...props}
      ref={ref}
    />
  )),
  Clear: forwardRef((props, ref) => (
    <CancelIcon classes={{ root: styles.clearButton }} {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteForeverOutlinedIcon
      classes={{ root: styles.deleteButton }}
      {...props}
      ref={ref}
    />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <EditTwoToneIcon
      classes={{ root: styles.editButton }}
      {...props}
      ref={ref}
    />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight
      classes={{ root: styles.rightChevron }}
      {...props}
      ref={ref}
    />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table = () => {
  const [columns] = useState([
    //declarando State de columnas
    { title: "Nomenclatura", field: "apartment_name" },
    { title: "mt2", field: "mt2" },
    { title: "Precio de m2", field: "price_mt2" },
  ]);

  const [data, setData] = useState([]); //Guardando datos en el state de la app

  //se usa async y await para que la funcion espere a tener el valor
  const fetch = async () => {
    //TRAER INFO DE LA BD
    const consult = await services("/apartments", "GET");
    setData(consult.data);
  };

  useEffect(() => {
    let active = true;
    if (active) {
      fetch();
      active = false;
    }
  }, []);

  //funcion para añadir datos
  const addData = async (newData) => {
    const prevData = [...data]; //es igual a lo que haya dentro de data
    prevData.push(newData);
    const sendToDB = await services("/apartments", "POST", newData);
    await setData(prevData);
  };

  //funcion para actualizar datos
  const updateData = async (newData, oldData) => {
    if (oldData) {
      const prevData = [...data];
      const updatePosition = prevData.indexOf(oldData);
      prevData[updatePosition] = newData;
      const sendToDB = await services("/apartments", "PUT", newData);
      await setData(prevData);
    }
  };

  //funcion para eliminar datos
  const deleteData = async (oldData) => {
    const prevData = [...data];
    const position = prevData.indexOf(oldData);
    prevData.splice(position, 1); // elimina la posicion y solo borra 1 elemento
    const sendToDB = await services("/apartments", "DELETE", oldData);
    await setData(prevData);
  };

  return (
    <MaterialTable
      title="Informacion y precios de mt2"
      icons={tableIcons} //llamando los iconos de la tabla
      columns={columns} //llamando las propiedades del state
      data={data} //llamando State data
      editable={{
        onRowAdd: async (newData) => addData(newData),
        onRowUpdate: async (newData, oldData) => updateData(newData, oldData),
        onRowDelete: async (oldData) => deleteData(oldData),
      }}
    />
  );
};

Table.propTypes = {};

export default Table;
