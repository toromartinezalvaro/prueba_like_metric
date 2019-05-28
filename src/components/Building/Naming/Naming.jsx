import React from "react";
import styles from "./Naming.module.scss";
import Card, { CardHeader, CardBody, CardFooter } from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Table from "../../UI/Table/Table";

const naming = props => {
  const getInputs = () => {
    return props.names.map((floor, floorIndex) =>
      floor.map((property, propertyIndex) => (
        <Input
          key={`floor-${floorIndex}-property-${propertyIndex}`}
          className={styles.Input}
          validations={[
            { fn: props.checkDuplicates, message: "Nombres únicos" }
          ]}
          onChange={target => {
            props.onPropertyNameChange(
              property ? property.id : null,
              floorIndex + props.lowestFloor,
              propertyIndex + 1,
              target.value
            );
          }}
          value={property ? property.name : undefined}
        />
      ))
    );
  };

  return (
    <Card>
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
    </Card>
  );
};

export default naming;
