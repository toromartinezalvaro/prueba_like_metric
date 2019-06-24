import React, { useState, useRef } from "react";
import styles from "./Naming.module.scss";
import Card, { CardHeader, CardBody, CardFooter } from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Table from "../../UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";

const Naming = props => {
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState();
  const [FloorState, setFloorState] = useState();
  const [propertyIndexState, setPropertyIndexState] = useState();
  const [property, setProperty] = useState("");
  const [clear, setClear] = useState();


  const getInputs = () => {
    return props.names.map((floor, floorIndex) =>
      floor.map((property, propertyIndex) => {
        return (
          <Input
            key={`floor-${floorIndex}-property-${propertyIndex}`}
            className={styles.Input}
            validations={[
              {
                fn: props.checkDuplicates,
                message: "Nombres únicos"
              }
            ]}
            location={propertyIndex + 1}
            floor={floorIndex + props.lowestFloor}
            onChange={target => {
              if (target.value === "" && property !== null) {
                setProperty(property.name);
                setFloorState(floorIndex + props.lowestFloor) 
                setPropertyIndexState(propertyIndex + 1)
                setId(property.id);
                setHidden(false);
              } else {
                props.onPropertyNameChange(
                  property ? property.id : null,
                  floorIndex + props.lowestFloor,
                  propertyIndex + 1,
                  target.value
                );
              }
            }}
            value={property ? property.name : undefined}
            clearValue={true}

          />
        );
      })
    );
  };
  const confirm = () => {
    setHidden(true);
    setClear(false)
    props.onPropertyEmpty(id);
    props.onPropertyNameChange(
      id,
      FloorState,
      propertyIndexState,
      ""
    );
  };

  const cancel = () => {
    setHidden(true);
    setClear(true)
    props.onPropertyNameChange(
      id,
      FloorState,
      propertyIndexState,
      property
    );
  };

  return (
    <Card loading={props.loadingNaming}>
      <CardHeader>
        <p>Nomenclatura</p>
      </CardHeader>
      <CardBody>
        <div>
          <Table
            intersect="Propiedades"
            headers={props.headers}
            columns={props.columns}
            data={getInputs()}
          />
        </div>
      </CardBody>
      <CardFooter />
      {hidden ? null : (
        <Modal
          title={"Eliminar Propiedad " + property}
          hidden={hidden}
          onConfirm={confirm}
          onCancel={cancel}
        >
          Esta propiedad se eliminara y no se podra recuperar <br /> deseas
          continuar?
        </Modal>
      )}
    </Card>
  );
};

export default Naming;
