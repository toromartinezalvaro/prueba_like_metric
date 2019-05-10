import React from "react";
import Card, { CardFooter, CardHeader, CardBody } from "../UI/Card/Card";
import styles from "./Towers.module.scss";
import Icon from "../../assets/icons/Icon";

const towerItems = props => {
  var items = projects => {
    return projects.map(project => {
      return itemFromProject(project);
    });
  };

  var itemFromProject = project => {
    return (
      <div className={styles.ItemContainer}>
        <div className={styles.DescriptionItem}>
          <div
            className={styles.Remove}
            onClick={() => props.removeProject(project.id)}
          >
            <Icon name="fa-trash-alt" />
          </div>
          <div className={styles.Description}>
            <p>{project.description}</p>
          </div>
        </div>
        <div className={styles.Item}>
          <div onClick={() => {props.openProject(project.id)}}>
            <p>{project.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <p>Proyectos</p>
        <button onClick={props.createProject}>Crear Proyecto</button>
      </CardHeader>
      <CardBody>
        <div className={styles.Projects}>{items(props.projects)}</div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default towerItems;
