import React from 'react';
import Card, { CardFooter, CardHeader, CardBody } from '../UI/Card/Card';
import styles from './Towers.module.scss';
import Icon from '../../assets/icons/Icon';
import Button from '../UI/Button/Button';

const towerItems = (props) => {
  const items = (towers) => {
    return towers.map((tower) => {
      return itemFromTower(tower);
    });
  };

  const itemFromTower = (tower) => {
    return (
      <div
        className={styles.ItemContainer}
        key={tower.id}
        onClick={(event) => {
          event.stopPropagation();
          if (window.event.ctrlKey) {
            props.openTowerCtrl(tower);
          } else {
            props.openTower(tower);
          }
        }}
      >
        <div className={styles.DescriptionItem}>
          <div className={styles.Buttons}>
            <div
              className={styles.Remove}
              onClick={(event) => {
                event.stopPropagation();
                props.editTower(tower.id);
              }}
            >
              <i className={`fas fa-edit ${styles.actions}`}></i>
            </div>
            <div
              className={styles.Remove}
              onClick={(event) => {
                event.stopPropagation();
                props.removeTower(tower.id);
              }}
            >
              <Icon name="fa-trash-alt" className={styles.actions} />
            </div>
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
        <Button onClick={props.createTower}>Crear Torre</Button>
      </CardHeader>
      <CardBody>
        <div className={styles.Towers}>{items(props.towers)}</div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default towerItems;
