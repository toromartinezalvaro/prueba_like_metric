import React from "react";
import Card, { CardFooter, CardHeader, CardBody } from "../UI/Card/Card";
import styles from "./Towers.module.scss";
import Icon from "../../assets/icons/Icon";

const towerItems = props => {
  var items = towers => {
    return towers.map(tower => {
      return itemFromTower(tower);
    });
  };

  var itemFromTower = tower => {
    return (
      <div
        className={styles.ItemContainer}
        key={tower.id}
        onClick={event => {
          event.stopPropagation();
          props.openTower(tower);
        }}
      >
        <div className={styles.DescriptionItem}>
          <div
            className={styles.Remove}
            onClick={event => {
              event.stopPropagation();
              props.removeTower(tower.id);
            }}
          >
            <Icon name="fa-trash-alt" />
          </div>
          <div className={styles.Description}>
            <p>{tower.description}</p>
          </div>
        </div>
        <div className={styles.Item}>
          <div>
            <p>{tower.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <p>Torres</p>
        <button onClick={props.createTower}>Crear Torre</button>
      </CardHeader>
      <CardBody>
        <div className={styles.Towers}>{items(props.towers)}</div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default towerItems;
