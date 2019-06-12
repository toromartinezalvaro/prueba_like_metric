import React, { useState } from "react";
import styles from "./Naming.module.scss";
import Card, { CardHeader, CardBody, CardFooter } from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Table from "../../UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";

const naming = props => {
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState();
  const [property, setProperty] = useState("");
  const [value, setValue] = useState();

  const confirm = () => {
    setHidden(true);
    props.onPropertyEmpty(id);
  };

  const cancel = () => {
    setHidden(true);
  };

  let validationsProps = {
    fn: props.checkDuplicates,
    message: "Nombres únicos"
  };

  const getInputs = () => {
    return props.names.map((floor, floorIndex) =>
      floor.map((property, propertyIndex) => {
        return (
          <Input
            key={`floor-${floorIndex}-property-${propertyIndex}`}
            className={styles.Input}
            validations={[{ ...validationsProps }]}
            location={propertyIndex + 1}
            floor={floorIndex + props.lowestFloor}
            onChange={target => {
              if (target.value === "" && property !== null) {
                setProperty(property.name);
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
          />
        );
      })
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

export default naming;
